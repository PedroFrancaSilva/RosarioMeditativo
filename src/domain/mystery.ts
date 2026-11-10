export type MysteryType = 'joyful' | 'sorrowful' | 'glorious' | 'luminous';

export type Mystery = {
  id: string;
  name: string;
  type: MysteryType;
  sortOrder: number;
  description: string | null;
  /** Pacote de meditação curado. Não se infere só por existir alguma passagem. */
  meditationReady: boolean;
};

export type Passage = {
  id: string;
  mysteryId: string;
  text: string;
  reference: string;
  sortOrder: number;
};

export type Commentary = {
  id: string;
  mysteryId: string;
  passageId: string;
  text: string;
  author: string;
  source: string | null;
  sortOrder: number;
};

export type MysteryImage = {
  id: string;
  mysteryId: string;
  url: string;
  title: string | null;
  artist: string | null;
  description: string | null;
  sortOrder: number;
  resizeMode?: 'cover' | 'contain';
  rotateEveryNHailMarys?: number | null;
  /** Nulo usa o fôlego padrão. Não há zoom por imagem. */
  focalX?: number | null;
  focalY?: number | null;
  driftX?: number | null;
  driftY?: number | null;
};

export type MysteryMeditationBundle = {
  passages: Passage[];
  commentaries: Commentary[];
  images: MysteryImage[];
  deeperReferences: DeeperReference[];
  /** Intervalo de Ave-Marias para trocar imagem (default 2). */
  rotateEveryNHailMarys: number;
};

export type DeeperReference = {
  id: string;
  mysteryId: string;
  title: string;
  description: string | null;
  urlOrReference: string | null;
  sortOrder: number;
};
