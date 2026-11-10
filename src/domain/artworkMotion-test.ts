import {
  ARTWORK_DURATION_MS,
  ARTWORK_SCALE_END,
  ARTWORK_SCALE_START,
  artworkPath,
  DEFAULT_ARTWORK_MOTION,
  resolveArtworkMotion,
  type ArtworkFrame,
} from '@/domain/artworkMotion';
import { getEmbeddedMysteryImageEntry } from '@/shared/constants/prayerAssets';

const SCREEN = { screenWidth: 390, screenHeight: 844, imageWidth: 1600, imageHeight: 900 };

function expectCovered(
  frame: ArtworkFrame,
  screenWidth: number,
  screenHeight: number,
  imageWidth: number,
  imageHeight: number,
) {
  const cover = Math.max(screenWidth / imageWidth, screenHeight / imageHeight);
  const width = imageWidth * cover * frame.scale;
  const height = imageHeight * cover * frame.scale;
  expect(frame.translateX).toBeLessThanOrEqual(0.001);
  expect(frame.translateY).toBeLessThanOrEqual(0.001);
  expect(frame.translateX + width).toBeGreaterThanOrEqual(screenWidth - 0.001);
  expect(frame.translateY + height).toBeGreaterThanOrEqual(screenHeight - 0.001);
}

describe('artworkPath', () => {
  it('usa o fôlego padrão, de escala 1 a cerca de 1,045, sem faixa vazia', () => {
    const path = artworkPath(SCREEN);
    expect(path).not.toBeNull();
    expect(path?.durationMs).toBe(ARTWORK_DURATION_MS);
    expect(path?.start.scale).toBe(ARTWORK_SCALE_START);
    expect(path?.end.scale).toBeCloseTo(ARTWORK_SCALE_END);
    expect(resolveArtworkMotion(undefined)).toEqual(DEFAULT_ARTWORK_MOTION);
    expectCovered(path!.start, SCREEN.screenWidth, SCREEN.screenHeight, SCREEN.imageWidth, SCREEN.imageHeight);
    expectCovered(path!.end, SCREEN.screenWidth, SCREEN.screenHeight, SCREEN.imageWidth, SCREEN.imageHeight);
  });

  it('um foco customizado desloca a translação e mantém a mesma escala', () => {
    const plain = artworkPath(SCREEN);
    const custom = artworkPath({
      ...SCREEN,
      motion: { focalX: 0.2, focalY: 0.38, driftX: 0.035, driftY: -0.025 },
    });
    expect(custom?.start.translateX).not.toBe(plain?.start.translateX);
    expect(custom?.start.scale).toBe(ARTWORK_SCALE_START);
    expect(custom?.end.scale).toBeCloseTo(ARTWORK_SCALE_END);
  });

  it('devolve null quando a imagem não tem tamanho', () => {
    expect(artworkPath({ ...SCREEN, imageWidth: 0 })).toBeNull();
    expect(artworkPath({ ...SCREEN, imageHeight: -1 })).toBeNull();
  });

  it('um percentual de crop lateral não altera a escala', () => {
    const plain = artworkPath(SCREEN);
    const cropped = artworkPath({ ...SCREEN, legacyCropPercent: 70 });
    expect(cropped).toEqual(plain);
    expect(cropped?.start.scale).toBe(1);
    expect(cropped?.end.scale).toBeCloseTo(1.045);
  });

  it('a Anunciação, sem foco próprio, resolve para o fôlego padrão', () => {
    const entry = getEmbeddedMysteryImageEntry('joyful-1', 0);
    expect(entry?.bakedLateralCropPercent).toBe(70);
    expect(entry?.motion).toBeUndefined();
    expect(resolveArtworkMotion(entry?.motion)).toEqual(DEFAULT_ARTWORK_MOTION);
    expect(resolveArtworkMotion({ focalX: null, focalY: null, driftX: null, driftY: null })).toEqual(
      DEFAULT_ARTWORK_MOTION,
    );
    expect(
      artworkPath({
        ...SCREEN,
        motion: entry?.motion,
        legacyCropPercent: entry?.bakedLateralCropPercent,
      }),
    ).toEqual(artworkPath(SCREEN));
  });
});
