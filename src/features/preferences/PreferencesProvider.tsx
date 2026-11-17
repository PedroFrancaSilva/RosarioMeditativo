import AsyncStorage from '@react-native-async-storage/async-storage';
import { PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  DEFAULT_PREFERENCES,
  parsePrayerPreferences,
  serializePrayerPreferences,
  textScale,
  type PrayerPreferences,
} from '@/domain/preferences/prayerPreferences';
import { PreferencesContext } from '@/features/preferences/preferencesContext';

export const PREFERENCES_STORAGE_KEY = '@rosario/preferences';

export function PreferencesProvider({ children }: PropsWithChildren) {
  const [preferences, setPreferences] = useState<PrayerPreferences>(DEFAULT_PREFERENCES);
  const [loaded, setLoaded] = useState(false);
  const touched = useRef(false);

  useEffect(() => {
    let cancelled = false;
    AsyncStorage.getItem(PREFERENCES_STORAGE_KEY)
      .then((raw) => {
        // Uma mudança feita antes da leitura terminar não é desfeita pelo valor antigo.
        if (!cancelled && !touched.current) setPreferences(parsePrayerPreferences(raw));
      })
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const update = useCallback((patch: Partial<PrayerPreferences>) => {
    touched.current = true;
    setPreferences((current) => {
      const next = { ...current, ...patch };
      void AsyncStorage.setItem(PREFERENCES_STORAGE_KEY, serializePrayerPreferences(next)).catch(
        () => undefined,
      );
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ preferences, loaded, textScale: textScale(preferences.textSize), update }),
    [preferences, loaded, update],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}
