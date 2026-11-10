import type { ArtworkMotion } from '@/domain/artworkMotion';
import type { ImageResizeMode, ImageSourcePropType } from 'react-native';

import { GENERATED_MYSTERY_GALLERIES } from './generatedMysteryGalleries';

/** Fallback full-bleed para todos os mistérios no MVP. */
export const DEFAULT_MYSTERY_BACKGROUND: ImageSourcePropType = require('../../../assets/images/La_Purísima_Concepción_-_Cristóbal_de_Villalpando.jpg');

export type MysteryImageCredit = {
  title: string;
  artist: string;
  description?: string;
  sourceUrl?: string;
};

export const DEFAULT_MYSTERY_IMAGE_CREDIT: MysteryImageCredit = {
  title: 'Imaculada Conceição',
  artist: 'Cristóbal de Villalpando',
};

export type EmbeddedMysteryImageEntry = {
  source: ImageSourcePropType;
  credit: MysteryImageCredit;
  resizeMode?: ImageResizeMode;
  /** Original sem crop — preview no modo dev. */
  devTuneSource?: ImageSourcePropType;
  /** Largura mantida no crop central (`100` = sem crop lateral). Não altera a escala da oração. */
  bakedLateralCropPercent?: number;
  /** Foco e deriva opcionais. Sem este campo, a obra usa o fôlego padrão. */
  motion?: Partial<ArtworkMotion>;
};

export type EmbeddedMysteryGallery = {
  rotateEveryNHailMarys: number;
  images: EmbeddedMysteryImageEntry[];
};

const ANNUNCIATION_CHAMPAIGNE_SOURCE_FULL: ImageSourcePropType = require('../../../assets/images/The_Annunciation_-_Philippe_de_Champaigne.jpg');

export const EMBEDDED_MYSTERY_GALLERIES: Record<string, EmbeddedMysteryGallery> = {
  'joyful-1': {
    rotateEveryNHailMarys: 2,
    images: [
      {
        source: require('../../../assets/images/The_Annunciation_-_Philippe_de_Champaigne_crop_sides.jpg'),
        devTuneSource: ANNUNCIATION_CHAMPAIGNE_SOURCE_FULL,
        bakedLateralCropPercent: 70,
        credit: {
          title: 'A Anunciação',
          artist: 'Philippe de Champaigne',
          description: 'Óleo sobre carvalho, ca. 1644. The Metropolitan Museum of Art, Nova York.',
          sourceUrl: 'https://www.metmuseum.org/art/collection/search/438724',
        },
        resizeMode: 'contain',
      },
      {
        source: require('../../../assets/images/The_Annunciation_-_Luca_Giordano_crop_sides.jpg'),
        bakedLateralCropPercent: 88,
        credit: {
          title: 'A Anunciação',
          artist: 'Luca Giordano',
          description: 'The Metropolitan Museum of Art, Nova York (domínio público).',
          sourceUrl: 'https://www.metmuseum.org/art/collection/search/436502',
        },
        resizeMode: 'contain',
      },
      {
        source: require('../../../assets/images/The_Annunciation_-_Peter_Candid_crop_sides.jpg'),
        bakedLateralCropPercent: 90,
        credit: {
          title: 'A Anunciação',
          artist: 'Peter Candid (Pietro Candido)',
          description: 'The Metropolitan Museum of Art, Nova York (domínio público).',
          sourceUrl: 'https://www.metmuseum.org/art/collection/search/441233',
        },
        resizeMode: 'contain',
      },
      {
        source: require('../../../assets/images/The_Annunciation_-_Hans_Memling_crop_sides.jpg'),
        bakedLateralCropPercent: 100,
        credit: {
          title: 'A Anunciação',
          artist: 'Hans Memling',
          description: 'The Metropolitan Museum of Art, Nova York (domínio público).',
          sourceUrl: 'https://www.metmuseum.org/art/collection/search/437490',
        },
        resizeMode: 'contain',
      },
      {
        source: require('../../../assets/images/The_Annunciation_-_Jean_Audran_crop_sides.jpg'),
        bakedLateralCropPercent: 100,
        credit: {
          title: 'A Anunciação',
          artist: 'Jean Audran',
          description: 'The Metropolitan Museum of Art, Nova York (domínio público).',
          sourceUrl: 'https://www.metmuseum.org/art/collection/search/691087',
        },
        resizeMode: 'contain',
      },
    ],
  },
  ...GENERATED_MYSTERY_GALLERIES,
};

export function getEmbeddedMysteryGallery(contentKey: string): EmbeddedMysteryGallery | undefined {
  return EMBEDDED_MYSTERY_GALLERIES[contentKey];
}

export function getEmbeddedMysteryImageEntry(
  contentKey: string,
  slotIndex: number,
): EmbeddedMysteryImageEntry | undefined {
  const gallery = EMBEDDED_MYSTERY_GALLERIES[contentKey];
  if (!gallery?.images.length) return undefined;
  const idx = Math.min(Math.max(0, slotIndex), gallery.images.length - 1);
  return gallery.images[idx];
}

/** Primeira imagem da galeria (legado). Preferir {@link getEmbeddedMysteryGallery}. */
export const EMBEDDED_MYSTERY_IMAGES: Record<string, EmbeddedMysteryImageEntry> = Object.fromEntries(
  Object.entries(EMBEDDED_MYSTERY_GALLERIES).map(([id, gallery]) => [id, gallery.images[0]!]),
);
