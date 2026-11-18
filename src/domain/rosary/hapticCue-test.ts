import { getEmbeddedCatalog } from '@/data/repositories/mysteryRepository';
import { buildPrayerSteps } from '@/domain/rosary/buildPrayerSteps';
import {
  completedCountLabel,
  parseCompletedCount,
  tercosInCompletedSession,
} from '@/domain/rosary/completionCount';
import { hapticCueForStep } from '@/domain/rosary/hapticCue';

describe('hapticCueForStep', () => {
  const catalog = getEmbeddedCatalog('classic');
  const steps = buildPrayerSteps({ mode: 'single', set: 'classic', mysteries: [catalog[0]!] });
  const byId = (id: string) => steps.find((step) => step.id === id);

  it('cada Ave-Maria e o Pai-Nosso dão a vibração leve de conta', () => {
    expect(hapticCueForStep(byId('single-our-father'))).toBe('bead');
    expect(hapticCueForStep(byId('single-hail-1'))).toBe('bead');
    expect(hapticCueForStep(byId('single-hail-10'))).toBe('bead');
  });

  it('o Glória que fecha a dezena vibra de outro jeito', () => {
    expect(hapticCueForStep(byId('single-glory'))).toBe('decade-end');
  });

  it('anúncio do mistério e conclusão têm vibração própria', () => {
    expect(hapticCueForStep(steps[0])).toBe('mystery');
    expect(hapticCueForStep(steps.at(-1))).toBe('completion');
    expect(hapticCueForStep(undefined)).toBeNull();
  });

  it('o Glória da abertura não é fim de dezena', () => {
    const full = buildPrayerSteps({ mode: 'tercio', set: 'classic', mysteries: catalog.slice(0, 5) });
    expect(hapticCueForStep(full.find((step) => step.id === 'open-glory'))).toBe('bead');
  });
});

describe('completionCount', () => {
  const classic = getEmbeddedCatalog('classic');
  const jp2 = getEmbeddedCatalog('jp2');

  it('rosário completo soma um terço por conjunto', () => {
    expect(tercosInCompletedSession({ mode: 'full', mysteries: classic })).toBe(3);
    expect(tercosInCompletedSession({ mode: 'full', mysteries: jp2 })).toBe(4);
  });

  it('um terço soma 1 e um mistério avulso não soma', () => {
    expect(tercosInCompletedSession({ mode: 'tercio', mysteries: classic.slice(0, 5) })).toBe(1);
    expect(tercosInCompletedSession({ mode: 'single', mysteries: [classic[0]!] })).toBe(0);
  });

  it('valor guardado inválido conta como zero', () => {
    expect(parseCompletedCount(null)).toBe(0);
    expect(parseCompletedCount('abc')).toBe(0);
    expect(parseCompletedCount('-3')).toBe(0);
    expect(parseCompletedCount('12')).toBe(12);
  });

  it('rótulo no singular e no plural', () => {
    expect(completedCountLabel(0)).toBe('Nenhum terço rezado ainda');
    expect(completedCountLabel(1)).toBe('1 terço rezado');
    expect(completedCountLabel(7)).toBe('7 terços rezados');
  });
});
