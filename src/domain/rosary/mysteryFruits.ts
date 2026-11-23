import type { Mystery, MysteryType } from '@/domain/mystery';

export const MYSTERY_TYPE_ADJECTIVES: Record<MysteryType, string> = {
  joyful: 'gozoso',
  sorrowful: 'doloroso',
  glorious: 'glorioso',
  luminous: 'luminoso',
};

const ORDINALS = ['Primeiro', 'Segundo', 'Terceiro', 'Quarto', 'Quinto'] as const;

const FRUITS: Record<MysteryType, readonly string[]> = {
  joyful: [
    'a humildade',
    'a caridade fraterna',
    'a pobreza e o desapego',
    'a obediência e a pureza',
    'a busca de Deus',
  ],
  luminous: [
    'a abertura ao Espírito Santo',
    'a confiança em Maria',
    'a conversão',
    'o desejo de santidade',
    'a adoração eucarística',
  ],
  sorrowful: [
    'a contrição dos pecados',
    'a mortificação',
    'a humildade',
    'a paciência',
    'a perseverança',
  ],
  glorious: [
    'a fé',
    'a esperança',
    'o amor a Deus e o zelo',
    'a graça de uma boa morte',
    'a devoção a Maria',
  ],
};

export function mysteryFruit(type: MysteryType, sortOrder: number): string | null {
  return FRUITS[type][sortOrder - 1] ?? null;
}

/** “Quarto mistério glorioso. Fruto: a graça de uma boa morte.” */
export function mysteryAnnouncement(
  mystery: Pick<Mystery, 'type' | 'sortOrder'>,
): string | null {
  const fruit = mysteryFruit(mystery.type, mystery.sortOrder);
  const ordinal = ORDINALS[mystery.sortOrder - 1];
  if (!fruit || !ordinal) return null;
  return `${ordinal} mistério ${MYSTERY_TYPE_ADJECTIVES[mystery.type]}. Fruto: ${fruit}.`;
}
