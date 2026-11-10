import { mysteryGalleryImageIndex } from '@/domain/mysteryGalleryImageIndex';

describe('mysteryGalleryImageIndex', () => {
  const count = 5;
  const every = 2;

  it('rotates every two hail marys', () => {
    expect(
      mysteryGalleryImageIndex({ hailMaryIndex: 1, imageCount: count, rotateEveryNHailMarys: every }),
    ).toBe(0);
    expect(
      mysteryGalleryImageIndex({ hailMaryIndex: 2, imageCount: count, rotateEveryNHailMarys: every }),
    ).toBe(0);
    expect(
      mysteryGalleryImageIndex({ hailMaryIndex: 3, imageCount: count, rotateEveryNHailMarys: every }),
    ).toBe(1);
    expect(
      mysteryGalleryImageIndex({ hailMaryIndex: 10, imageCount: count, rotateEveryNHailMarys: every }),
    ).toBe(4);
  });

  it('uses first image for announcement and our father', () => {
    expect(
      mysteryGalleryImageIndex({ hailMaryIndex: 0, imageCount: count, rotateEveryNHailMarys: every }),
    ).toBe(0);
    expect(
      mysteryGalleryImageIndex({ hailMaryIndex: null, imageCount: count, rotateEveryNHailMarys: every }),
    ).toBe(0);
  });

  it('uses last image after the decade', () => {
    expect(
      mysteryGalleryImageIndex({
        hailMaryIndex: null,
        prayerId: 'glory-be',
        imageCount: count,
        rotateEveryNHailMarys: every,
      }),
    ).toBe(4);
  });
});
