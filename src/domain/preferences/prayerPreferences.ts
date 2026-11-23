import { isPrayerLanguage } from '@/domain/rosary/prayerForm';
import type { MysterySet, PrayerLanguage } from '@/domain/rosary/types';

/** Tamanho do texto das orações e da meditação. */
export type TextSize = 'normal' | 'large' | 'xlarge';

/** O que acompanha as três Ave-Marias iniciais. */
export type OpeningIntentions = 'virtues' | 'angelus';

export type DailyReminder = {
  enabled: boolean;
  hour: number;
  minute: number;
};

export type PrayerPreferences = {
  textSize: TextSize;
  haptics: boolean;
  openingIntentions: OpeningIntentions;
  reminder: DailyReminder;
  /** Conjunto escolhido na home. `classic` é o modo Rosário tradicional. */
  mysterySet: MysterySet;
  /** Idioma das orações no modo tradicional. */
  prayerLanguage: PrayerLanguage;
  /** Oração de Fátima no modo tradicional. */
  fatimaPrayer: boolean;
};

export const PREFERENCES_SCHEMA_VERSION = 1;

export const DEFAULT_PREFERENCES: PrayerPreferences = {
  textSize: 'normal',
  haptics: true,
  openingIntentions: 'virtues',
  reminder: { enabled: false, hour: 20, minute: 0 },
  mysterySet: 'jp2',
  prayerLanguage: 'pt',
  fatimaPrayer: true,
};

export const TEXT_SIZES: readonly TextSize[] = ['normal', 'large', 'xlarge'];

const TEXT_SCALE: Record<TextSize, number> = {
  normal: 1,
  large: 1.15,
  xlarge: 1.3,
};

export function textScale(size: TextSize): number {
  return TEXT_SCALE[size];
}

export const TEXT_SIZE_LABELS: Record<TextSize, string> = {
  normal: 'Normal',
  large: 'Grande',
  xlarge: 'Muito grande',
};

function isTextSize(value: unknown): value is TextSize {
  return typeof value === 'string' && (TEXT_SIZES as readonly string[]).includes(value);
}

function isOpeningIntentions(value: unknown): value is OpeningIntentions {
  return value === 'virtues' || value === 'angelus';
}

function clampInt(value: unknown, min: number, max: number, fallback: number): number {
  if (typeof value !== 'number' || !Number.isInteger(value)) return fallback;
  return Math.min(max, Math.max(min, value));
}

/** Lê o JSON guardado. Campo inválido ou ausente fica no padrão; JSON quebrado dá o padrão inteiro. */
export function parsePrayerPreferences(raw: string | null | undefined): PrayerPreferences {
  if (!raw) return DEFAULT_PREFERENCES;
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return DEFAULT_PREFERENCES;
  }
  if (typeof data !== 'object' || data === null) return DEFAULT_PREFERENCES;
  const record = data as Record<string, unknown>;
  if (record.schemaVersion !== PREFERENCES_SCHEMA_VERSION) return DEFAULT_PREFERENCES;
  const reminder =
    typeof record.reminder === 'object' && record.reminder !== null
      ? (record.reminder as Record<string, unknown>)
      : {};
  const fallback = DEFAULT_PREFERENCES;
  return {
    textSize: isTextSize(record.textSize) ? record.textSize : fallback.textSize,
    haptics: typeof record.haptics === 'boolean' ? record.haptics : fallback.haptics,
    openingIntentions: isOpeningIntentions(record.openingIntentions)
      ? record.openingIntentions
      : fallback.openingIntentions,
    reminder: {
      enabled:
        typeof reminder.enabled === 'boolean' ? reminder.enabled : fallback.reminder.enabled,
      hour: clampInt(reminder.hour, 0, 23, fallback.reminder.hour),
      minute: clampInt(reminder.minute, 0, 59, fallback.reminder.minute),
    },
    mysterySet:
      record.mysterySet === 'classic' || record.mysterySet === 'jp2'
        ? record.mysterySet
        : fallback.mysterySet,
    prayerLanguage: isPrayerLanguage(record.prayerLanguage)
      ? record.prayerLanguage
      : fallback.prayerLanguage,
    fatimaPrayer:
      typeof record.fatimaPrayer === 'boolean' ? record.fatimaPrayer : fallback.fatimaPrayer,
  };
}

export function serializePrayerPreferences(preferences: PrayerPreferences): string {
  return JSON.stringify({ schemaVersion: PREFERENCES_SCHEMA_VERSION, ...preferences });
}

/** Avança a hora do lembrete em passos de `step` minutos, dando a volta ao dia. */
export function shiftReminderTime(
  reminder: Pick<DailyReminder, 'hour' | 'minute'>,
  deltaMinutes: number,
): { hour: number; minute: number } {
  const total = (((reminder.hour * 60 + reminder.minute + deltaMinutes) % 1440) + 1440) % 1440;
  return { hour: Math.floor(total / 60), minute: total % 60 };
}

export function formatReminderTime(reminder: Pick<DailyReminder, 'hour' | 'minute'>): string {
  return `${String(reminder.hour).padStart(2, '0')}:${String(reminder.minute).padStart(2, '0')}`;
}
