import type { Href } from 'expo-router';
import { useCallback, useState } from 'react';

import type { PrayerStartIntent } from '@/features/rosary-prayer/navigation/incompleteSessionLabel';
import {
  startPrayerWithResumeCheck,
  type ResumePrayerChoice,
} from '@/features/rosary-prayer/navigation/startPrayerWithResumeCheck';
import { clearIncompleteSession } from '@/features/rosary-prayer/session/incompleteSessionStorage';

export type PrayerBeginResult = { kind: 'open'; href: Href } | { kind: 'ask' };

export function usePrayerStart() {
  const [choice, setChoice] = useState<ResumePrayerChoice | null>(null);

  const begin = useCallback(async (intent: PrayerStartIntent): Promise<PrayerBeginResult> => {
    const result = await startPrayerWithResumeCheck(intent);
    if (result.kind === 'open') return result;
    setChoice(result.choice);
    return { kind: 'ask' };
  }, []);

  const continueSaved = useCallback((): Href | null => {
    if (!choice) return null;
    const href = choice.resumeHref;
    setChoice(null);
    return href;
  }, [choice]);

  const startFresh = useCallback(async (): Promise<Href | null> => {
    if (!choice) return null;
    const href = choice.freshHref;
    setChoice(null);
    await clearIncompleteSession();
    return href;
  }, [choice]);

  const dismiss = useCallback(() => setChoice(null), []);

  return {
    begin,
    continueSaved,
    startFresh,
    dismiss,
    dialogDescription: choice?.description ?? null,
  };
}
