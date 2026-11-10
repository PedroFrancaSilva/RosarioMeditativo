import { getEmbeddedCatalog } from '@/data/repositories/mysteryRepository';
import {
  parseIncompleteSession,
  serializeIncompleteSession,
  snapshotFromConfig,
  validateIncompleteSession,
} from '@/domain/rosary/incompleteRosarySession';
import { buildPrayerSteps } from '@/domain/rosary/buildPrayerSteps';
import { singleMysterySession } from '@/domain/rosary/testFixtures';

describe('incompleteRosarySession', () => {
  it('serializa e reidrata snapshot válido', () => {
    const catalog = getEmbeddedCatalog('classic');
    const config = { mode: 'full' as const, set: 'classic' as const, mysteries: catalog };
    const snapshot = snapshotFromConfig(config, 12);
    const raw = serializeIncompleteSession(snapshot);
    const parsed = parseIncompleteSession(raw);
    expect(parsed).toEqual(snapshot);
    const steps = buildPrayerSteps(config);
    expect(steps[parsed!.stepIndex]?.kind).not.toBe('completion');
  });

  it('rejeita índice fora do fluxo', () => {
    const snapshot = snapshotFromConfig(singleMysterySession, 999);
    expect(validateIncompleteSession(snapshot)).toBeNull();
    expect(parseIncompleteSession(serializeIncompleteSession(snapshot))).toBeNull();
  });

  it('grava UUID do Supabase como slug embutido', () => {
    const remote = {
      id: '8c1e2b4a-0000-4000-8000-000000000002',
      name: 'A Visitação',
      type: 'joyful' as const,
      sortOrder: 2,
      description: null,
      meditationReady: false,
    };
    const snapshot = snapshotFromConfig(
      { mode: 'single', set: 'classic', mysteries: [remote] },
      2,
    );
    expect(snapshot.mysteryIds).toEqual(['joyful-2']);
    expect(snapshot.mysteryId).toBe('joyful-2');
    expect(parseIncompleteSession(serializeIncompleteSession(snapshot))?.stepIndex).toBe(2);
  });

  it('rejeita JSON inválido ou schema desconhecido', () => {
    expect(parseIncompleteSession('{')).toBeNull();
    expect(parseIncompleteSession('not-json')).toBeNull();
    expect(
      parseIncompleteSession(
        JSON.stringify({
          schemaVersion: 99,
          mode: 'full',
          set: 'classic',
          mysteryIds: ['x'],
          stepIndex: 0,
        }),
      ),
    ).toBeNull();
  });

  it('monta snapshot de terço a partir do catálogo embutido', () => {
    const catalog = getEmbeddedCatalog('classic');
    const joyful = catalog.filter((m) => m.type === 'joyful').slice(0, 5);
    const config = { mode: 'tercio' as const, set: 'classic' as const, mysteries: joyful };
    const snapshot = snapshotFromConfig(config, 3);
    expect(snapshot.mysteryType).toBe('joyful');
    expect(parseIncompleteSession(serializeIncompleteSession(snapshot))?.stepIndex).toBe(3);
  });
});
