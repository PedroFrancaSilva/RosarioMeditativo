import {
  DEFAULT_ROTATE_EVERY_N_HAIL_MARYS,
  getEmbeddedMeditationBundle,
  toCommentary,
} from '@/data/repositories/meditationContentRepository';
import { commentariesForPassages } from '@/domain/commentariesForPassages';
import { preferRemoteList } from '@/domain/meditationContentPrecedence';
import { mysteryGalleryImageIndex } from '@/domain/mysteryGalleryImageIndex';
import type { Commentary, Passage } from '@/domain/mystery';

jest.mock('@/data/api/supabaseClient', () => ({
  supabase: null,
}));

describe('meditationContentRepository', () => {
  it('embedded joyful-1 é a passagem Lc 1, 26-27 com nove comentários', () => {
    const bundle = getEmbeddedMeditationBundle('joyful-1');
    expect(bundle.images).toHaveLength(5);
    expect(bundle.passages).toHaveLength(1);
    expect(bundle.passages[0]?.reference).toBe('Lc 1, 26-27');
    expect(bundle.passages.some((passage) => passage.reference === 'Is 7, 14')).toBe(false);
    expect(bundle.passages.some((passage) => passage.reference === 'Lc 1, 26-38')).toBe(false);
    expect(bundle.commentaries).toHaveLength(9);
    expect(bundle.commentaries[0]?.author).toBe('São Tomás de Aquino');
    expect(bundle.commentaries[1]?.source).toBe('Suma Teológica, III, q. 30, a. 2');
    expect(bundle.commentaries.every((item) => item.passageId === bundle.passages[0]?.id)).toBe(true);
    expect(bundle.rotateEveryNHailMarys).toBe(2);
  });

  it('os outros dezanove mistérios usam o pacote curado, não o Matos Soares genérico', () => {
    const slugs = [
      'joyful-2',
      'joyful-3',
      'joyful-4',
      'joyful-5',
      'luminous-1',
      'luminous-2',
      'luminous-3',
      'luminous-4',
      'luminous-5',
      'sorrowful-1',
      'sorrowful-2',
      'sorrowful-3',
      'sorrowful-4',
      'sorrowful-5',
      'glorious-1',
      'glorious-2',
      'glorious-3',
      'glorious-4',
      'glorious-5',
    ];
    for (const slug of slugs) {
      const bundle = getEmbeddedMeditationBundle(slug);
      expect(bundle.passages).toHaveLength(1);
      expect(bundle.commentaries.length).toBeGreaterThanOrEqual(6);
      expect(bundle.commentaries.length).toBeLessThanOrEqual(9);
      expect(bundle.commentaries.every((item) => item.passageId === bundle.passages[0]?.id)).toBe(true);
      expect(bundle.images.length).toBeGreaterThanOrEqual(4);
      expect(bundle.rotateEveryNHailMarys).toBe(2);
    }
    const visitacao = getEmbeddedMeditationBundle('joyful-2');
    expect(visitacao.passages[0]?.reference).toBe('Lc 1, 39-45');
    expect(visitacao.passages.some((passage) => passage.reference === 'Lc 1, 46-55')).toBe(false);
  });

  it('comentário sem passagem não entra na meditação', () => {
    expect(
      toCommentary({
        id: 'orphan',
        mystery_id: 'joyful-1',
        passage_id: null,
        text: 'solto',
        author: 'Alguém',
        source: 'lugar',
        sort_order: 0,
      }),
    ).toBeNull();

    const passage: Passage = {
      id: 'p1',
      mysteryId: 'm',
      text: 'texto',
      reference: 'Lc 1, 26-27',
      sortOrder: 0,
    };
    const linked: Commentary = {
      id: 'c1',
      mysteryId: 'm',
      passageId: 'p1',
      text: 'ligado',
      author: 'A',
      source: 'fonte',
      sortOrder: 0,
    };
    const foreign: Commentary = { ...linked, id: 'c2', passageId: 'outra' };
    expect(commentariesForPassages([passage], [linked, foreign])).toEqual([linked]);
  });

  it('gallery index uses bundle image count and rotate interval', () => {
    const bundle = getEmbeddedMeditationBundle('joyful-1');
    const count = bundle.images.length;
    const every = bundle.rotateEveryNHailMarys ?? DEFAULT_ROTATE_EVERY_N_HAIL_MARYS;
    expect(
      mysteryGalleryImageIndex({ hailMaryIndex: 3, imageCount: count, rotateEveryNHailMarys: every }),
    ).toBe(1);
  });

  it('remote images win over embedded when non-empty', () => {
    const remote = [{ id: 'remote-1', url: 'https://example.com/a.jpg' }];
    const embedded = [{ id: 'embedded-1', url: '' }];
    expect(preferRemoteList(remote, embedded)).toBe(remote);
  });
});
