export function parseChantEnabled(raw: string | null | undefined): boolean {
  return raw === '1';
}

export function serializeChantEnabled(enabled: boolean): '1' | '0' {
  return enabled ? '1' : '0';
}

/** Tocar na oração, com o interruptor ligado, o app em primeiro plano e a faixa carregada. */
export function shouldPlayChant(input: {
  enabled: boolean;
  inPrayer: boolean;
  appActive: boolean;
  loaded: boolean;
}): boolean {
  return input.enabled && input.inPrayer && input.appActive && input.loaded;
}
