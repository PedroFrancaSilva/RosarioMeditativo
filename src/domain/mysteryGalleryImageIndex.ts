/** Índice da imagem na galeria embutida do mistério (rotação na década). */
export function mysteryGalleryImageIndex(options: {
  hailMaryIndex: number | null;
  prayerId?: string;
  imageCount: number;
  rotateEveryNHailMarys: number;
}): number {
  const { hailMaryIndex, prayerId, imageCount, rotateEveryNHailMarys } = options;
  if (imageCount <= 1) return 0;

  const every = Math.max(1, rotateEveryNHailMarys);

  if (hailMaryIndex != null && hailMaryIndex >= 1) {
    return Math.min(imageCount - 1, Math.floor((hailMaryIndex - 1) / every));
  }

  if (prayerId === 'glory-be' || prayerId === 'fatima-prayer') {
    return imageCount - 1;
  }

  return 0;
}
