import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  parseIncompleteSession,
  serializeIncompleteSession,
  snapshotFromConfig,
  validateIncompleteSession,
  type IncompleteRosarySession,
} from '@/domain/rosary/incompleteRosarySession';
import type { RosarySessionConfig } from '@/domain/rosary/types';

export const INCOMPLETE_SESSION_STORAGE_KEY = '@rosario/incomplete-session';

/** Cópia em memória para a pergunta aparecer mesmo se o disco ainda não gravou. */
let memorySession: IncompleteRosarySession | null = null;

export async function readIncompleteSession(): Promise<IncompleteRosarySession | null> {
  if (memorySession) {
    const valid = validateIncompleteSession(memorySession);
    if (valid) return valid;
    memorySession = null;
  }
  const raw = await AsyncStorage.getItem(INCOMPLETE_SESSION_STORAGE_KEY);
  const parsed = parseIncompleteSession(raw);
  if (raw && !parsed) {
    await AsyncStorage.removeItem(INCOMPLETE_SESSION_STORAGE_KEY);
  }
  memorySession = parsed;
  return parsed;
}

export async function writeIncompleteSession(session: IncompleteRosarySession): Promise<void> {
  memorySession = session;
  await AsyncStorage.setItem(INCOMPLETE_SESSION_STORAGE_KEY, serializeIncompleteSession(session));
}

export async function writeIncompleteSessionFromConfig(
  config: RosarySessionConfig,
  stepIndex: number,
): Promise<void> {
  await writeIncompleteSession(snapshotFromConfig(config, stepIndex));
}

export async function clearIncompleteSession(): Promise<void> {
  memorySession = null;
  await AsyncStorage.removeItem(INCOMPLETE_SESSION_STORAGE_KEY);
}
