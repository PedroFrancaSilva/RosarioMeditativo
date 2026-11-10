import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState, type AppStateStatus } from 'react-native';

import { parseChantEnabled, serializeChantEnabled, shouldPlayChant } from '@/domain/chant/chantPreference';
import { bundledChantForDate, civilDateFromLocal, type CivilDate } from '@/domain/chant/marianAntiphon';
import { chantSources } from '@/features/chant/chantAssets';
import { ChantContext, type ChantContextValue } from '@/features/chant/chantContext';

const STORAGE_KEY = '@rosario/chant-enabled';
/** Ganho do player (0–1) sobre o stream de mídia do sistema; 1 = volume dos botões do aparelho. */
const CHANT_PLAYER_GAIN = 1;

function readAppState(): AppStateStatus {
  const current = AppState.currentState;
  if (
    current === 'active' ||
    current === 'background' ||
    current === 'inactive' ||
    current === 'unknown' ||
    current === 'extension'
  ) {
    return current;
  }
  return 'active';
}

function msUntilNextLocalMidnight(now: Date): number {
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  return Math.max(1_000, next.getTime() - now.getTime());
}

/** expo-audio usa `Audio` do navegador; no SSR web (Node) isso quebra o render. */
export function canRunExpoAudio(): boolean {
  return typeof window !== 'undefined';
}

function ssrChantContextValue(): ChantContextValue {
  return {
    enabled: false,
    unavailable: false,
    ready: false,
    credit: bundledChantForDate(civilDateFromLocal(new Date())),
    setEnabled: () => undefined,
    setInPrayer: () => undefined,
  };
}

function ChantProviderRuntime({ children }: PropsWithChildren) {
  const [today, setToday] = useState<CivilDate>(() => civilDateFromLocal(new Date()));
  const [enabled, setEnabledState] = useState(false);
  const [ready, setReady] = useState(false);
  const [appState, setAppState] = useState<AppStateStatus>(readAppState);
  const [modeFailed, setModeFailed] = useState(false);
  const [inPrayer, setInPrayerState] = useState(false);
  const readyRef = useRef(false);

  const credit = bundledChantForDate(today);
  const player = useAudioPlayer(chantSources[credit.id]);
  const status = useAudioPlayerStatus(player);
  const loadedId = useRef(credit.id);

  useEffect(() => {
    let cancelled = false;
    AsyncStorage.getItem(STORAGE_KEY).then(
      (raw) => {
        if (cancelled) return;
        setEnabledState(parseChantEnabled(raw));
        readyRef.current = true;
        setReady(true);
      },
      () => {
        if (cancelled) return;
        setEnabledState(false);
        readyRef.current = true;
        setReady(true);
      },
    );
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    void setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: false,
      interruptionMode: 'mixWithOthers',
    }).catch(() => setModeFailed(true));
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (next) => {
      setAppState(next);
      if (next === 'active') setToday(civilDateFromLocal(new Date()));
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setToday(civilDateFromLocal(new Date())), msUntilNextLocalMidnight(new Date()));
    return () => clearTimeout(timer);
  }, [today]);

  useEffect(() => {
    if (loadedId.current !== credit.id) {
      loadedId.current = credit.id;
      player.replace(chantSources[credit.id]);
    }
    player.loop = true;
    player.volume = CHANT_PLAYER_GAIN;
  }, [credit.id, player]);

  const loaded = status.isLoaded && !status.error && !modeFailed;
  const appActive = appState === 'active';

  useEffect(() => {
    if (!ready) return;
    if (shouldPlayChant({ enabled, inPrayer, appActive, loaded })) player.play();
    else player.pause();
  }, [ready, enabled, inPrayer, appActive, loaded, player, credit.id]);

  const setEnabled = useCallback((next: boolean) => {
    if (!readyRef.current) return;
    setEnabledState(next);
    void AsyncStorage.setItem(STORAGE_KEY, serializeChantEnabled(next));
  }, []);

  const setInPrayer = useCallback((next: boolean) => {
    setInPrayerState(next);
  }, []);

  const unavailable = ready && enabled && appActive && (modeFailed || Boolean(status.error));

  const value = useMemo(
    () => ({ enabled, unavailable, credit, ready, setEnabled, setInPrayer }),
    [enabled, unavailable, credit, ready, setEnabled, setInPrayer],
  );

  return <ChantContext.Provider value={value}>{children}</ChantContext.Provider>;
}

export function ChantProvider({ children }: PropsWithChildren) {
  if (!canRunExpoAudio()) {
    return <ChantContext.Provider value={ssrChantContextValue()}>{children}</ChantContext.Provider>;
  }
  return <ChantProviderRuntime>{children}</ChantProviderRuntime>;
}
