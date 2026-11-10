import type { Mystery, MysteryType } from '@/domain/mystery';
import type { MysterySet } from '@/domain/rosary/types';

export const MYSTERY_SET_LABELS: Record<MysterySet, string> = {
  classic: 'Rosário tradicional',
  jp2: 'Rosário',
};

export const TERCO_TITLES: Record<MysteryType, string> = {
  joyful: 'Mistérios Gozosos',
  sorrowful: 'Mistérios Dolorosos',
  glorious: 'Mistérios Gloriosos',
  luminous: 'Mistérios Luminosos',
};

/**
 * Dias da semana em que a Igreja costuma rezar cada terço.
 * Tradicional (3 terços): sem mistérios luminosos.
 * Rosário atual (4 terços): distribuição após São João Paulo II.
 */
const RECOMMENDED_DAYS: Record<MysterySet, Partial<Record<MysteryType, string>>> = {
  classic: {
    joyful: 'Segunda e quinta',
    sorrowful: 'Terça e sexta',
    glorious: 'Quarta, sábado e domingo',
  },
  jp2: {
    joyful: 'Segunda e sábado',
    sorrowful: 'Terça e sexta',
    glorious: 'Quarta e domingo',
    luminous: 'Quinta-feira',
  },
};

export type TercoSection = {
  type: MysteryType;
  title: string;
  recommendedDays: string;
  mysteries: Mystery[];
};

export function mysteryTypesForSet(set: MysterySet): MysteryType[] {
  return set === 'classic'
    ? ['joyful', 'sorrowful', 'glorious']
    : ['joyful', 'luminous', 'sorrowful', 'glorious'];
}

export function getRecommendedDaysLabel(set: MysterySet, type: MysteryType): string {
  return RECOMMENDED_DAYS[set][type] ?? '';
}

/**
 * Terço do dia. `date.getDay()`: 0 = domingo.
 * Tradicional: seg/qui gozosos, ter/sex dolorosos, qua/sáb/dom gloriosos.
 * Com luminosos: seg/sáb gozosos, ter/sex dolorosos, qua/dom gloriosos, qui luminosos.
 */
const TERCO_BY_WEEKDAY: Record<MysterySet, readonly MysteryType[]> = {
  classic: ['glorious', 'joyful', 'sorrowful', 'glorious', 'joyful', 'sorrowful', 'glorious'],
  jp2: ['glorious', 'joyful', 'sorrowful', 'glorious', 'luminous', 'sorrowful', 'joyful'],
};

export function tercoTypeForDate(set: MysterySet, date: Date): MysteryType {
  const day = date.getDay();
  return TERCO_BY_WEEKDAY[set][day] ?? 'joyful';
}

/** Agrupa mistérios na ordem litúrgica do conjunto selecionado. */
export function groupMysteriesByTerco(mysteries: Mystery[], set: MysterySet): TercoSection[] {
  const order = mysteryTypesForSet(set);
  return order
    .map((type) => ({
      type,
      title: TERCO_TITLES[type],
      recommendedDays: getRecommendedDaysLabel(set, type),
      mysteries: mysteries
        .filter((m) => m.type === type)
        .sort((a, b) => a.sortOrder - b.sortOrder),
    }))
    .filter((section) => section.mysteries.length > 0);
}

export function filterMysteriesByType(mysteries: Mystery[], type: MysteryType): Mystery[] {
  return mysteries.filter((m) => m.type === type).sort((a, b) => a.sortOrder - b.sortOrder);
}
