import { buildPrayerSteps } from '@/domain/rosary/buildPrayerSteps';
import { getPersistentMysteryLabel } from '@/domain/rosary/mysteryLabel';
import { buildRosaryProgressModel } from '@/domain/rosary/rosaryProgress';
import { resolveEmbeddedMysteryContentKey } from '@/domain/resolveEmbeddedMysteryContentKey';
import {
  canSkipToNextMystery as canSkipToNextMysteryStep,
  skipToNextMysteryIndex,
} from '@/domain/rosary/sessionNavigation';
import type { PrayerStep, RosarySessionConfig } from '@/domain/rosary/types';
import { useMemo, useReducer } from 'react';

import { presentPrayerStep, type StepPresentation } from '@/features/rosary-prayer/session/stepPresentation';

type SessionState = {
  steps: PrayerStep[];
  stepIndex: number;
};

type SessionAction =
  | { type: 'next' }
  | { type: 'previous' }
  | { type: 'skipToNextMystery' };

function clampStepIndex(index: number, stepCount: number): number {
  if (stepCount <= 0) return 0;
  return Math.min(Math.max(0, index), stepCount - 1);
}

function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case 'next':
      return {
        ...state,
        stepIndex: Math.min(state.stepIndex + 1, state.steps.length - 1),
      };
    case 'previous':
      return {
        ...state,
        stepIndex: Math.max(state.stepIndex - 1, 0),
      };
    case 'skipToNextMystery': {
      const nextIndex = skipToNextMysteryIndex(state.steps, state.stepIndex);
      return {
        ...state,
        stepIndex: nextIndex,
      };
    }
    default:
      return state;
  }
}

function createInitialSessionState(
  steps: PrayerStep[],
  initialStepIndex: number,
): SessionState {
  return {
    steps,
    stepIndex: clampStepIndex(initialStepIndex, steps.length),
  };
}

export type UseRosarySessionOptions = {
  initialStepIndex?: number;
};

export function useRosarySession(
  config: RosarySessionConfig,
  options?: UseRosarySessionOptions,
) {
  const steps = useMemo(() => buildPrayerSteps(config), [config]);
  const initialStepIndex = options?.initialStepIndex ?? 0;

  const [state, dispatch] = useReducer(
    sessionReducer,
    { steps, initialStepIndex },
    ({ steps: builtSteps, initialStepIndex: startIndex }) =>
      createInitialSessionState(builtSteps, startIndex),
  );

  const currentStep = state.steps[state.stepIndex];
  const presentation: StepPresentation = useMemo(
    () => presentPrayerStep(currentStep),
    [currentStep],
  );

  const persistentMysteryLabel = useMemo(
    () => getPersistentMysteryLabel(state.steps, currentStep),
    [state.steps, currentStep],
  );

  const progress = useMemo(
    () => buildRosaryProgressModel(state.steps, state.stepIndex, config.mysteries),
    [state.steps, state.stepIndex, config.mysteries],
  );

  const isComplete = currentStep?.kind === 'completion';
  const canGoNext = state.stepIndex < state.steps.length - 1 && !isComplete;
  const canGoPrevious = state.stepIndex > 0 && !isComplete;
  const canSkipToNextMystery = useMemo(
    () => canSkipToNextMysteryStep(state.steps, state.stepIndex),
    [state.steps, state.stepIndex],
  );

  const activeMystery = useMemo(() => {
    const id = currentStep?.mysteryId;
    if (!id) return undefined;
    return config.mysteries.find((m) => m.id === id);
  }, [config.mysteries, currentStep?.mysteryId]);

  const mysteryContentKey = useMemo(
    () =>
      resolveEmbeddedMysteryContentKey(activeMystery?.id, {
        type: activeMystery?.type,
        sortOrder: activeMystery?.sortOrder,
      }),
    [activeMystery],
  );

  return {
    steps: state.steps,
    stepIndex: state.stepIndex,
    currentStep,
    presentation,
    persistentMysteryLabel,
    progress,
    activeMystery,
    mysteryContentKey,
    isComplete,
    canGoNext,
    canGoPrevious,
    canSkipToNextMystery,
    next: () => dispatch({ type: 'next' }),
    previous: () => dispatch({ type: 'previous' }),
    skipToNextMystery: () => dispatch({ type: 'skipToNextMystery' }),
  };
}

export { clampStepIndex, createInitialSessionState };
