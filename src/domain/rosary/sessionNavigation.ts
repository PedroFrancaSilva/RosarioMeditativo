import type { PrayerStep } from '@/domain/rosary/types';

/** Índice do próximo anúncio de mistério após `fromIndex`, ou null se não houver. */
export function findNextMysteryAnnouncementIndex(
  steps: PrayerStep[],
  fromIndex: number,
): number | null {
  for (let i = fromIndex + 1; i < steps.length; i += 1) {
    if (steps[i]?.kind === 'mystery-announcement') {
      return i;
    }
  }
  return null;
}

export function canSkipToNextMystery(steps: PrayerStep[], stepIndex: number): boolean {
  const current = steps[stepIndex];
  if (!current || current.kind === 'completion') {
    return false;
  }
  return findNextMysteryAnnouncementIndex(steps, stepIndex) !== null;
}

export function skipToNextMysteryIndex(steps: PrayerStep[], stepIndex: number): number {
  const next = findNextMysteryAnnouncementIndex(steps, stepIndex);
  if (next === null) {
    return stepIndex;
  }
  return next;
}
