import { getEmbeddedCatalog } from '@/data/repositories/mysteryRepository';
import { snapshotFromConfig } from '@/domain/rosary/incompleteRosarySession';
import { describeIncompleteSession } from '@/features/rosary-prayer/navigation/incompleteSessionLabel';
import {
  prayerHrefForIntent,
  prayerHrefFromSnapshot,
} from '@/features/rosary-prayer/navigation/prayerNavigation';

describe('describeIncompleteSession', () => {
  it('descreve rosário completo, terço e mistério avulso', () => {
    const catalog = getEmbeddedCatalog('classic');
    const joyful = catalog.filter((m) => m.type === 'joyful').slice(0, 5);
    const full = snapshotFromConfig(
      { mode: 'full', set: 'classic', mysteries: catalog },
      1,
    );
    expect(describeIncompleteSession(full)).toContain('completo');

    const terco = snapshotFromConfig(
      { mode: 'tercio', set: 'classic', mysteries: joyful },
      1,
    );
    expect(describeIncompleteSession(terco)).toContain('gozosos');

    const single = snapshotFromConfig({ mode: 'single', set: 'classic', mysteries: [joyful[0]!] }, 1);
    expect(describeIncompleteSession(single)).toContain('mistério');
  });
});

describe('prayer navigation hrefs', () => {
  it('continuar leva params do snapshot e nova usa intent', () => {
    const catalog = getEmbeddedCatalog('classic');
    const snapshot = snapshotFromConfig(
      { mode: 'full', set: 'classic', mysteries: catalog },
      7,
    );
    const resumeHref = prayerHrefFromSnapshot(snapshot);
    expect(resumeHref).toEqual({
      pathname: '/prayer',
      params: {
        mode: 'full',
        set: 'classic',
        stepIndex: '7',
        formTraditional: '0',
        formLanguage: 'pt',
        formFatima: '1',
      },
    });

    const freshHref = prayerHrefForIntent({ mode: 'single', set: 'jp2', mysteryId: 'x' });
    expect(freshHref).toEqual({
      pathname: '/prayer',
      params: { mode: 'single', set: 'jp2', mysteryId: 'x' },
    });
  });
});
