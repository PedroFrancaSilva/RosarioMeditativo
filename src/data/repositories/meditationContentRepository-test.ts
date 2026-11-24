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
  it('embedded joyful-1 tem a anunciação, a saudação do anjo e o «faça-se», cada uma com os seus comentários', () => {
    const bundle = getEmbeddedMeditationBundle('joyful-1');
    expect(bundle.images).toHaveLength(5);
    expect(bundle.passages.map((passage) => passage.reference)).toEqual([
      'Lc 1, 26-27',
      'Lc 1, 28-31',
      'Lc 1, 34-38',
    ]);
    expect(bundle.passages[2]?.text).toContain('Eis aqui a serva do Senhor');
    const [first, second, third] = bundle.passages;
    const of = (passageId?: string) => bundle.commentaries.filter((item) => item.passageId === passageId);
    expect(of(first?.id).map((item) => item.author)).toContain('São Tomás de Aquino');
    expect(of(second?.id).map((item) => item.author)).toContain('São Pio X');
    expect(of(third?.id).map((item) => item.source)).toContain('CIC 494 (texto abreviado)');
    expect(of(first?.id).length + of(second?.id).length + of(third?.id).length).toBe(bundle.commentaries.length);
    expect(bundle.rotateEveryNHailMarys).toBe(2);
  });

  it('os vinte mistérios têm várias passagens curadas, todas com comentário próprio', () => {
    const slugs = ['joyful', 'luminous', 'sorrowful', 'glorious'].flatMap((type) =>
      [1, 2, 3, 4, 5].map((n) => `${type}-${n}`),
    );
    const sources = new Map<string, string>();
    for (const slug of slugs) {
      const bundle = getEmbeddedMeditationBundle(slug);
      expect(bundle.passages.length).toBeGreaterThanOrEqual(2);
      const ids = new Set(bundle.passages.map((passage) => passage.id));
      expect(bundle.commentaries.every((item) => ids.has(item.passageId))).toBe(true);
      for (const passage of bundle.passages) {
        expect(bundle.commentaries.some((item) => item.passageId === passage.id)).toBe(true);
        expect(passage.text.split('«').length).toBe(passage.text.split('»').length);
      }
      for (const item of bundle.commentaries) {
        expect(item.source).not.toMatch(/não é citação verbal/);
        // Um comentário do Catecismo não se repete noutro mistério.
        if (item.author === 'Catecismo da Igreja Católica') {
          const key = item.source ?? '';
          expect(sources.get(key) ?? slug).toBe(slug);
          sources.set(key, slug);
        }
      }
      expect(bundle.images.length).toBeGreaterThanOrEqual(4);
      expect(bundle.rotateEveryNHailMarys).toBe(2);
    }
    const coroacao = getEmbeddedMeditationBundle('glorious-5');
    expect(coroacao.passages[0]?.text).not.toContain('figura da Mãe do Messias');
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
