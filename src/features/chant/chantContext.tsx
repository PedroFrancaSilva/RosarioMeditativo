import { createContext, useContext } from 'react';

import type { ChantCredit } from '@/domain/chant/chantCredits';

export type ChantContextValue = {
  enabled: boolean;
  unavailable: boolean;
  ready: boolean;
  credit: ChantCredit;
  setEnabled: (enabled: boolean) => void;
  setInPrayer: (inPrayer: boolean) => void;
};

export const ChantContext = createContext<ChantContextValue | null>(null);

export function useChant(): ChantContextValue {
  const value = useContext(ChantContext);
  if (!value) {
    throw new Error('useChant precisa do ChantProvider');
  }
  return value;
}
