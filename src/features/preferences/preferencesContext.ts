import { createContext, useContext } from 'react';

import { DEFAULT_PREFERENCES, type PrayerPreferences } from '@/domain/preferences/prayerPreferences';

export type PreferencesContextValue = {
  preferences: PrayerPreferences;
  /** `true` depois de ler o disco; antes disso valem os padrões. */
  loaded: boolean;
  textScale: number;
  update: (patch: Partial<PrayerPreferences>) => void;
};

export const PreferencesContext = createContext<PreferencesContextValue>({
  preferences: DEFAULT_PREFERENCES,
  loaded: false,
  textScale: 1,
  update: () => undefined,
});

export function usePrayerPreferences(): PreferencesContextValue {
  return useContext(PreferencesContext);
}
