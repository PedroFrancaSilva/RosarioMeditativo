import type { Mystery } from '@/domain/mystery';

export const mysteryA: Mystery = {
  id: 'test-m1',
  name: 'Mistério Um',
  type: 'joyful',
  sortOrder: 1,
  description: null,
  meditationReady: false,
};

export const mysteryB: Mystery = {
  id: 'test-m2',
  name: 'Mistério Dois',
  type: 'joyful',
  sortOrder: 2,
  description: null,
  meditationReady: false,
};

export const twoMysterySession = {
  mode: 'full' as const,
  set: 'classic' as const,
  mysteries: [mysteryA, mysteryB],
};

export const singleMysterySession = {
  mode: 'single' as const,
  set: 'classic' as const,
  mysteries: [mysteryA],
};
