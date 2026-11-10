import { getFixedPrayer } from '@/domain/rosary/fixedPrayers';
import type { FixedPrayer, PrayerStep } from '@/domain/rosary/types';

export type StepPresentation = {
  step: PrayerStep;
  title: string;
  bodySummary: string;
  bodyFull: string;
  /** Citação inteira, fora do texto que recolhe. */
  lead: string | null;
  /** Rótulo quando o passo não pertence a um mistério. */
  frameLabel: 'Abertura' | 'Encerramento' | null;
  /** 0–10 durante a década; null fora dela. */
  hailMaryIndex: number | null;
  mysteryId: string | null;
  isDecade: boolean;
};

function frameLabelFor(step: PrayerStep): StepPresentation['frameLabel'] {
  if (step.mysteryId || step.kind !== 'fixed-prayer') return null;
  if (step.prayerId === 'closing-thanksgiving' || step.prayerId === 'hail-holy-queen') {
    return 'Encerramento';
  }
  return 'Abertura';
}

export function presentPrayerStep(step: PrayerStep): StepPresentation {
  if (step.kind === 'mystery-announcement') {
    const title = step.mysteryTitle ?? step.label;
    return {
      step,
      title,
      bodySummary: `Medite o mistério: ${title}.`,
      bodyFull: `Anunciamos o ${title}. Medite este mistério enquanto reza a década.`,
      lead: null,
      frameLabel: null,
      hailMaryIndex: null,
      mysteryId: step.mysteryId ?? null,
      isDecade: false,
    };
  }

  if (step.kind === 'completion') {
    return {
      step,
      title: 'Terço concluído',
      bodySummary: 'Louvado seja Nosso Senhor Jesus Cristo.',
      bodyFull:
        'Louvado seja Nosso Senhor Jesus Cristo. Por todos os séculos dos séculos. Amém. Que esta oração enriqueça a sua vida espiritual.',
      lead: null,
      frameLabel: null,
      hailMaryIndex: null,
      mysteryId: null,
      isDecade: false,
    };
  }

  const prayer: FixedPrayer = getFixedPrayer(step.prayerId!);
  const inDecade = step.hailMaryIndex !== null && step.prayerId === 'hail-mary';

  return {
    step,
    title: step.label,
    bodySummary: prayer.summary,
    bodyFull: prayer.fullText,
    lead: step.lead,
    frameLabel: frameLabelFor(step),
    hailMaryIndex: inDecade || step.hailMaryIndex === 0 ? step.hailMaryIndex : null,
    mysteryId: step.mysteryId ?? null,
    isDecade:
      step.hailMaryIndex !== null &&
      (step.prayerId === 'hail-mary' || step.prayerId === 'our-father'),
  };
}
