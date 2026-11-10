import type { PrayerStep } from '@/domain/rosary/types';

function mysteryTitleFromSteps(steps: PrayerStep[], mysteryId: string): string {
  const announce = steps.find(
    (s) => s.kind === 'mystery-announcement' && s.mysteryId === mysteryId,
  );
  return announce?.mysteryTitle ?? mysteryId;
}

/** Rótulo persistente do mistério (ou abertura / conclusão) para a tela de oração. */
export function getPersistentMysteryLabel(
  steps: PrayerStep[],
  currentStep: PrayerStep | undefined,
): string {
  if (!currentStep) {
    return '';
  }
  if (currentStep.kind === 'completion') {
    return 'Terço concluído';
  }
  if (currentStep.kind === 'mystery-announcement') {
    return currentStep.mysteryTitle ?? currentStep.label;
  }
  if (currentStep.mysteryId) {
    return mysteryTitleFromSteps(steps, currentStep.mysteryId);
  }
  if (
    currentStep.prayerId === 'closing-thanksgiving' ||
    currentStep.prayerId === 'hail-holy-queen'
  ) {
    return 'Encerramento';
  }

  return 'Abertura';
}
