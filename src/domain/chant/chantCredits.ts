export type BundledChantId = 'salve' | 'alma' | 'regina-caeli';

export type ChantCredit = {
  id: BundledChantId;
  title: string;
  performer: string;
  licenseName: string;
  licenseUrl: string;
  sourceUrl: string;
};

const CC_BY_SA_3 = 'https://creativecommons.org/licenses/by-sa/3.0/';

/**
 * Ave Regina caelorum ficou de fora: no Commons há MIDI e polifonia
 * (Dufay, Leonel Power), sem canto gregoriano cantado sob licença de distribuição.
 */
export const CHANT_CREDITS = {
  salve: {
    id: 'salve',
    title: 'Salve Regina',
    performer: 'Les Petits Chanteurs de Passy',
    licenseName: 'CC BY-SA 3.0',
    licenseUrl: CC_BY_SA_3,
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Petits_Chanteurs_de_Passy_-_Salve_Regina_de_Hermann_Contract.ogg',
  },
  alma: {
    id: 'alma',
    title: 'Alma Redemptoris Mater',
    performer: 'Rick Dechance',
    licenseName: 'CC BY-SA 3.0',
    licenseUrl: CC_BY_SA_3,
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Alma_Redemptoris_Mater.ogg',
  },
  'regina-caeli': {
    id: 'regina-caeli',
    title: 'Regina caeli',
    performer: 'Ferdinando Traversa',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Regina_Caeli.wav',
  },
} as const satisfies Record<BundledChantId, ChantCredit>;

export const BUNDLED_CHANT_IDS = ['salve', 'alma', 'regina-caeli'] as const satisfies readonly BundledChantId[];
