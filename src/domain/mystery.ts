export type MysteryType = 'joyful' | 'sorrowful' | 'glorious' | 'luminous';

export type Mystery = {
  id: string;
  name: string;
  type: MysteryType;
  sortOrder: number;
  description: string | null;
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
};

export type DeeperReference = {
  id: string;
  mysteryId: string;
  title: string;
  description: string | null;
  urlOrReference: string | null;
  sortOrder: number;
};
