import type { Mystery } from '@/domain/mystery';
import type { PrayerStep } from '@/domain/rosary/types';

export type ProgressBeadState = 'upcoming' | 'current' | 'completed';

export type RosaryProgressModel = {
  /** Uma conta por mistério da sessão (linha superior). */
  mysteries: ProgressBeadState[];
  /** Dez contas de Ave-Maria da década atual (linha inferior). */
  hailMarys: ProgressBeadState[];
};

function lastDecadeStepIndex(steps: PrayerStep[], mysteryId: string): number {
  let last = -1;
  steps.forEach((step, index) => {
    if (step.mysteryId === mysteryId && step.kind === 'fixed-prayer') {
      last = index;
    }
  });
  return last;
}

function firstMysteryStepIndex(steps: PrayerStep[], mysteryId: string): number {
  return steps.findIndex(
    (s) => s.kind === 'mystery-announcement' && s.mysteryId === mysteryId,
  );
}

function resolveCurrentMysteryId(step: PrayerStep | undefined): string | undefined {
  if (!step) return undefined;
  if (step.kind === 'mystery-announcement') return step.mysteryId;
  return step.mysteryId;
}

function emptyHailRow(): ProgressBeadState[] {
  return Array.from({ length: 10 }, () => 'upcoming' as ProgressBeadState);
}

function filledHailRow(): ProgressBeadState[] {
  return Array.from({ length: 10 }, () => 'completed' as ProgressBeadState);
}

function hailRowForHailMaryIndex(index: number): ProgressBeadState[] {
  const row = emptyHailRow();
  for (let i = 0; i < 10; i += 1) {
    const num = i + 1;
    if (num < index) row[i] = 'completed';
    else if (num === index) row[i] = 'current';
  }
  return row;
}

function mysteryStatesForStep(
  steps: PrayerStep[],
  stepIndex: number,
  mysteries: Mystery[],
  currentMysteryId: string | undefined,
): ProgressBeadState[] {
  return mysteries.map((mystery) => {
    const first = firstMysteryStepIndex(steps, mystery.id);
    const last = lastDecadeStepIndex(steps, mystery.id);
    if (first === -1) return 'upcoming';
    if (last >= 0 && stepIndex > last) return 'completed';
    if (currentMysteryId === mystery.id) return 'current';
    if (stepIndex >= first && last >= 0 && stepIndex <= last) return 'current';
    return 'upcoming';
  });
}

/** Duas linhas de progresso: mistérios da sessão e Ave-Marias da década atual. */
export function buildRosaryProgressModel(
  steps: PrayerStep[],
  stepIndex: number,
  mysteries: Mystery[],
): RosaryProgressModel {
  const currentStep = steps[stepIndex];

  if (!currentStep) {
    return {
      mysteries: mysteries.map(() => 'upcoming'),
      hailMarys: emptyHailRow(),
    };
  }

  if (currentStep.kind === 'completion') {
    return {
      mysteries: mysteries.map(() => 'completed'),
      hailMarys: filledHailRow(),
    };
  }

  const currentMysteryId = resolveCurrentMysteryId(currentStep);
  const mysteriesRow = mysteryStatesForStep(steps, stepIndex, mysteries, currentMysteryId);

  if (!currentMysteryId) {
    return { mysteries: mysteriesRow, hailMarys: emptyHailRow() };
  }

  if (currentStep.kind === 'mystery-announcement') {
    return { mysteries: mysteriesRow, hailMarys: emptyHailRow() };
  }

  if (currentStep.mysteryId !== currentMysteryId) {
    return { mysteries: mysteriesRow, hailMarys: emptyHailRow() };
  }

  if (currentStep.prayerId === 'our-father') {
    return { mysteries: mysteriesRow, hailMarys: emptyHailRow() };
  }

  if (currentStep.prayerId === 'hail-mary' && currentStep.hailMaryIndex !== null) {
    return {
      mysteries: mysteriesRow,
      hailMarys: hailRowForHailMaryIndex(currentStep.hailMaryIndex),
    };
  }

  if (currentStep.prayerId === 'glory-be' || currentStep.prayerId === 'fatima-prayer') {
    return { mysteries: mysteriesRow, hailMarys: filledHailRow() };
  }

  return { mysteries: mysteriesRow, hailMarys: emptyHailRow() };
}
