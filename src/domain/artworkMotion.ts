/** Fôlego compartilhado da obra na oração. A escala não varia por imagem. */
export const ARTWORK_SCALE_START = 1;
export const ARTWORK_SCALE_END = 1.045;
export const ARTWORK_DURATION_MS = 18_000;

/**
 * Obra que transborda a tela num eixo é percorrida de borda a borda nesse eixo
 * (vai e volta), para que se veja inteira. A velocidade fica perto deste valor;
 * a duração de cada ida fica entre o fôlego padrão e o máximo abaixo, que é
 * mais ou menos o tempo de duas Ave-Marias (o intervalo de rotação das obras).
 */
export const ARTWORK_SWEEP_SPEED_PX_PER_S = 36;
export const ARTWORK_SWEEP_MAX_DURATION_MS = 30_000;
/** Sobra mínima, em fração da tela, para valer a pena percorrer a obra. */
export const ARTWORK_SWEEP_MIN_OVERFLOW = 0.08;

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
  /** Quadro parado no foco curado, para quem pede menos movimento. */
  rest: ArtworkFrame;
  /** Eixo percorrido de borda a borda, ou `null` quando a obra só “respira”. */
  sweep: 'x' | 'y' | null;
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

type Overflow = { x: number; y: number };

/** Quanto da obra fica fora da tela, em px, já na escala final (a maior). */
function overflowAt(
  screenWidth: number,
  screenHeight: number,
  imageWidth: number,
  imageHeight: number,
  scale: number,
): Overflow {
  const cover = Math.max(screenWidth / imageWidth, screenHeight / imageHeight);
  return {
    x: Math.max(0, imageWidth * cover * scale - screenWidth),
    y: Math.max(0, imageHeight * cover * scale - screenHeight),
  };
}

/** Eixo a percorrer: o que mais transborda, se a sobra passar do mínimo. */
export function artworkSweepAxis(
  screenWidth: number,
  screenHeight: number,
  overflow: Overflow,
): 'x' | 'y' | null {
  const relX = overflow.x / screenWidth;
  const relY = overflow.y / screenHeight;
  if (Math.max(relX, relY) < ARTWORK_SWEEP_MIN_OVERFLOW) return null;
  return relX >= relY ? 'x' : 'y';
}

export function artworkSweepDuration(distancePx: number): number {
  const byspeed = (distancePx / ARTWORK_SWEEP_SPEED_PX_PER_S) * 1000;
  return Math.round(clamp(byspeed, ARTWORK_DURATION_MS, ARTWORK_SWEEP_MAX_DURATION_MS));
}

/**
 * Translação do canto superior esquerdo da imagem já em cover, com escala
 * aplicada a partir desse canto. As bordas ficam grampeadas na tela.
 *
 * Obra mais larga (ou alta) que a tela: o caminho vai de uma borda à outra no
 * eixo que transborda, começando pelo lado para onde a deriva aponta ao
 * contrário (deriva positiva = da esquerda para a direita). O outro eixo segue o
 * foco. Obra que cabe quase inteira: o fôlego curto em torno do foco.
 * Devolve `null` quando falta um tamanho utilizável.
 */
export function artworkPath(input: ArtworkPathInput): ArtworkPath | null {
  void input.legacyCropPercent;
  const { screenWidth, screenHeight, imageWidth, imageHeight } = input;
  if (screenWidth <= 0 || screenHeight <= 0 || imageWidth <= 0 || imageHeight <= 0) {
    return null;
  }
  const motion = resolveArtworkMotion(input.motion);
  const frame = (scale: number, fx: number, fy: number) =>
    frameAt(screenWidth, screenHeight, imageWidth, imageHeight, scale, fx, fy);
  const rest = frame(ARTWORK_SCALE_START, motion.focalX, motion.focalY);

  const overflow = overflowAt(screenWidth, screenHeight, imageWidth, imageHeight, ARTWORK_SCALE_END);
  const sweep = artworkSweepAxis(screenWidth, screenHeight, overflow);

  if (sweep === 'x') {
    // Foco 0 grampeia na borda esquerda, 1 na direita.
    const [from, to] = motion.driftX >= 0 ? [0, 1] : [1, 0];
    return {
      durationMs: artworkSweepDuration(overflow.x),
      start: frame(ARTWORK_SCALE_START, from, motion.focalY),
      end: frame(ARTWORK_SCALE_END, to, clamp(motion.focalY + motion.driftY, 0, 1)),
      rest,
      sweep,
    };
  }
  if (sweep === 'y') {
    const [from, to] = motion.driftY >= 0 ? [0, 1] : [1, 0];
    return {
      durationMs: artworkSweepDuration(overflow.y),
      start: frame(ARTWORK_SCALE_START, motion.focalX, from),
      end: frame(ARTWORK_SCALE_END, clamp(motion.focalX + motion.driftX, 0, 1), to),
      rest,
      sweep,
    };
  }

  return {
    durationMs: ARTWORK_DURATION_MS,
    start: rest,
    end: frame(
      ARTWORK_SCALE_END,
      clamp(motion.focalX + motion.driftX, 0, 1),
      clamp(motion.focalY + motion.driftY, 0, 1),
    ),
    rest,
    sweep: null,
  };
}
