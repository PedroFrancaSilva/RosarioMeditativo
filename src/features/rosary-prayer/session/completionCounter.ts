import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { parseCompletedCount, tercosInCompletedSession } from '@/domain/rosary/completionCount';
import type { PrayerStep, RosarySessionConfig } from '@/domain/rosary/types';

export const COMPLETED_COUNT_STORAGE_KEY = '@rosario/completed-tercos';
const QUERY_KEY = ['completed-tercos'] as const;

export async function readCompletedCount(): Promise<number> {
  try {
    return parseCompletedCount(await AsyncStorage.getItem(COMPLETED_COUNT_STORAGE_KEY));
  } catch {
    return 0;
  }
}

/** Soma `amount` ao contador guardado e devolve o novo total. */
export async function addCompletedTercos(amount: number): Promise<number> {
  const current = await readCompletedCount();
  if (amount <= 0) return current;
  const next = current + amount;
  await AsyncStorage.setItem(COMPLETED_COUNT_STORAGE_KEY, String(next));
  return next;
}

export function useCompletedCount() {
  return useQuery({ queryKey: QUERY_KEY, queryFn: readCompletedCount, staleTime: Infinity });
}

/**
 * Conta a sessão uma única vez, ao chegar ao passo de conclusão.
 * Mistério avulso não conta (soma zero).
 */
export function useRecordCompletion(config: RosarySessionConfig, currentStep: PrayerStep | undefined) {
  const queryClient = useQueryClient();
  const recorded = useRef(false);
  const isCompletion = currentStep?.kind === 'completion';

  useEffect(() => {
    if (!isCompletion || recorded.current) return;
    recorded.current = true;
    const amount = tercosInCompletedSession(config);
    if (amount <= 0) return;
    void addCompletedTercos(amount)
      .then((total) => queryClient.setQueryData(QUERY_KEY, total))
      .catch(() => undefined);
  }, [config, isCompletion, queryClient]);
}
