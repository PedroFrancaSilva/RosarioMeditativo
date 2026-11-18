import type { SourceSheetContent } from '@/shared/components/SourceSheet';
import type { MysteryImageCredit } from '@/shared/constants/prayerAssets';

/** Ficha da obra de fundo: título, artista, acervo e link da fonte da imagem. */
export function artworkSheet(credit: MysteryImageCredit): SourceSheetContent {
  return {
    kicker: 'Obra',
    title: credit.title,
    subtitle: credit.artist,
    notes: credit.description,
    link: credit.sourceUrl
      ? { url: credit.sourceUrl, label: 'Ver a obra no acervo', kind: 'source' }
      : undefined,
  };
}
