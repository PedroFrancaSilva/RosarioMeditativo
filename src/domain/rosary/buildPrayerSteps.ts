import type { Mystery } from '@/domain/mystery';
import type { OpeningIntentions } from '@/domain/preferences/prayerPreferences';
import { mysteryAnnouncement } from '@/domain/rosary/mysteryFruits';
import { MODERN_PRAYER_FORM } from '@/domain/rosary/prayerForm';
import type { PrayerForm, PrayerStep, RosarySessionConfig } from '@/domain/rosary/types';

function fixedStep(
  id: string,
  prayerId: PrayerStep['prayerId'],
  label: string,
  hailMaryIndex: number | null = null,
  mysteryId?: string,
  lead: string | null = null,
): PrayerStep {
  return {
    id,
    kind: 'fixed-prayer',
    prayerId,
    label,
    hailMaryIndex,
    mysteryId,
    lead,
  };
}

function announceStep(mystery: Mystery): PrayerStep {
  return {
    id: `announce-${mystery.id}`,
    kind: 'mystery-announcement',
    mysteryId: mystery.id,
    mysteryTitle: mystery.name,
    label: mystery.name,
    hailMaryIndex: null,
    lead: null,
    announcement: mysteryAnnouncement(mystery),
  };
}

function decadeSteps(mystery: Mystery, prefix: string, form: PrayerForm): PrayerStep[] {
  const steps: PrayerStep[] = [
    fixedStep(`${prefix}-our-father`, 'our-father', 'Pai-Nosso', 0, mystery.id),
  ];
  for (let i = 1; i <= 10; i += 1) {
    steps.push(
      fixedStep(`${prefix}-hail-${i}`, 'hail-mary', `Ave-Maria ${i}`, i, mystery.id),
    );
  }
  steps.push(fixedStep(`${prefix}-glory`, 'glory-be', 'Glória', null, mystery.id));
  if (form.fatima) {
    steps.push(fixedStep(`${prefix}-fatima`, 'fatima-prayer', 'Oração de Fátima', null, mystery.id));
  }
  return steps;
}

/** Pedido tradicional das três Ave-Marias iniciais do terço. */
export const VIRTUE_OPENING_LEADS = [
  'Pelo aumento da fé.',
  'Pelo aumento da esperança.',
  'Pelo aumento da caridade.',
] as const;

/** Versículos do Angelus, alternativa escolhida nos ajustes. */
export const ANGELUS_OPENING_LEADS = [
  'O Anjo do Senhor anunciou a Maria, e ela concebeu do Espírito Santo.',
  'Eis aqui a serva do Senhor; faça-se em mim segundo a vossa palavra.',
  'A Palavra se fez carne e habitou entre nós.',
] as const;

export function openingLeads(intentions: OpeningIntentions = 'virtues'): readonly string[] {
  return intentions === 'angelus' ? ANGELUS_OPENING_LEADS : VIRTUE_OPENING_LEADS;
}

function openingSteps(intentions: OpeningIntentions | undefined): PrayerStep[] {
  const leads = openingLeads(intentions);
  return [
    fixedStep('open-sign', 'sign-of-cross', 'Sinal da Cruz'),
    fixedStep('open-offering', 'opening-offering', 'Oferecimento'),
    fixedStep('open-creed', 'creed', 'Credo'),
    fixedStep('open-our-father', 'our-father', 'Pai-Nosso'),
    fixedStep('open-hail-1', 'hail-mary', 'Ave-Maria', 1, undefined, leads[0]),
    fixedStep('open-hail-2', 'hail-mary', 'Ave-Maria', 2, undefined, leads[1]),
    fixedStep('open-hail-3', 'hail-mary', 'Ave-Maria', 3, undefined, leads[2]),
    fixedStep('open-glory', 'glory-be', 'Glória'),
  ];
}

function closingSteps(): PrayerStep[] {
  return [
    fixedStep('close-thanks', 'closing-thanksgiving', 'Agradecimento'),
    fixedStep('close-salve', 'hail-holy-queen', 'Salve Rainha'),
    fixedStep('close-oremus', 'concluding-prayer', 'Oração conclusiva'),
  ];
}

function completionStep(): PrayerStep {
  return {
    id: 'completion',
    kind: 'completion',
    label: 'Terço concluído',
    hailMaryIndex: null,
    lead: null,
  };
}

/** Gera a sequência de passos para a sessão configurada. */
export function buildPrayerSteps(config: RosarySessionConfig): PrayerStep[] {
  const { mode, mysteries } = config;
  const form = config.form ?? MODERN_PRAYER_FORM;
  const steps: PrayerStep[] = [];

  if (mode === 'full' || mode === 'tercio') {
    steps.push(...openingSteps(config.openingIntentions));
    mysteries.forEach((mystery, index) => {
      steps.push(announceStep(mystery));
      steps.push(...decadeSteps(mystery, `m${index}`, form));
    });
    steps.push(...closingSteps());
  } else {
    const mystery = mysteries[0];
    if (!mystery) {
      return [completionStep()];
    }
    steps.push(announceStep(mystery));
    steps.push(...decadeSteps(mystery, 'single', form));
  }

  steps.push(completionStep());
  return steps;
}
