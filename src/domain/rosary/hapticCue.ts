import type { PrayerStep } from '@/domain/rosary/types';

/**
 * Vibração ao chegar a um passo avançando.
 * - `bead`: cada conta (leve).
 * - `decade-end`: o Glória que fecha uma dezena (distinta, para saber sem olhar).
 * - `mystery`: anúncio de um novo mistério.
 * - `completion`: fim da oração.
 */
export type HapticCue = 'bead' | 'decade-end' | 'mystery' | 'completion';

export function hapticCueForStep(step: PrayerStep | undefined): HapticCue | null {
  if (!step) return null;
  if (step.kind === 'completion') return 'completion';
  if (step.kind === 'mystery-announcement') return 'mystery';
  if (step.prayerId === 'glory-be' && step.mysteryId) return 'decade-end';
  return 'bead';
}
