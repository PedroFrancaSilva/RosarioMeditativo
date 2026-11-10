import type { RosaryProgressModel } from '@/domain/rosary/rosaryProgress';
import { getFixedPrayer } from '@/domain/rosary/fixedPrayers';
import type { PrayerStep } from '@/domain/rosary/types';

export type DecadeBeadVisual = 'upcoming' | 'completed' | 'current';

export type DecadeBeadView = {
  beads: DecadeBeadVisual[];
  caption: string;
};

const BEAD_COUNT = 10;

function upcomingRow(): DecadeBeadVisual[] {
  return Array.from({ length: BEAD_COUNT }, () => 'upcoming');
}

function completedRow(): DecadeBeadVisual[] {
  return Array.from({ length: BEAD_COUNT }, () => 'completed');
}

function hailRow(index: number): DecadeBeadVisual[] {
  return Array.from({ length: BEAD_COUNT }, (_, i) => {
    const number = i + 1;
    if (number < index) return 'completed';
    if (number === index) return 'current';
    return 'upcoming';
  });
}

function ourFatherRow(): DecadeBeadVisual[] {
  const row = upcomingRow();
  row[0] = 'current';
  return row;
}

function prayerTitle(step: PrayerStep): string {
  return step.prayerId ? getFixedPrayer(step.prayerId).title : step.label;
}

/**
 * Dez contas da dezena. O Pai-Nosso da década destaca a primeira conta sem
 * marcá-la como concluída; Glória e Fátima fecham as dez. A abertura não destaca.
 * `progress.hailMarys` só entra na Ave-Maria, para acompanhar o modelo existente.
 */
export function buildDecadeBeadView(
  step: PrayerStep | undefined,
  progress: RosaryProgressModel,
): DecadeBeadView {
  if (!step || step.kind === 'completion' || !step.mysteryId) {
    return {
      beads: upcomingRow(),
      caption: step?.kind === 'fixed-prayer' ? prayerTitle(step) : '',
    };
  }

  if (step.prayerId === 'hail-mary' && step.hailMaryIndex != null && step.hailMaryIndex >= 1) {
    const fromProgress = progress.hailMarys;
    return {
      beads: fromProgress.length === BEAD_COUNT ? [...fromProgress] : hailRow(step.hailMaryIndex),
      caption: `${step.hailMaryIndex} de 10`,
    };
  }

  if (step.prayerId === 'our-father' && step.hailMaryIndex === 0) {
    return { beads: ourFatherRow(), caption: prayerTitle(step) };
  }

  if (step.prayerId === 'glory-be' || step.prayerId === 'fatima-prayer') {
    return { beads: completedRow(), caption: prayerTitle(step) };
  }

  return { beads: upcomingRow(), caption: prayerTitle(step) };
}

export function prayerPanelKicker(step: PrayerStep | undefined): string {
  if (
    step?.mysteryId &&
    step.prayerId === 'hail-mary' &&
    step.hailMaryIndex != null &&
    step.hailMaryIndex >= 1
  ) {
    return `${step.hailMaryIndex}ª conta da dezena`;
  }
  return 'Oração';
}

export function mysteryProgressLabel(
  mysteries: RosaryProgressModel['mysteries'],
  hasMystery: boolean,
): { kicker: string; detail: string } {
  if (!hasMystery || mysteries.length === 0) {
    return { kicker: 'Abertura', detail: '' };
  }
  const current = mysteries.findIndex((state) => state === 'current');
  const position = current >= 0 ? current + 1 : 1;
  return {
    kicker: `${position}º mistério`,
    detail: `${position} de ${mysteries.length}`,
  };
}
