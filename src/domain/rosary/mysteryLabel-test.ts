import { buildPrayerSteps } from '@/domain/rosary/buildPrayerSteps';
import { singleMysterySession, twoMysterySession } from '@/domain/rosary/testFixtures';
import { getPersistentMysteryLabel } from '@/domain/rosary/mysteryLabel';

describe('getPersistentMysteryLabel', () => {
  it('mostra Abertura no primeiro passo do terço completo', () => {
    const steps = buildPrayerSteps(twoMysterySession);
    expect(getPersistentMysteryLabel(steps, steps[0])).toBe('Abertura');
  });

  it('mostra o nome do mistério numa Ave-Maria', () => {
    const steps = buildPrayerSteps(twoMysterySession);
    const hail = steps.find((s) => s.prayerId === 'hail-mary' && s.mysteryId === 'test-m1');
    expect(getPersistentMysteryLabel(steps, hail)).toBe('Mistério Um');
  });

  it('mostra o que foi concluído no passo final', () => {
    const steps = buildPrayerSteps(singleMysterySession);
    const last = steps.at(-1);
    expect(getPersistentMysteryLabel(steps, last)).toBe('Mistério concluído');
  });
});
