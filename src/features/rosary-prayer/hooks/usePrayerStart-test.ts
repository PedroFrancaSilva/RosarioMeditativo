import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, renderHook } from '@testing-library/react-native';

import { getEmbeddedCatalog } from '@/data/repositories/mysteryRepository';
import { snapshotFromConfig } from '@/domain/rosary/incompleteRosarySession';
import { usePrayerStart } from '@/features/rosary-prayer/hooks/usePrayerStart';
import {
  clearIncompleteSession,
  writeIncompleteSession,
} from '@/features/rosary-prayer/session/incompleteSessionStorage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

const sorrowfulIntent = {
  mode: 'tercio' as const,
  set: 'classic' as const,
  mysteryType: 'sorrowful' as const,
};

describe('usePrayerStart', () => {
  beforeEach(async () => {
    (AsyncStorage.getItem as jest.Mock).mockReset();
    (AsyncStorage.setItem as jest.Mock).mockReset();
    (AsyncStorage.removeItem as jest.Mock).mockReset();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
    (AsyncStorage.removeItem as jest.Mock).mockResolvedValue(undefined);
    await clearIncompleteSession();
  });

  it('sem snapshot devolve o href do terço pedido', async () => {
    const { result } = await renderHook(() => usePrayerStart());

    let outcome: Awaited<ReturnType<typeof result.current.begin>> | undefined;
    await act(async () => {
      outcome = await result.current.begin(sorrowfulIntent);
    });

    expect(outcome).toEqual({
      kind: 'open',
      href: {
        pathname: '/prayer',
        params: {
          mode: 'tercio',
          set: 'classic',
          mysteryType: 'sorrowful',
        },
      },
    });
    expect(result.current.dialogDescription).toBeNull();
  });

  it('com snapshot não devolve href e deixa o diálogo disponível', async () => {
    const joyful = getEmbeddedCatalog('classic').filter((mystery) => mystery.type === 'joyful');
    await writeIncompleteSession(
      snapshotFromConfig({ mode: 'tercio', set: 'classic', mysteries: joyful }, 2),
    );
    const { result } = await renderHook(() => usePrayerStart());

    let outcome: Awaited<ReturnType<typeof result.current.begin>> | undefined;
    await act(async () => {
      outcome = await result.current.begin(sorrowfulIntent);
    });

    expect(outcome).toEqual({ kind: 'ask' });
    expect(result.current.dialogDescription).toBeTruthy();

    let href: ReturnType<typeof result.current.continueSaved> = null;
    await act(async () => {
      href = result.current.continueSaved();
    });
    expect(href).toEqual({
      pathname: '/prayer',
      params: {
        mode: 'tercio',
        set: 'classic',
        mysteryType: 'joyful',
        stepIndex: '2',
        formTraditional: '0',
        formLanguage: 'pt',
        formFatima: '1',
      },
    });
  });

  it('iniciar nova apaga o snapshot antes de devolver o href fresco', async () => {
    const joyful = getEmbeddedCatalog('classic').filter((mystery) => mystery.type === 'joyful');
    await writeIncompleteSession(
      snapshotFromConfig({ mode: 'tercio', set: 'classic', mysteries: joyful }, 2),
    );
    const events: string[] = [];
    (AsyncStorage.removeItem as jest.Mock).mockImplementation(async () => {
      events.push('clear');
    });

    const { result } = await renderHook(() => usePrayerStart());
    await act(async () => {
      await result.current.begin(sorrowfulIntent);
    });

    await act(async () => {
      const href = await result.current.startFresh();
      events.push(href ? 'href' : 'none');
      expect(href).toEqual({
        pathname: '/prayer',
        params: {
          mode: 'tercio',
          set: 'classic',
          mysteryType: 'sorrowful',
        },
      });
    });

    expect(events).toEqual(['clear', 'href']);
  });
});
