import { buildPrayerSteps } from '@/domain/rosary/buildPrayerSteps';
import { twoMysterySession } from '@/domain/rosary/testFixtures';
import {
  canSkipToNextMystery,
  findNextMysteryAnnouncementIndex,
  skipToNextMysteryIndex,
} from '@/domain/rosary/sessionNavigation';

describe('sessionNavigation', () => {
  const steps = buildPrayerSteps(twoMysterySession);

  it('encontra o segundo anúncio a partir da abertura', () => {
    const idx = findNextMysteryAnnouncementIndex(steps, 0);
    const firstAnnounce = steps.findIndex((s) => s.kind === 'mystery-announcement');
    expect(idx).toBe(firstAnnounce);
  });

  it('permite salto durante a primeira década', () => {
    const firstHail = steps.findIndex(
      (s) => s.prayerId === 'hail-mary' && s.mysteryId === 'test-m1',
    );
    expect(canSkipToNextMystery(steps, firstHail)).toBe(true);
    const target = skipToNextMysteryIndex(steps, firstHail);
    expect(steps[target]?.kind).toBe('mystery-announcement');
    expect(steps[target]?.mysteryId).toBe('test-m2');
  });

  it('não permite salto no último mistério', () => {
    const lastAnnounce = steps.findLastIndex(
      (s) => s.kind === 'mystery-announcement' && s.mysteryId === 'test-m2',
    );
    expect(canSkipToNextMystery(steps, lastAnnounce)).toBe(false);
  });

  it('não salta para conclusão', () => {
    const lastAnnounce = steps.findLastIndex((s) => s.kind === 'mystery-announcement');
    const from = lastAnnounce - 1;
    const target = skipToNextMysteryIndex(steps, from);
    expect(steps[target]?.kind).not.toBe('completion');
  });
});
