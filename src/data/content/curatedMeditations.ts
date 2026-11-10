import annunciation from './annunciationMeditation.json';
import glorious1 from './glorious-1Meditation.json';
import glorious2 from './glorious-2Meditation.json';
import glorious3 from './glorious-3Meditation.json';
import glorious4 from './glorious-4Meditation.json';
import glorious5 from './glorious-5Meditation.json';
import joyful2 from './joyful-2Meditation.json';
import joyful3 from './joyful-3Meditation.json';
import joyful4 from './joyful-4Meditation.json';
import joyful5 from './joyful-5Meditation.json';
import luminous1 from './luminous-1Meditation.json';
import luminous2 from './luminous-2Meditation.json';
import luminous3 from './luminous-3Meditation.json';
import luminous4 from './luminous-4Meditation.json';
import luminous5 from './luminous-5Meditation.json';
import sorrowful1 from './sorrowful-1Meditation.json';
import sorrowful2 from './sorrowful-2Meditation.json';
import sorrowful3 from './sorrowful-3Meditation.json';
import sorrowful4 from './sorrowful-4Meditation.json';
import sorrowful5 from './sorrowful-5Meditation.json';

export type CuratedMeditation = {
  reference: string;
  text: string;
  commentaries: { sortOrder: number; author: string; source: string; text: string }[];
};

/** Slugs with a curated offline package (not generic Matos Soares only). */
export const CURATED_MEDITATIONS: Record<string, CuratedMeditation> = {
  'joyful-1': annunciation,
  'joyful-2': joyful2,
  'joyful-3': joyful3,
  'joyful-4': joyful4,
  'joyful-5': joyful5,
  'luminous-1': luminous1,
  'luminous-2': luminous2,
  'luminous-3': luminous3,
  'luminous-4': luminous4,
  'luminous-5': luminous5,
  'sorrowful-1': sorrowful1,
  'sorrowful-2': sorrowful2,
  'sorrowful-3': sorrowful3,
  'sorrowful-4': sorrowful4,
  'sorrowful-5': sorrowful5,
  'glorious-1': glorious1,
  'glorious-2': glorious2,
  'glorious-3': glorious3,
  'glorious-4': glorious4,
  'glorious-5': glorious5,
};
