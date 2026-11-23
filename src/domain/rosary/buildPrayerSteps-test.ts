import { buildPrayerSteps } from '@/domain/rosary/buildPrayerSteps';
import { getFixedPrayer } from '@/domain/rosary/fixedPrayers';
import { singleMysterySession, twoMysterySession } from '@/domain/rosary/testFixtures';

const OPENING_LEADS = ['Pelo aumento da fé.', 'Pelo aumento da esperança.', 'Pelo aumento da caridade.'];

const ANGELUS_LEADS = [
  'O Anjo do Senhor anunciou a Maria, e ela concebeu do Espírito Santo.',
  'Eis aqui a serva do Senhor; faça-se em mim segundo a vossa palavra.',
  'A Palavra se fez carne e habitou entre nós.',
];

describe('buildPrayerSteps', () => {
  it('com a opção Angelus, as Ave-Marias iniciais levam os versículos do Angelus', () => {
    const steps = buildPrayerSteps({ ...twoMysterySession, openingIntentions: 'angelus' });
    expect(steps.filter((s) => s.id.startsWith('open-hail')).map((s) => s.lead)).toEqual(
      ANGELUS_LEADS,
    );
    expect(steps).toHaveLength(buildPrayerSteps(twoMysterySession).length);
  });

  it('inclui abertura, dois mistérios e conclusão no terço completo', () => {
    const steps = buildPrayerSteps(twoMysterySession);
    expect(steps[0]?.label).toBe('Sinal da Cruz');
    expect(steps.filter((s) => s.prayerId === 'sign-of-cross')).toHaveLength(1);
    expect(getFixedPrayer('sign-of-cross').fullText.startsWith('Pelo sinal da Santa Cruz')).toBe(
      true,
    );
    expect(steps.slice(0, 8).map((s) => s.label)).toEqual([
      'Sinal da Cruz',
      'Oferecimento',
      'Credo',
      'Pai-Nosso',
      'Ave-Maria',
      'Ave-Maria',
      'Ave-Maria',
      'Glória',
    ]);
    expect(steps[8]?.kind).toBe('mystery-announcement');
    expect(steps.filter((s) => s.id.startsWith('open-hail')).map((s) => s.lead)).toEqual(
      OPENING_LEADS,
    );
    expect(steps.some((s) => s.kind === 'mystery-announcement' && s.mysteryId === 'test-m1')).toBe(
      true,
    );
    expect(steps.some((s) => s.kind === 'mystery-announcement' && s.mysteryId === 'test-m2')).toBe(
      true,
    );
    expect(steps.at(-4)?.prayerId).toBe('closing-thanksgiving');
    expect(steps.at(-3)?.prayerId).toBe('hail-holy-queen');
    expect(steps.at(-2)?.prayerId).toBe('concluding-prayer');
    expect(steps.at(-1)?.kind).toBe('completion');
    const decadeHails = steps.filter((s) => s.prayerId === 'hail-mary' && s.mysteryId);
    expect(decadeHails.every((s) => s.lead === null)).toBe(true);
  });

  it('gera dez Ave-Marias por mistério', () => {
    const steps = buildPrayerSteps(singleMysterySession);
    const hailMarys = steps.filter(
      (s) => s.prayerId === 'hail-mary' && s.mysteryId === 'test-m1',
    );
    expect(hailMarys).toHaveLength(10);
  });

  it('no modo single não inclui abertura longa do terço completo', () => {
    const steps = buildPrayerSteps(singleMysterySession);
    expect(steps.find((s) => s.id === 'open-creed')).toBeUndefined();
    expect(steps.find((s) => s.prayerId === 'opening-offering')).toBeUndefined();
    expect(steps.find((s) => s.prayerId === 'hail-holy-queen')).toBeUndefined();
    expect(steps.find((s) => s.prayerId === 'closing-thanksgiving')).toBeUndefined();
    expect(steps[0]?.kind).toBe('mystery-announcement');
    expect(steps.at(-2)?.prayerId).toBe('fatima-prayer');
    expect(steps.at(-1)?.kind).toBe('completion');
    expect(steps.filter((s) => s.prayerId === 'hail-mary').every((s) => s.lead === null)).toBe(
      true,
    );
  });
});
