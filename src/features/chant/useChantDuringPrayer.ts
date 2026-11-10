import { useEffect } from 'react';

import { useChant } from '@/features/chant/chantContext';

/** Liga o canto ao abrir a oração e pausa ao sair, sem mudar o interruptor do menu. */
export function useChantDuringPrayer() {
  const { setInPrayer } = useChant();

  useEffect(() => {
    setInPrayer(true);
    return () => setInPrayer(false);
  }, [setInPrayer]);
}
