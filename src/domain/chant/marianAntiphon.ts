import { BUNDLED_CHANT_IDS, CHANT_CREDITS, type ChantCredit } from '@/domain/chant/chantCredits';

export type MarianAntiphonId = 'alma' | 'ave-regina' | 'regina-caeli' | 'salve';

export type CivilDate = {
  year: number;
  month: number;
  day: number;
};

export function civilDateFromLocal(date: Date): CivilDate {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
}

export function dateKey(date: CivilDate): number {
  return date.year * 10000 + date.month * 100 + date.day;
}

function fromUtc(date: Date): CivilDate {
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  };
}

export function addDays(date: CivilDate, days: number): CivilDate {
  return fromUtc(new Date(Date.UTC(date.year, date.month - 1, date.day + days)));
}

/** 1º domingo do Advento: Natal menos 28 dias se cai num domingo, senão menos 21 + dia da semana. */
export function adventSunday(year: number): CivilDate {
  const dow = new Date(Date.UTC(year, 11, 25)).getUTCDay();
  const back = dow === 0 ? 28 : 21 + dow;
  return fromUtc(new Date(Date.UTC(year, 11, 25 - back)));
}

/** Páscoa gregoriana ocidental (Meeus/Jones/Butcher). */
export function easterSunday(year: number): CivilDate {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return { year, month, day };
}

export function marianAntiphonForDate(date: CivilDate): MarianAntiphonId {
  const key = dateKey(date);
  if (key >= dateKey(adventSunday(date.year))) return 'alma';
  if (date.month < 2 || (date.month === 2 && date.day <= 2)) return 'alma';

  const easter = easterSunday(date.year);
  const holySaturday = addDays(easter, -1);
  if (key <= dateKey(holySaturday)) return 'ave-regina';

  // No rito tradicional, a Regina Caeli vai até o sábado depois de Pentecostes.
  const saturdayAfterPentecost = addDays(easter, 55);
  if (key <= dateKey(saturdayAfterPentecost)) return 'regina-caeli';

  return 'salve';
}

export function resolveChant(antiphon: MarianAntiphonId, catalog: readonly string[]): ChantCredit {
  const available = new Set(catalog);
  if (available.has(antiphon) && Object.prototype.hasOwnProperty.call(CHANT_CREDITS, antiphon)) {
    return CHANT_CREDITS[antiphon as ChantCredit['id']];
  }
  return CHANT_CREDITS.salve;
}

export function bundledChantForDate(date: CivilDate): ChantCredit {
  return resolveChant(marianAntiphonForDate(date), BUNDLED_CHANT_IDS);
}
