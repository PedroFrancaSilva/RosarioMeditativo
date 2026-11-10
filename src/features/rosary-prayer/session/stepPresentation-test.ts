import { buildPrayerSteps } from '@/domain/rosary/buildPrayerSteps';
import { twoMysterySession } from '@/domain/rosary/testFixtures';
import { buildDecadeBeadView } from '@/features/rosary-prayer/session/decadeBeadView';
import { presentPrayerStep } from '@/features/rosary-prayer/session/stepPresentation';

const emptyProgress = {
  mysteries: [],
  hailMarys: [],
};

describe('presentPrayerStep', () => {
  it('mantém a citação fora do texto recolhido da Ave-Maria', () => {
    const steps = buildPrayerSteps(twoMysterySession);
    const hail = steps.find((step) => step.id === 'open-hail-3');
    const view = presentPrayerStep(hail!);
    expect(view.lead).toBe('A Palavra se fez carne e habitou entre nós.');
    expect(view.bodySummary.includes('Palavra se fez carne')).toBe(false);
    expect(view.bodyFull.includes('Palavra se fez carne')).toBe(false);
    expect(view.bodyFull.startsWith('Ave, Maria')).toBe(true);
  });

  it('rotula o encerramento sem concluir conta da dezena', () => {
    const steps = buildPrayerSteps(twoMysterySession);
    for (const prayerId of ['closing-thanksgiving', 'hail-holy-queen'] as const) {
      const step = steps.find((item) => item.prayerId === prayerId);
      const view = presentPrayerStep(step!);
      expect(view.frameLabel).toBe('Encerramento');
      expect(view.frameLabel).not.toBe('Abertura');
      const beads = buildDecadeBeadView(step, { ...emptyProgress });
      expect(beads.beads.every((bead) => bead !== 'completed')).toBe(true);
    }
  });
});
