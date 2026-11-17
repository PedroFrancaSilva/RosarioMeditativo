import {
  ARTWORK_DURATION_MS,
  ARTWORK_SWEEP_MAX_DURATION_MS,
  artworkSweepAxis,
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
  it('obra larga é percorrida de borda a borda, sem faixa vazia', () => {
    const path = artworkPath(SCREEN);
    expect(path).not.toBeNull();
    expect(path?.sweep).toBe('x');
    expect(path?.durationMs).toBeGreaterThan(ARTWORK_DURATION_MS);
    expect(path?.durationMs).toBeLessThanOrEqual(ARTWORK_SWEEP_MAX_DURATION_MS);
    // Começa na borda esquerda e termina com a borda direita encostada na tela.
    expect(path?.start.translateX).toBeCloseTo(0);
    const cover = SCREEN.screenHeight / SCREEN.imageHeight;
    const endWidth = SCREEN.imageWidth * cover * path!.end.scale;
    expect(path!.end.translateX + endWidth).toBeCloseTo(SCREEN.screenWidth);
    expect(path?.start.scale).toBe(ARTWORK_SCALE_START);
    expect(path?.end.scale).toBeCloseTo(ARTWORK_SCALE_END);
    expect(resolveArtworkMotion(undefined)).toEqual(DEFAULT_ARTWORK_MOTION);
    expectCovered(path!.start, SCREEN.screenWidth, SCREEN.screenHeight, SCREEN.imageWidth, SCREEN.imageHeight);
    expectCovered(path!.end, SCREEN.screenWidth, SCREEN.screenHeight, SCREEN.imageWidth, SCREEN.imageHeight);
  });

  it('um foco customizado desloca o quadro de repouso e mantém a mesma escala', () => {
    const plain = artworkPath(SCREEN);
    const custom = artworkPath({
      ...SCREEN,
      motion: { focalX: 0.2, focalY: 0.38, driftX: 0.035, driftY: -0.025 },
    });
    expect(custom?.rest.translateX).not.toBe(plain?.rest.translateX);
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

  it('deriva negativa percorre da direita para a esquerda', () => {
    const path = artworkPath({ ...SCREEN, motion: { driftX: -0.03 } });
    expect(path?.start.translateX).toBeLessThan(path!.end.translateX);
  });

  it('obra que quase cabe na tela só respira em torno do foco', () => {
    const fit = { screenWidth: 390, screenHeight: 844, imageWidth: 400, imageHeight: 844 };
    const path = artworkPath(fit);
    expect(path?.sweep).toBeNull();
    expect(path?.durationMs).toBe(ARTWORK_DURATION_MS);
    expect(path?.start).toEqual(path?.rest);
  });

  it('a duração cresce com a sobra, mas não passa do máximo', () => {
    const narrow = artworkPath({ ...SCREEN, imageWidth: 1000 });
    const wide = artworkPath({ ...SCREEN, imageWidth: 4000 });
    expect(narrow!.durationMs).toBeLessThan(wide!.durationMs);
    expect(wide!.durationMs).toBe(ARTWORK_SWEEP_MAX_DURATION_MS);
  });

  it('escolhe o eixo que mais transborda', () => {
    expect(artworkSweepAxis(390, 844, { x: 300, y: 0 })).toBe('x');
    expect(artworkSweepAxis(390, 844, { x: 0, y: 400 })).toBe('y');
    expect(artworkSweepAxis(390, 844, { x: 10, y: 10 })).toBeNull();
  });
});
