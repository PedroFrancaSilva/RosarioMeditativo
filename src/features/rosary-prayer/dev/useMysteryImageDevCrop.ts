import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

const STORAGE_PREFIX = '@rosario/dev/lateral-crop/';

export const MYSTERY_IMAGE_DEV_CROP_MIN = 70;
export const MYSTERY_IMAGE_DEV_CROP_MAX = 100;

function storageKey(mysteryId: string) {
  return `${STORAGE_PREFIX}${mysteryId}`;
}

export function useMysteryImageDevCrop(
  mysteryId: string | null,
  options: { enabled: boolean; defaultPercent: number },
) {
  const [cropPercent, setCropPercentState] = useState(options.defaultPercent);
  const [ready, setReady] = useState(!options.enabled);

  useEffect(() => {
    if (!options.enabled || !mysteryId) {
      setReady(true);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(storageKey(mysteryId));
        if (cancelled) return;
        if (raw != null) {
          const parsed = Number(raw);
          if (
            Number.isFinite(parsed) &&
            parsed >= MYSTERY_IMAGE_DEV_CROP_MIN &&
            parsed <= MYSTERY_IMAGE_DEV_CROP_MAX
          ) {
            setCropPercentState(parsed);
          }
        }
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [mysteryId, options.enabled, options.defaultPercent]);

  const setCropPercent = useCallback(
    (next: number) => {
      if (!mysteryId || !options.enabled) return;
      const clamped = Math.min(
        MYSTERY_IMAGE_DEV_CROP_MAX,
        Math.max(MYSTERY_IMAGE_DEV_CROP_MIN, Math.round(next)),
      );
      setCropPercentState(clamped);
      void AsyncStorage.setItem(storageKey(mysteryId), String(clamped));
    },
    [mysteryId, options.enabled],
  );

  const nudge = useCallback(
    (delta: number) => setCropPercent(cropPercent + delta),
    [cropPercent, setCropPercent],
  );

  const resetToBaked = useCallback(() => {
    setCropPercent(options.defaultPercent);
  }, [options.defaultPercent, setCropPercent]);

  return {
    enabled: options.enabled,
    ready,
    cropPercent,
    setCropPercent,
    nudge,
    resetToBaked,
    /** Escala para simular crop central com `resizeMode="contain"`. */
    previewScale: 100 / cropPercent,
  };
}
