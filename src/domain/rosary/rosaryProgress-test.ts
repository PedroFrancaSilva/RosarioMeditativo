import { buildPrayerSteps } from '@/domain/rosary/buildPrayerSteps';
import { singleMysterySession, twoMysterySession } from '@/domain/rosary/testFixtures';
import { buildRosaryProgressModel, type ProgressBeadState } from '@/domain/rosary/rosaryProgress';

function beadBinary(states: ProgressBeadState[]): string {
  return states.map((s) => (s === 'completed' ? '1' : '0')).join('');
}

describe('buildRosaryProgressModel', () => {
  it('na abertura todos os mistérios e ave-marias ficam vazios', () => {
    const steps = buildPrayerSteps(twoMysterySession);
    const model = buildRosaryProgressModel(steps, 0, twoMysterySession.mysteries);
    expect(beadBinary(model.mysteries)).toBe('00');
    expect(beadBinary(model.hailMarys)).toBe('0000000000');
  });

  it('na terceira ave-maria marca mistério atual e 1100000000', () => {
    const steps = buildPrayerSteps(twoMysterySession);
    const hailIndex = steps.findIndex(
      (s) => s.prayerId === 'hail-mary' && s.hailMaryIndex === 3 && s.mysteryId === 'test-m1',
    );
    const model = buildRosaryProgressModel(steps, hailIndex, twoMysterySession.mysteries);
    expect(model.mysteries[0]).toBe('current');
    expect(model.mysteries[1]).toBe('upcoming');
    expect(beadBinary(model.hailMarys)).toBe('1100000000');
  });

  it('no segundo mistério concluído parcialmente mostra 1100 na linha de mistérios', () => {
    const steps = buildPrayerSteps(twoMysterySession);
    const secondAnnounce = steps.findIndex(
      (s) => s.kind === 'mystery-announcement' && s.mysteryId === 'test-m2',
    );
    const model = buildRosaryProgressModel(steps, secondAnnounce, twoMysterySession.mysteries);
    expect(model.mysteries[0]).toBe('completed');
    expect(model.mysteries[1]).toBe('current');
    expect(beadBinary(model.mysteries)).toBe('10');
    expect(beadBinary(model.hailMarys)).toBe('0000000000');
  });

  it('na glória preenche as dez ave-marias sem contar a oração na linha inferior', () => {
    const steps = buildPrayerSteps(singleMysterySession);
    const gloryIndex = steps.findIndex(
      (s) => s.prayerId === 'glory-be' && s.mysteryId === 'test-m1',
    );
    const model = buildRosaryProgressModel(steps, gloryIndex, singleMysterySession.mysteries);
    expect(beadBinary(model.hailMarys)).toBe('1111111111');
  });

  it('no modo single há uma conta de mistério e dez de ave-maria', () => {
    const steps = buildPrayerSteps(singleMysterySession);
    const hailIndex = steps.findIndex((s) => s.prayerId === 'hail-mary');
    const model = buildRosaryProgressModel(steps, hailIndex, singleMysterySession.mysteries);
    expect(model.mysteries).toHaveLength(1);
    expect(model.hailMarys).toHaveLength(10);
  });
});
