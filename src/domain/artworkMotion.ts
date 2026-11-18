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
/**
 * Teto de uma ida. Com a desaceleração no centro a ida dura mais que a conta
 * simples distância ÷ velocidade; o teto só segura obras muito largas.
 */
export const ARTWORK_SWEEP_MAX_DURATION_MS = 90_000;
/**
 * Perfil de velocidade da varredura: nas bordas a obra corre na velocidade
 * acima; perto do foco (o centro da cena, por padrão) cai para esta fração,
 * para que o essencial do quadro fique mais tempo na tela.
 */
export const ARTWORK_SWEEP_FOCUS_SPEED_RATIO = 0.3;
/** Largura (desvio, em fração do percurso) da zona lenta em torno do foco. */
export const ARTWORK_SWEEP_FOCUS_WIDTH = 0.14;
/** Trecho junto de cada borda em que a obra desacelera para virar sem tranco. */
export const ARTWORK_SWEEP_TURN_ZONE = 0.05;
/** Velocidade mínima (fração da de borda) no instante da virada. */
export const ARTWORK_SWEEP_TURN_SPEED_RATIO = 0.3;
/** Amostras da curva tempo → posição. */
export const ARTWORK_TIMELINE_SAMPLES = 64;
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
  /**
   * Curva da ida: `progress[i]` é a fração do tempo e `position[i]` a fração do
   * caminho de `start` a `end` nesse instante. Crescentes, de 0 a 1. A volta
   * percorre a mesma curva ao contrário.
   */
  timeline: ArtworkTimeline;
};

export type ArtworkTimeline = {
  progress: number[];
  position: number[];
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

function smoothstep(x: number): number {
  const t = clamp(x, 0, 1);
  return t * t * (3 - 2 * t);
}

/**
 * Velocidade relativa (0–1] na posição `s` do caminho: 1 nas bordas, a fração
 * de foco perto de `focus`, e uma desaceleração curta junto às bordas.
 */
export function artworkSweepSpeed(s: number, focus: number): number {
  const d = (s - focus) / ARTWORK_SWEEP_FOCUS_WIDTH;
  const dip = 1 - (1 - ARTWORK_SWEEP_FOCUS_SPEED_RATIO) * Math.exp(-0.5 * d * d);
  const edge = Math.min(s, 1 - s) / ARTWORK_SWEEP_TURN_ZONE;
  const turn = ARTWORK_SWEEP_TURN_SPEED_RATIO + (1 - ARTWORK_SWEEP_TURN_SPEED_RATIO) * smoothstep(edge);
  return dip * turn;
}

/**
 * Curva tempo → posição para uma ida de `distancePx`, lenta em torno de
 * `focus` (fração do caminho). A duração sai da soma do tempo gasto em cada
 * trecho, limitada entre o fôlego padrão e o teto da varredura.
 */
export function artworkSweepTimeline(
  distancePx: number,
  focus: number,
): { timeline: ArtworkTimeline; durationMs: number } {
  const n = ARTWORK_TIMELINE_SAMPLES;
  const f = clamp(focus, 0, 1);
  const position: number[] = [0];
  const elapsed: number[] = [0];
  let total = 0;
  for (let i = 1; i <= n; i += 1) {
    const s0 = (i - 1) / n;
    const s1 = i / n;
    // Ponto médio do trecho: evita dividir pela velocidade exata da borda.
    const v = artworkSweepSpeed((s0 + s1) / 2, f);
    total += (s1 - s0) / v;
    position.push(s1);
    elapsed.push(total);
  }
  const progress = elapsed.map((value) => value / total);
  const seconds = (distancePx * total) / ARTWORK_SWEEP_SPEED_PX_PER_S;
  const durationMs = Math.round(
    clamp(seconds * 1000, ARTWORK_DURATION_MS, ARTWORK_SWEEP_MAX_DURATION_MS),
  );
  return { timeline: { progress, position }, durationMs };
}

/** Fôlego da obra que cabe na tela: ida e volta em seno, sem foco lento. */
export function artworkBreathTimeline(): ArtworkTimeline {
  const n = ARTWORK_TIMELINE_SAMPLES;
  const progress: number[] = [];
  const position: number[] = [];
  for (let i = 0; i <= n; i += 1) {
    const t = i / n;
    progress.push(t);
    position.push(-(Math.cos(Math.PI * t) - 1) / 2);
  }
  return { progress, position };
}

/** Posição (0–1) da curva no instante `t` (0–1), por interpolação linear. */
export function artworkTimelineAt(timeline: ArtworkTimeline, t: number): number {
  const { progress, position } = timeline;
  const x = clamp(t, 0, 1);
  let i = 1;
  while (i < progress.length - 1 && progress[i] < x) i += 1;
  const t0 = progress[i - 1];
  const t1 = progress[i];
  const span = t1 - t0;
  const k = span > 0 ? (x - t0) / span : 0;
  return position[i - 1] + (position[i] - position[i - 1]) * k;
}

/**
 * Fração do caminho de `start` a `end` em que o centro da tela mostra o foco
 * curado da obra, no eixo da varredura.
 */
function focusAlongPath(
  start: ArtworkFrame,
  end: ArtworkFrame,
  axis: 'x' | 'y',
  focal: number,
  screenSize: number,
  imageSize: number,
  cover: number,
): number {
  let best = 0.5;
  let bestError = Infinity;
  const steps = 200;
  for (let i = 0; i <= steps; i += 1) {
    const s = i / steps;
    const translate = axis === 'x'
      ? start.translateX + (end.translateX - start.translateX) * s
      : start.translateY + (end.translateY - start.translateY) * s;
    const scale = start.scale + (end.scale - start.scale) * s;
    const center = (screenSize / 2 - translate) / (imageSize * cover * scale);
    const error = Math.abs(center - focal);
    if (error < bestError) {
      bestError = error;
      best = s;
    }
  }
  return best;
}

/**
 * Translação do canto superior esquerdo da imagem já em cover, com escala
 * aplicada a partir desse canto. As bordas ficam grampeadas na tela.
 *
 * Obra mais larga (ou alta) que a tela: o caminho vai de uma borda à outra no
 * eixo que transborda, começando pelo lado para onde a deriva aponta ao
 * contrário (deriva positiva = da esquerda para a direita). O outro eixo segue o
 * foco. A velocidade não é constante: rápida nas bordas, lenta quando o foco
 * curado passa pelo centro da tela (ver {@link artworkSweepSpeed}). Obra que cabe quase inteira: o fôlego curto em torno do foco.
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

  const cover = Math.max(screenWidth / imageWidth, screenHeight / imageHeight);

  if (sweep === 'x') {
    // Foco 0 grampeia na borda esquerda, 1 na direita.
    const [from, to] = motion.driftX >= 0 ? [0, 1] : [1, 0];
    const start = frame(ARTWORK_SCALE_START, from, motion.focalY);
    const end = frame(ARTWORK_SCALE_END, to, clamp(motion.focalY + motion.driftY, 0, 1));
    const focus = focusAlongPath(start, end, 'x', motion.focalX, screenWidth, imageWidth, cover);
    const { timeline, durationMs } = artworkSweepTimeline(overflow.x, focus);
    return { durationMs, start, end, rest, sweep, timeline };
  }
  if (sweep === 'y') {
    const [from, to] = motion.driftY >= 0 ? [0, 1] : [1, 0];
    const start = frame(ARTWORK_SCALE_START, motion.focalX, from);
    const end = frame(ARTWORK_SCALE_END, clamp(motion.focalX + motion.driftX, 0, 1), to);
    const focus = focusAlongPath(start, end, 'y', motion.focalY, screenHeight, imageHeight, cover);
    const { timeline, durationMs } = artworkSweepTimeline(overflow.y, focus);
    return { durationMs, start, end, rest, sweep, timeline };
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
    timeline: artworkBreathTimeline(),
  };
}
