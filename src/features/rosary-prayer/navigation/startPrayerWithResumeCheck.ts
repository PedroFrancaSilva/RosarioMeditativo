import type { Href } from 'expo-router';

import type { IncompleteRosarySession } from '@/domain/rosary/incompleteRosarySession';
import { describeIncompleteSession, type PrayerStartIntent } from '@/features/rosary-prayer/navigation/incompleteSessionLabel';
import {
  prayerHrefForIntent,
  prayerHrefFromSnapshot,
} from '@/features/rosary-prayer/navigation/prayerNavigation';
import { readIncompleteSession } from '@/features/rosary-prayer/session/incompleteSessionStorage';

export { prayerHrefForIntent, prayerHrefFromSnapshot } from '@/features/rosary-prayer/navigation/prayerNavigation';

export type ResumePrayerChoice = {
  description: string;
  resumeHref: Href;
  freshHref: Href;
  saved: IncompleteRosarySession;
};

export async function startPrayerWithResumeCheck(
  intent: PrayerStartIntent,
): Promise<{ kind: 'open'; href: Href } | { kind: 'ask'; choice: ResumePrayerChoice }> {
  const saved = await readIncompleteSession();
  if (!saved) {
    return { kind: 'open', href: prayerHrefForIntent(intent) };
  }
  return {
    kind: 'ask',
    choice: {
      description: describeIncompleteSession(saved),
      resumeHref: prayerHrefFromSnapshot(saved),
      freshHref: prayerHrefForIntent(intent),
      saved,
    },
  };
}
