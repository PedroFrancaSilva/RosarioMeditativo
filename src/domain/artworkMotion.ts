/** Fôlego compartilhado da obra na oração. A escala não varia por imagem. */
export const ARTWORK_SCALE_START = 1;
export const ARTWORK_SCALE_END = 1.045;
export const ARTWORK_DURATION_MS = 18_000;

export type ArtworkMotion = {
  focalX: number;
  focalY: number;
  driftX: number;
  driftY: number;
};

/** Foco um pouco acima do centro, no viés do protótipo (`center 26%`). */
export const DEFAULT_ARTWORK_MOTION: ArtworkMotion = {
  focalX: 0.5,
  focalY: 0.38,
  driftX: 0.035,
  driftY: -0.025,
};

export type ArtworkFrame = {
  scale: number;
  translateX: number;
  translateY: number;
};

export type ArtworkPath = {
  start: ArtworkFrame;
  end: ArtworkFrame;
  durationMs: number;
};

export type ArtworkMotionInput = Partial<{
  [Key in keyof ArtworkMotion]: number | null;
}> | null;

export type ArtworkPathInput = {
  screenWidth: number;
  screenHeight: number;
  imageWidth: number;
  imageHeight: number;
  motion?: ArtworkMotionInput;
  /**
   * Percentual antigo de crop lateral. Aceito só para deixar explícito que
   * não altera a escala: o valor é descartado.
   */
  legacyCropPercent?: number | null;
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function pick(value: number | null | undefined, fallback: number, min: number, max: number): number {
  if (value == null || Number.isNaN(value)) return fallback;
  return clamp(value, min, max);
}

/** Preenche foco e deriva ausentes com o padrão. Não há campo de zoom. */
export function resolveArtworkMotion(input?: ArtworkMotionInput): ArtworkMotion {
  return {
    focalX: pick(input?.focalX, DEFAULT_ARTWORK_MOTION.focalX, 0, 1),
    focalY: pick(input?.focalY, DEFAULT_ARTWORK_MOTION.focalY, 0, 1),
    driftX: pick(input?.driftX, DEFAULT_ARTWORK_MOTION.driftX, -1, 1),
    driftY: pick(input?.driftY, DEFAULT_ARTWORK_MOTION.driftY, -1, 1),
  };
}

function frameAt(
  screenWidth: number,
  screenHeight: number,
  imageWidth: number,
  imageHeight: number,
  scale: number,
  focalX: number,
  focalY: number,
): ArtworkFrame {
  const cover = Math.max(screenWidth / imageWidth, screenHeight / imageHeight);
  const renderedWidth = imageWidth * cover * scale;
  const renderedHeight = imageHeight * cover * scale;
  const minX = Math.min(0, screenWidth - renderedWidth);
  const maxX = Math.max(0, screenWidth - renderedWidth);
  const minY = Math.min(0, screenHeight - renderedHeight);
  const maxY = Math.max(0, screenHeight - renderedHeight);
  return {
    scale,
    translateX: clamp(screenWidth / 2 - focalX * renderedWidth, minX, maxX),
    translateY: clamp(screenHeight / 2 - focalY * renderedHeight, minY, maxY),
  };
}

/**
 * Translação do canto superior esquerdo da imagem já em cover, com escala
 * aplicada a partir desse canto. As bordas ficam grampeadas na tela.
 * Devolve `null` quando falta um tamanho utilizável.
 */
export function artworkPath(input: ArtworkPathInput): ArtworkPath | null {
  void input.legacyCropPercent;
  const { screenWidth, screenHeight, imageWidth, imageHeight } = input;
  if (screenWidth <= 0 || screenHeight <= 0 || imageWidth <= 0 || imageHeight <= 0) {
    return null;
  }
  const motion = resolveArtworkMotion(input.motion);
  return {
    durationMs: ARTWORK_DURATION_MS,
    start: frameAt(
      screenWidth,
      screenHeight,
      imageWidth,
      imageHeight,
      ARTWORK_SCALE_START,
      motion.focalX,
      motion.focalY,
    ),
    end: frameAt(
      screenWidth,
      screenHeight,
      imageWidth,
      imageHeight,
      ARTWORK_SCALE_END,
      clamp(motion.focalX + motion.driftX, 0, 1),
      clamp(motion.focalY + motion.driftY, 0, 1),
    ),
  };
}
