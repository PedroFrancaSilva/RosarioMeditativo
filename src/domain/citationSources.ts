/**
 * Onde ler por inteiro uma passagem bíblica ou um comentário da meditação.
 *
 * O conteúdo curado traz só a referência em texto (“Lc 1, 26-27”, “CIC 484”,
 * “Suma Teológica, III, q. 30, a. 1”). Aqui essa referência vira um endereço
 * estável quando a obra tem edição oficial ou de referência na web; nas outras
 * fica uma busca pela própria referência, para a pessoa chegar ao texto.
 */

export type CitationLink = {
  url: string;
  /** Rótulo do botão, ex.: “Ler no Catecismo (vatican.va)”. */
  label: string;
  /** `source`: edição do texto; `search`: busca pela referência. */
  kind: 'source' | 'search';
};

/** Siglas usadas no conteúdo → livro na Bíblia Ave-Maria (bibliacatolica.com.br). */
const BIBLE_BOOKS: Record<string, { slug: string; name: string; gospel: boolean }> = {
  Mt: { slug: 'sao-mateus', name: 'São Mateus', gospel: true },
  Mc: { slug: 'sao-marcos', name: 'São Marcos', gospel: true },
  Lc: { slug: 'sao-lucas', name: 'São Lucas', gospel: true },
  Jo: { slug: 'sao-joao', name: 'São João', gospel: true },
  At: { slug: 'atos-dos-apostolos', name: 'Atos dos Apóstolos', gospel: false },
  '1 Co': { slug: 'i-corintios', name: '1 Coríntios', gospel: false },
  Ap: { slug: 'apocalipse', name: 'Apocalipse', gospel: false },
  Is: { slug: 'isaias', name: 'Isaías', gospel: false },
};

const BIBLE_BASE = 'https://www.bibliacatolica.com.br/biblia-ave-maria';

export type BibleReference = { book: string; bookName: string; chapter: number; gospel: boolean };

/** “Lc 1, 26-27” → livro e capítulo. `null` quando a sigla não é conhecida. */
export function parseBibleReference(reference: string): BibleReference | null {
  const match = reference.trim().match(/^((?:\d\s)?[A-Za-zÀ-ú]+)\s+(\d+)/);
  if (!match) return null;
  const book = BIBLE_BOOKS[match[1]];
  if (!book) return null;
  return { book: match[1], bookName: book.name, chapter: Number(match[2]), gospel: book.gospel };
}

/** Rótulo da passagem: “Evangelho” só para os quatro evangelhos. */
export function passageLabel(reference: string): string {
  const parsed = parseBibleReference(reference);
  if (!parsed) return 'Evangelho';
  return parsed.gospel ? 'Evangelho' : 'Sagrada Escritura';
}

export function passageLink(reference: string): CitationLink {
  const parsed = parseBibleReference(reference);
  if (!parsed) return searchLink(`Bíblia ${reference}`);
  const slug = BIBLE_BOOKS[parsed.book].slug;
  return {
    url: `${BIBLE_BASE}/${slug}/${parsed.chapter}/`,
    label: `Ler ${parsed.bookName}, capítulo ${parsed.chapter}`,
    kind: 'source',
  };
}

/**
 * Páginas do Catecismo em português no site do Vaticano, cada uma com a faixa
 * de parágrafos que contém (tirado do índice oficial).
 */
const CATECHISM_PAGES: [number, number, string][] = [
  [1, 25, 'prologo%201-25_po.html'],
  [26, 49, 'p1s1c1_26-49_po.html'],
  [50, 141, 'p1s1c2_50-141_po.html'],
  [142, 184, 'p1s1c3_142-184_po.html'],
  [185, 197, 'p1s2_185-197_po.html'],
  [198, 421, 'p1s2c1_198-421_po.html'],
  [422, 682, 'p1s2cap2_422-682_po.html'],
  [683, 1065, 'p1s2cap3_683-1065_po.html'],
  [1066, 1075, 'p2s1cap1_1066-1075_po.html'],
  [1076, 1134, 'p2s1cap1_1076-1134_po.html'],
  [1135, 1209, 'p2s1cap2_1135-1209_po.html'],
  [1210, 1419, 'p2s2cap1_1210-1419_po.html'],
  [1420, 1532, 'p2s2cap1_1420-1532_po.html'],
  [1533, 1666, 'p2s2cap3_1533-1666_po.html'],
  [1667, 1690, 'p2s2cap4_1667-1690_po.html'],
  [1691, 1698, 'p3-intr_1691-1698_po.html'],
  [1699, 1876, 'p3s1cap1_1699-1876_po.html'],
  [1877, 1948, 'p3s1cap2_1877-1948_po.html'],
  [1949, 2051, 'p3s1cap3_1949-2051_po.html'],
  [2052, 2082, 'p3s2-intr_2052-2082_po.html'],
  [2083, 2195, 'p3s2cap1_2083-2195_po.html'],
  [2196, 2557, 'p3s2cap2_2196-2557_po.html'],
  [2558, 2565, 'p4-intr_2558-2565_po.html'],
  [2566, 2649, 'p4s1cap1_2566-2649_po.html'],
  [2650, 2696, 'p4s1cap2_2650-2696_po.html'],
  [2697, 2758, 'p4s1cap3_2697-2758_po.html'],
  [2759, 2865, 'p4s2_2759-2865_po.html'],
];

const CATECHISM_BASE = 'https://www.vatican.va/archive/cathechism_po/index_new/';

export function catechismLink(paragraph: number): CitationLink | null {
  const page = CATECHISM_PAGES.find(([from, to]) => paragraph >= from && paragraph <= to);
  if (!page) return null;
  return {
    url: `${CATECHISM_BASE}${page[2]}`,
    label: `Ler o § ${paragraph} no Catecismo (vatican.va)`,
    kind: 'source',
  };
}

const SUMMA_PARTS: Record<string, number> = { I: 1, 'I-II': 2, 'II-II': 3, III: 4 };

/** “Suma Teológica, III, q. 30, a. 1” → New Advent (tradução inglesa dos Dominicanos). */
export function summaLink(source: string): CitationLink | null {
  const match = source.match(/Suma Teol[óo]gica,\s*(I-II|II-II|III|I)\s*,\s*q\.\s*(\d+)(?:\s*,\s*a\.\s*(\d+))?/i);
  if (!match) return null;
  const part = SUMMA_PARTS[match[1].toUpperCase()];
  const question = match[2].padStart(3, '0');
  const article = match[3] ? `#article${match[3]}` : '';
  return {
    url: `https://www.newadvent.org/summa/${part}${question}.htm${article}`,
    label: 'Ler na Suma Teológica (New Advent, em inglês)',
    kind: 'source',
  };
}

/** Documentos do Magistério com texto oficial em vatican.va. */
const MAGISTERIUM: { pattern: RegExp; url: string; label: string }[] = [
  {
    pattern: /Rosarium Virginis Mariae/i,
    url: 'https://www.vatican.va/content/john-paul-ii/pt/apost_letters/2002/documents/hf_jp-ii_apl_20021016_rosarium-virginis-mariae.html',
    label: 'Ler a Rosarium Virginis Mariae (vatican.va)',
  },
  {
    pattern: /Redemptoris Mater/i,
    url: 'https://www.vatican.va/content/john-paul-ii/pt/encyclicals/documents/hf_jp-ii_enc_25031987_redemptoris-mater.html',
    label: 'Ler a Redemptoris Mater (vatican.va)',
  },
  {
    pattern: /Salvifici doloris/i,
    url: 'https://www.vatican.va/content/john-paul-ii/pt/apost_letters/1984/documents/hf_jp-ii_apl_11021984_salvifici-doloris.html',
    label: 'Ler a Salvifici Doloris (vatican.va)',
  },
  {
    pattern: /Munificentissimus Deus/i,
    url: 'https://www.vatican.va/content/pius-xii/pt/apost_constitutions/documents/hf_p-xii_apc_19501101_munificentissimus-deus.html',
    label: 'Ler a Munificentissimus Deus (vatican.va)',
  },
  {
    pattern: /Ad caeli reginam/i,
    url: 'https://www.vatican.va/content/pius-xii/pt/encyclicals/documents/hf_p-xii_enc_11101954_ad-caeli-reginam.html',
    label: 'Ler a Ad Caeli Reginam (vatican.va)',
  },
  {
    pattern: /Admirabile signum/i,
    url: 'https://www.vatican.va/content/francesco/pt/apost_letters/documents/papa-francesco-lettera-ap_20191201_admirabile-signum.html',
    label: 'Ler a Admirabile Signum (vatican.va)',
  },
  {
    pattern: /Diret[óo]rio sobre Piedade Popular/i,
    url: 'https://www.vatican.va/roman_curia/congregations/ccdds/documents/rc_con_ccdds_doc_20020513_vers-direttorio_en.html',
    label: 'Ler o Diretório (vatican.va, em inglês)',
  },
];

function stripMarkup(text: string): string {
  return text.replace(/\*/g, '').trim();
}

/**
 * Fonte curta para a linha do comentário: sem itálico de Markdown e sem as
 * notas de tradução entre parênteses, que ficam na ficha completa.
 */
export function shortCitationSource(source: string | null | undefined): string {
  if (!source) return '';
  const clean = stripMarkup(source);
  const cut = clean.indexOf(' (');
  return (cut > 0 ? clean.slice(0, cut) : clean).replace(/[.;,\s]+$/, '');
}

function searchLink(query: string): CitationLink {
  return {
    url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
    label: 'Procurar o texto completo',
    kind: 'search',
  };
}

export function commentaryLink(author: string, source: string | null | undefined): CitationLink {
  const full = stripMarkup(`${author} ${source ?? ''}`);
  const cic = full.match(/\bCIC\s+(\d{1,4})/);
  if (cic) {
    const link = catechismLink(Number(cic[1]));
    if (link) return link;
  }
  const summa = source ? summaLink(stripMarkup(source)) : null;
  if (summa) return summa;
  const doc = MAGISTERIUM.find((entry) => entry.pattern.test(full));
  if (doc) return { url: doc.url, label: doc.label, kind: 'source' };
  return searchLink(`${author} ${shortCitationSource(source)}`.trim());
}
