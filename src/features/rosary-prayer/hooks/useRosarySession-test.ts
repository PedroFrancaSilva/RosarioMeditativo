import { buildPrayerSteps } from '@/domain/rosary/buildPrayerSteps';
import { createInitialSessionState } from '@/features/rosary-prayer/hooks/useRosarySession';
import { twoMysterySession } from '@/domain/rosary/testFixtures';

describe('useRosarySession initial state', () => {
  it('limita índice inicial ao fluxo', () => {
    const steps = buildPrayerSteps(twoMysterySession);
    expect(createInitialSessionState(steps, -3).stepIndex).toBe(0);
    expect(createInitialSessionState(steps, 999).stepIndex).toBe(steps.length - 1);
    expect(createInitialSessionState(steps, 5).stepIndex).toBe(5);
  });
});
