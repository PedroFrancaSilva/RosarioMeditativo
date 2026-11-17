import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

import type { HapticCue } from '@/domain/rosary/hapticCue';

/** Toca a vibração do passo. Falha (aparelho sem motor, web) é ignorada. */
export function playHapticCue(cue: HapticCue): void {
  if (Platform.OS === 'web') return;
  let run: Promise<void>;
  switch (cue) {
    case 'bead':
      run = Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      break;
    case 'decade-end':
      run = Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      break;
    case 'mystery':
      run = Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      break;
    case 'completion':
      run = Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      break;
  }
  void run.catch(() => undefined);
}
