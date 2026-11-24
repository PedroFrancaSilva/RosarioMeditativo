import type { MysterySet, PrayerForm, PrayerLanguage } from '@/domain/rosary/types';

export const MODERN_PRAYER_FORM: PrayerForm = {
  traditional: false,
  language: 'pt',
  fatima: true,
};

/**
 * O idioma vale para os dois conjuntos; as formas tradicionais e a escolha da Oração de
 * Fátima só valem no conjunto tradicional.
 */
export function resolvePrayerForm(
  set: MysterySet,
  options: { language: PrayerLanguage; fatima: boolean },
): PrayerForm {
  if (set !== 'classic') return { ...MODERN_PRAYER_FORM, language: options.language };
  return { traditional: true, language: options.language, fatima: options.fatima };
}

export function isPrayerLanguage(value: unknown): value is PrayerLanguage {
  return value === 'pt' || value === 'la';
}

export function isPrayerForm(value: unknown): value is PrayerForm {
  if (typeof value !== 'object' || value === null) return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.traditional === 'boolean' &&
    isPrayerLanguage(record.language) &&
    typeof record.fatima === 'boolean'
  );
}

export function prayerFormToParams(form: PrayerForm): Record<string, string> {
  return {
    formTraditional: form.traditional ? '1' : '0',
    formLanguage: form.language,
    formFatima: form.fatima ? '1' : '0',
  };
}

type FormParams = {
  formTraditional?: string | string[];
  formLanguage?: string | string[];
  formFatima?: string | string[];
};

/** Só uma sessão retomada traz a forma na rota; uma sessão nova usa as preferências. */
export function prayerFormFromParams(params: FormParams): PrayerForm | null {
  const { formTraditional, formLanguage, formFatima } = params;
  if (
    (formTraditional !== '0' && formTraditional !== '1') ||
    !isPrayerLanguage(formLanguage) ||
    (formFatima !== '0' && formFatima !== '1')
  ) {
    return null;
  }
  return {
    traditional: formTraditional === '1',
    language: formLanguage,
    fatima: formFatima === '1',
  };
}
