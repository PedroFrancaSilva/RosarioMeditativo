import { useEffect, useRef } from 'react';

import type { PrayerStep, RosarySessionConfig } from '@/domain/rosary/types';
import {
  clearIncompleteSession,
  writeIncompleteSessionFromConfig,
} from '@/features/rosary-prayer/session/incompleteSessionStorage';

const PERSIST_DEBOUNCE_MS = 300;

export function usePersistRosarySession(
  config: RosarySessionConfig,
  stepIndex: number,
  currentStep: PrayerStep | undefined,
) {
  const latest = useRef({ config, stepIndex, currentStep });
  latest.current = { config, stepIndex, currentStep };

  useEffect(() => {
    if (!currentStep) return;
    if (currentStep.kind === 'completion') {
      void clearIncompleteSession();
      return;
    }
    const timer = setTimeout(() => {
      void writeIncompleteSessionFromConfig(config, stepIndex);
    }, PERSIST_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [config, stepIndex, currentStep?.id, currentStep?.kind]);

  useEffect(() => {
    return () => {
      const { config: latestConfig, stepIndex: latestIndex, currentStep: step } = latest.current;
      if (step && step.kind !== 'completion') {
        void writeIncompleteSessionFromConfig(latestConfig, latestIndex);
      }
    };
  }, []);
}
