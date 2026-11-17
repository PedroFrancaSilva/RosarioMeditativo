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
    expect(view.lead).toBe('Pelo aumento da caridade.');
    expect(view.bodySummary.includes('caridade')).toBe(false);
    expect(view.bodyFull.includes('caridade')).toBe(false);
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
