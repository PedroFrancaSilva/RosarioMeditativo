import AsyncStorage from '@react-native-async-storage/async-storage';

import { getEmbeddedCatalog } from '@/data/repositories/mysteryRepository';
import { snapshotFromConfig } from '@/domain/rosary/incompleteRosarySession';
import {
  clearIncompleteSession,
  INCOMPLETE_SESSION_STORAGE_KEY,
  readIncompleteSession,
  writeIncompleteSession,
} from '@/features/rosary-prayer/session/incompleteSessionStorage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('incompleteSessionStorage', () => {
  beforeEach(async () => {
    (AsyncStorage.getItem as jest.Mock).mockReset();
    (AsyncStorage.setItem as jest.Mock).mockReset();
    (AsyncStorage.removeItem as jest.Mock).mockReset();
    await clearIncompleteSession();
  });

  it('grava, lê e apaga snapshot', async () => {
    const catalog = getEmbeddedCatalog('classic');
    const config = { mode: 'single' as const, set: 'classic' as const, mysteries: [catalog[0]!] };
    const snapshot = snapshotFromConfig(config, 4);
    const serialized = JSON.stringify(snapshot);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(serialized);

    await writeIncompleteSession(snapshot);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      INCOMPLETE_SESSION_STORAGE_KEY,
      serialized,
    );

    const read = await readIncompleteSession();
    expect(read?.stepIndex).toBe(4);

    await clearIncompleteSession();
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(INCOMPLETE_SESSION_STORAGE_KEY);
  });

  it('remove valor corrompido ao ler', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('{');
    const read = await readIncompleteSession();
    expect(read).toBeNull();
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(INCOMPLETE_SESSION_STORAGE_KEY);
  });
});
