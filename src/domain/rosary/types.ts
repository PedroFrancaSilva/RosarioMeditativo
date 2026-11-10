import type { Mystery } from '@/domain/mystery';

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
  | 'hail-holy-queen';

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
};

export type RosarySessionConfig = {
  mode: RosaryMode;
  set: MysterySet;
  mysteries: Mystery[];
};

export type FixedPrayer = {
  id: FixedPrayerId;
  title: string;
  summary: string;
  fullText: string;
};
