import type { Mystery } from '@/domain/mystery';
import type { OpeningIntentions } from '@/domain/preferences/prayerPreferences';

export type RosaryMode = 'full' | 'single' | 'tercio';

/** Conjunto clássico (3) vs João Paulo II (4 mistérios, inclui Luminosos). */
export type MysterySet = 'classic' | 'jp2';

export type FixedPrayerId =
  | 'sign-of-cross'
  | 'opening-offering'
  | 'creed'
  | 'our-father'
  | 'hail-mary'
  | 'glory-be'
  | 'fatima-prayer'
  | 'closing-thanksgiving'
  | 'hail-holy-queen'
  | 'concluding-prayer';

export type PrayerLanguage = 'pt' | 'la';

/** Como as orações são rezadas nesta sessão. */
export type PrayerForm = {
  /** Credo, Glória e Oração de Fátima nas formas tradicionais. */
  traditional: boolean;
  language: PrayerLanguage;
  fatima: boolean;
};

export type PrayerStepKind = 'fixed-prayer' | 'mystery-announcement' | 'completion';

export type PrayerStep = {
  id: string;
  kind: PrayerStepKind;
  prayerId?: FixedPrayerId;
  mysteryId?: string;
  mysteryTitle?: string;
  /** 0 = Pai-Nosso da década; 1–10 = Ave-Marias; null fora da década. */
  hailMaryIndex: number | null;
  /** Citação mostrada inteira acima do texto, no mesmo passo. */
  lead: string | null;
  label: string;
  /** Posição, tipo e fruto do mistério, no passo de anúncio. */
  announcement?: string | null;
};

export type RosarySessionConfig = {
  mode: RosaryMode;
  set: MysterySet;
  mysteries: Mystery[];
  /** Frases das três Ave-Marias iniciais. Padrão: fé, esperança e caridade. */
  openingIntentions?: OpeningIntentions;
  form?: PrayerForm;
};

export type FixedPrayer = {
  id: FixedPrayerId;
  title: string;
  summary: string;
  fullText: string;
  /** Tradução em português, quando o texto está em latim. */
  translation?: string;
};
