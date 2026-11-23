import type { Href } from 'expo-router';

import type { IncompleteRosarySession } from '@/domain/rosary/incompleteRosarySession';
import { MODERN_PRAYER_FORM, prayerFormToParams } from '@/domain/rosary/prayerForm';
import type { PrayerForm } from '@/domain/rosary/types';
import type { PrayerStartIntent } from '@/features/rosary-prayer/navigation/incompleteSessionLabel';

export function prayerHrefForIntent(
  intent: PrayerStartIntent,
  stepIndex?: number,
  form?: PrayerForm,
): Href {
  const params: Record<string, string> = {
    mode: intent.mode,
    set: intent.set,
  };
  if (intent.mysteryId) params.mysteryId = intent.mysteryId;
  if (intent.mysteryType) params.mysteryType = intent.mysteryType;
  if (stepIndex !== undefined) params.stepIndex = String(stepIndex);
  if (form) Object.assign(params, prayerFormToParams(form));
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
    // A forma muda quantos passos existem; a sessão retoma com a sua.
    session.form ?? MODERN_PRAYER_FORM,
  );
}
