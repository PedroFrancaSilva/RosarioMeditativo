import { act, renderHook } from '@testing-library/react-native';

import { getEmbeddedCatalog } from '@/data/repositories/mysteryRepository';
import type { Mystery } from '@/domain/mystery';
import { buildPrayerSteps } from '@/domain/rosary/buildPrayerSteps';
import { twoMysterySession } from '@/domain/rosary/testFixtures';
import {
  createInitialSessionState,
  useRosarySession,
} from '@/features/rosary-prayer/hooks/useRosarySession';

function asRemoteCatalog(mysteries: Mystery[]): Mystery[] {
  return mysteries.map((mystery) => ({
    ...mystery,
    id: `00000000-0000-4000-8000-${mystery.type}-${mystery.sortOrder}`,
  }));
}

describe('useRosarySession initial state', () => {
  it('limita índice inicial ao fluxo', () => {
    const steps = buildPrayerSteps(twoMysterySession);
    expect(createInitialSessionState(steps, -3).stepIndex).toBe(0);
    expect(createInitialSessionState(steps, 999).stepIndex).toBe(steps.length - 1);
    expect(createInitialSessionState(steps, 5).stepIndex).toBe(5);
  });
});

describe('useRosarySession quando o catálogo remoto chega', () => {
  it('mantém o passo e religa o mistério ativo aos ids remotos', async () => {
    const embedded = getEmbeddedCatalog('classic');
    const remote = asRemoteCatalog(embedded);
    const { result, rerender } = await renderHook(
      ({ mysteries }: { mysteries: Mystery[] }) =>
        useRosarySession({ mode: 'tercio', set: 'classic', mysteries }),
      { initialProps: { mysteries: embedded.slice(0, 5) } },
    );

    const announcementIndex = result.current.steps.findIndex(
      (step) => step.kind === 'mystery-announcement',
    );
    const firstHailIndex = announcementIndex + 2;
    await act(() => {
      for (let i = 0; i < firstHailIndex; i += 1) result.current.next();
    });

    expect(result.current.stepIndex).toBe(firstHailIndex);
    expect(result.current.currentStep?.prayerId).toBe('hail-mary');
    expect(result.current.activeMystery?.id).toBe(embedded[0]?.id);

    await rerender({ mysteries: remote.slice(0, 5) });

    expect(result.current.stepIndex).toBe(firstHailIndex);
    expect(result.current.currentStep?.mysteryId).toBe(remote[0]?.id);
    expect(result.current.activeMystery?.id).toBe(remote[0]?.id);
    expect(result.current.progress.mysteries[0]).toBe('current');
    expect(result.current.progress.hailMarys[0]).toBe('current');
  });
});
