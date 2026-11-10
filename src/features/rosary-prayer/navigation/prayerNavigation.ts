import type { Href } from 'expo-router';

import type { IncompleteRosarySession } from '@/domain/rosary/incompleteRosarySession';
import type { PrayerStartIntent } from '@/features/rosary-prayer/navigation/incompleteSessionLabel';

export function prayerHrefForIntent(intent: PrayerStartIntent, stepIndex?: number): Href {
  const params: Record<string, string> = {
    mode: intent.mode,
    set: intent.set,
  };
  if (intent.mysteryId) params.mysteryId = intent.mysteryId;
  if (intent.mysteryType) params.mysteryType = intent.mysteryType;
  if (stepIndex !== undefined) params.stepIndex = String(stepIndex);
  return { pathname: '/prayer', params } as Href;
}

export function prayerHrefFromSnapshot(session: IncompleteRosarySession): Href {
  return prayerHrefForIntent(
    {
      mode: session.mode,
      set: session.set,
      mysteryId: session.mysteryId,
      mysteryType: session.mysteryType,
    },
    session.stepIndex,
  );
}
