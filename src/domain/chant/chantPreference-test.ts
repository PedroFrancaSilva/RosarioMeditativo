import { parseChantEnabled, serializeChantEnabled, shouldPlayChant } from '@/domain/chant/chantPreference';

describe('parseChantEnabled', () => {
  it('trata ausência, desligado e valor ilegível como silêncio', () => {
    expect(parseChantEnabled(null)).toBe(false);
    expect(parseChantEnabled(undefined)).toBe(false);
    expect(parseChantEnabled('0')).toBe(false);
    expect(parseChantEnabled('')).toBe(false);
    expect(parseChantEnabled('yes')).toBe(false);
  });

  it('reidrata ligado só com o valor salvo', () => {
    expect(parseChantEnabled('1')).toBe(true);
    expect(serializeChantEnabled(true)).toBe('1');
    expect(serializeChantEnabled(false)).toBe('0');
  });
});

describe('shouldPlayChant', () => {
  it('toca na oração com interruptor ligado, app ativo e faixa carregada', () => {
    expect(shouldPlayChant({ enabled: true, inPrayer: true, appActive: true, loaded: true })).toBe(true);
  });

  it('permanece em silêncio no menu, no primeiro uso, desligado ou sem faixa', () => {
    expect(shouldPlayChant({ enabled: true, inPrayer: false, appActive: true, loaded: true })).toBe(false);
    expect(shouldPlayChant({ enabled: false, inPrayer: true, appActive: true, loaded: true })).toBe(false);
    expect(shouldPlayChant({ enabled: true, inPrayer: true, appActive: true, loaded: false })).toBe(false);
  });

  it('pausa fora de primeiro plano sem alterar o sentido do interruptor ligado', () => {
    const enabled = true;
    expect(shouldPlayChant({ enabled, inPrayer: true, appActive: false, loaded: true })).toBe(false);
    expect(enabled).toBe(true);
  });
});
