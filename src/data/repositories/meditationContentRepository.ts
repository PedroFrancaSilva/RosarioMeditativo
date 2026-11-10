/**
 * Ordem de imagens: `sort_order` ascendente (0 = primeira obra).
 * Rotação de fundo: a cada `rotateEveryNHailMarys` Ave-Marias (default {@link DEFAULT_ROTATE_EVERY_N_HAIL_MARYS});
 * nullable na linha remota ou na galeria embutida — ver {@link fetchMysteryMeditationBundle}.
 */
import type {
  Commentary,
  DeeperReference,
  MysteryImage,
  MysteryMeditationBundle,
  Passage,
} from '@/domain/mystery';
import { preferRemoteList } from '@/domain/meditationContentPrecedence';
import type { MysteryContentTarget } from '@/domain/resolveMysteryContentTarget';
import { commentariesForPassages } from '@/domain/commentariesForPassages';
import {
  CURATED_MEDITATIONS,
  type CuratedMeditation,
} from '@/data/content/curatedMeditations';
import {
  getEmbeddedMysteryGallery,
  type EmbeddedMysteryGallery,
} from '@/shared/constants/prayerAssets';
import passagesSeed from '../../../supabase/seed/passages-matos-soares.json';

/** Default quando `images.rotate_every_n_hail_marys` é null no remoto e na galeria embutida. */
export const DEFAULT_ROTATE_EVERY_N_HAIL_MARYS = 2;

type PassageSeedRow = {
  mystery_slug: string;
  reference: string;
  sort_order: number;
  text: string;
};

const EMBEDDED_PASSAGES_BY_SLUG: Record<string, Passage[]> = buildEmbeddedPassages();

function buildEmbeddedPassages(): Record<string, Passage[]> {
  const rows = (passagesSeed as { passages: PassageSeedRow[] }).passages;
  const map: Record<string, Passage[]> = {};
  for (const row of rows) {
    if (row.mystery_slug in CURATED_MEDITATIONS) continue;
    const list = map[row.mystery_slug] ?? [];
    list.push({
      id: `embedded-passage-${row.mystery_slug}-${row.sort_order}`,
      mysteryId: row.mystery_slug,
      text: row.text,
      reference: row.reference,
      sortOrder: row.sort_order,
    });
    map[row.mystery_slug] = list;
  }
  for (const slug of Object.keys(map)) {
    map[slug]!.sort((a, b) => a.sortOrder - b.sortOrder);
  }
  return map;
}

const EMBEDDED_DEEPER_JOYFUL_1: DeeperReference[] = [
  {
    id: 'embedded-deeper-joyful-1-0',
    mysteryId: 'joyful-1',
    title: 'Catechism of the Catholic Church — Anunciação',
    description: 'Números 484–486 sobre a encarnação e o papel de Maria.',
    urlOrReference: 'https://www.vatican.va/archive/ENG0015/__P1A.HTM',
    sortOrder: 0,
  },
];

function embeddedImagesFromGallery(
  contentSlug: string,
  gallery: EmbeddedMysteryGallery | undefined,
): MysteryImage[] {
  if (!gallery) return [];
  return gallery.images.map((entry, index) => ({
    id: `embedded-image-${contentSlug}-${index}`,
    mysteryId: contentSlug,
    url: '',
    title: entry.credit.title,
    artist: entry.credit.artist,
    description: entry.credit.description ?? null,
    sortOrder: index,
    resizeMode: entry.resizeMode === 'cover' ? 'cover' : 'contain',
    rotateEveryNHailMarys: gallery.rotateEveryNHailMarys,
    focalX: entry.motion?.focalX ?? null,
    focalY: entry.motion?.focalY ?? null,
    driftX: entry.motion?.driftX ?? null,
    driftY: entry.motion?.driftY ?? null,
  }));
}

function resolveRotateEvery(remoteImages: MysteryImage[], gallery?: EmbeddedMysteryGallery): number {
  const fromRemote = remoteImages.find((i) => i.rotateEveryNHailMarys != null)?.rotateEveryNHailMarys;
  if (fromRemote != null) return fromRemote;
  if (gallery?.rotateEveryNHailMarys != null) return gallery.rotateEveryNHailMarys;
  return DEFAULT_ROTATE_EVERY_N_HAIL_MARYS;
}

type ImageRow = {
  id: string;
  mystery_id: string;
  url: string;
  title: string | null;
  artist: string | null;
  description: string | null;
  sort_order: number;
  resize_mode: string | null;
  rotate_every_n_hail_marys: number | null;
  focal_x: number | null;
  focal_y: number | null;
  drift_x: number | null;
  drift_y: number | null;
};

function mapImageRow(row: ImageRow): MysteryImage {
  return {
    id: row.id,
    mysteryId: row.mystery_id,
    url: row.url,
    title: row.title,
    artist: row.artist,
    description: row.description,
    sortOrder: row.sort_order,
    resizeMode: row.resize_mode === 'cover' ? 'cover' : 'contain',
    rotateEveryNHailMarys: row.rotate_every_n_hail_marys,
    focalX: row.focal_x,
    focalY: row.focal_y,
    driftX: row.drift_x,
    driftY: row.drift_y,
  };
}

export async function fetchRemoteMysteryImages(mysteryId: string): Promise<MysteryImage[]> {
  const { supabase } = await import('@/data/api/supabaseClient');
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('images')
    .select(
      'id, mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys, focal_x, focal_y, drift_x, drift_y',
    )
    .eq('mystery_id', mysteryId)
    .order('sort_order');

  if (error || !data?.length) return [];
  return data.map((row) => mapImageRow(row as ImageRow));
}

export async function fetchRemotePassages(mysteryId: string): Promise<Passage[]> {
  const { supabase } = await import('@/data/api/supabaseClient');
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('passages')
    .select('id, mystery_id, text, reference, sort_order')
    .eq('mystery_id', mysteryId)
    .order('sort_order');

  if (error || !data?.length) return [];
  return data.map((row) => ({
    id: row.id,
    mysteryId: row.mystery_id,
    text: row.text,
    reference: row.reference,
    sortOrder: row.sort_order,
  }));
}

export function toCommentary(row: {
  id: string;
  mystery_id: string;
  passage_id: string | null;
  text: string;
  author: string;
  source: string | null;
  sort_order: number;
}): Commentary | null {
  if (!row.passage_id) return null;
  return {
    id: row.id,
    mysteryId: row.mystery_id,
    passageId: row.passage_id,
    text: row.text,
    author: row.author,
    source: row.source,
    sortOrder: row.sort_order,
  };
}

export async function fetchRemoteCommentaries(mysteryId: string): Promise<Commentary[]> {
  const { supabase } = await import('@/data/api/supabaseClient');
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('commentaries')
    .select('id, mystery_id, passage_id, text, author, source, sort_order')
    .eq('mystery_id', mysteryId)
    .order('sort_order');

  if (error || !data?.length) return [];
  return data.flatMap((row) => {
    const commentary = toCommentary(row);
    return commentary ? [commentary] : [];
  });
}

export async function fetchRemoteDeeperReferences(mysteryId: string): Promise<DeeperReference[]> {
  const { supabase } = await import('@/data/api/supabaseClient');
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('deeper_references')
    .select('id, mystery_id, title, description, url_or_reference, sort_order')
    .eq('mystery_id', mysteryId)
    .order('sort_order');

  if (error || !data?.length) return [];
  return data.map((row) => ({
    id: row.id,
    mysteryId: row.mystery_id,
    title: row.title,
    description: row.description,
    urlOrReference: row.url_or_reference,
    sortOrder: row.sort_order,
  }));
}

function curatedPassage(contentSlug: string, curated: CuratedMeditation): Passage {
  return {
    id: `embedded-passage-${contentSlug}-0`,
    mysteryId: contentSlug,
    text: curated.text,
    reference: curated.reference,
    sortOrder: 0,
  };
}

function embeddedPassages(contentSlug: string): Passage[] {
  const curated = CURATED_MEDITATIONS[contentSlug];
  if (curated) return [curatedPassage(contentSlug, curated)];
  return EMBEDDED_PASSAGES_BY_SLUG[contentSlug] ?? [];
}

function embeddedCommentaries(contentSlug: string): Commentary[] {
  const curated = CURATED_MEDITATIONS[contentSlug];
  if (!curated) return [];
  const passageId = `embedded-passage-${contentSlug}-0`;
  return curated.commentaries.map((row) => ({
    id: `embedded-commentary-${contentSlug}-${row.sortOrder}`,
    mysteryId: contentSlug,
    passageId,
    text: row.text,
    author: row.author,
    source: row.source,
    sortOrder: row.sortOrder,
  }));
}

function embeddedDeeper(contentSlug: string): DeeperReference[] {
  if (contentSlug === 'joyful-1') return EMBEDDED_DEEPER_JOYFUL_1;
  return [];
}

export async function fetchMysteryMeditationBundle(
  target: MysteryContentTarget,
): Promise<MysteryMeditationBundle> {
  const gallery = getEmbeddedMysteryGallery(target.contentSlug);
  const embeddedImages = embeddedImagesFromGallery(target.contentSlug, gallery);

  const [remoteImages, remotePassages, remoteCommentaries, remoteDeeper] = await Promise.all([
    fetchRemoteMysteryImages(target.supabaseMysteryId),
    fetchRemotePassages(target.supabaseMysteryId),
    fetchRemoteCommentaries(target.supabaseMysteryId),
    fetchRemoteDeeperReferences(target.supabaseMysteryId),
  ]);

  const images = preferRemoteList(remoteImages, embeddedImages);
  const passages = preferRemoteList(remotePassages, embeddedPassages(target.contentSlug));
  const remoteLinked = commentariesForPassages(passages, remoteCommentaries);
  const commentaries =
    remoteLinked.length > 0
      ? remoteLinked
      : commentariesForPassages(passages, embeddedCommentaries(target.contentSlug));
  const deeperReferences = preferRemoteList(remoteDeeper, embeddedDeeper(target.contentSlug));

  return {
    images,
    passages,
    commentaries,
    deeperReferences,
    rotateEveryNHailMarys: resolveRotateEvery(remoteImages, gallery),
  };
}

export function getEmbeddedMeditationBundle(contentSlug: string): MysteryMeditationBundle {
  const gallery = getEmbeddedMysteryGallery(contentSlug);
  const images = embeddedImagesFromGallery(contentSlug, gallery);
  return {
    images,
    passages: embeddedPassages(contentSlug),
    commentaries: commentariesForPassages(
      embeddedPassages(contentSlug),
      embeddedCommentaries(contentSlug),
    ),
    deeperReferences: embeddedDeeper(contentSlug),
    rotateEveryNHailMarys: gallery?.rotateEveryNHailMarys ?? DEFAULT_ROTATE_EVERY_N_HAIL_MARYS,
  };
}
