import {
  DEFAULT_PREFERENCES,
  formatReminderTime,
  parsePrayerPreferences,
  serializePrayerPreferences,
  shiftReminderTime,
  textScale,
} from '@/domain/preferences/prayerPreferences';

describe('prayerPreferences', () => {
  it('sem nada guardado usa o padrão: texto normal, vibração ligada, fé/esperança/caridade, sem lembrete', () => {
    expect(parsePrayerPreferences(null)).toEqual(DEFAULT_PREFERENCES);
    expect(DEFAULT_PREFERENCES).toMatchObject({
      textSize: 'normal',
      haptics: true,
      openingIntentions: 'virtues',
      reminder: { enabled: false },
    });
  });

  it('grava e lê de volta', () => {
    const prefs = {
      textSize: 'xlarge' as const,
      haptics: false,
      openingIntentions: 'angelus' as const,
      reminder: { enabled: true, hour: 6, minute: 30 },
      mysterySet: 'classic' as const,
      prayerLanguage: 'la' as const,
      fatimaPrayer: false,
    };
    expect(parsePrayerPreferences(serializePrayerPreferences(prefs))).toEqual(prefs);
  });

  it('JSON quebrado ou de outra versão volta ao padrão', () => {
    expect(parsePrayerPreferences('{')).toEqual(DEFAULT_PREFERENCES);
    expect(parsePrayerPreferences('{"schemaVersion":2,"haptics":false}')).toEqual(DEFAULT_PREFERENCES);
  });

  it('campo inválido cai no padrão sem perder os outros', () => {
    const parsed = parsePrayerPreferences(
      JSON.stringify({
        schemaVersion: 1,
        textSize: 'gigante',
        haptics: false,
        reminder: { enabled: true, hour: 40, minute: 'x' },
      }),
    );
    expect(parsed.textSize).toBe('normal');
    expect(parsed.haptics).toBe(false);
    expect(parsed.reminder).toEqual({ enabled: true, hour: 23, minute: 0 });
  });

  it('escala do texto cresce com o tamanho', () => {
    expect(textScale('normal')).toBe(1);
    expect(textScale('large')).toBeGreaterThan(1);
    expect(textScale('xlarge')).toBeGreaterThan(textScale('large'));
  });

  it('hora do lembrete dá a volta ao dia', () => {
    expect(shiftReminderTime({ hour: 23, minute: 45 }, 15)).toEqual({ hour: 0, minute: 0 });
    expect(shiftReminderTime({ hour: 0, minute: 0 }, -15)).toEqual({ hour: 23, minute: 45 });
    expect(formatReminderTime({ hour: 6, minute: 5 })).toBe('06:05');
  });
});

describe('preferências do modo tradicional', () => {
  it('começa com Luminosos, português e Oração de Fátima', () => {
    expect(DEFAULT_PREFERENCES.mysterySet).toBe('jp2');
    expect(DEFAULT_PREFERENCES.prayerLanguage).toBe('pt');
    expect(DEFAULT_PREFERENCES.fatimaPrayer).toBe(true);
  });

  it('preserva as escolhas salvas', () => {
    const saved = {
      ...DEFAULT_PREFERENCES,
      mysterySet: 'classic' as const,
      prayerLanguage: 'la' as const,
      fatimaPrayer: false,
    };
    expect(parsePrayerPreferences(serializePrayerPreferences(saved))).toEqual(saved);
  });

  it('dados antigos ou inválidos ficam no padrão', () => {
    const parsed = parsePrayerPreferences(
      JSON.stringify({ schemaVersion: 1, mysterySet: 'x', prayerLanguage: 'grego', fatimaPrayer: 1 }),
    );
    expect(parsed.mysterySet).toBe('jp2');
    expect(parsed.prayerLanguage).toBe('pt');
    expect(parsed.fatimaPrayer).toBe(true);
  });
});
