/** Atmosfera da seleção e da oração. Estas telas não seguem o tema claro do sistema. */
export const contemplative = {
  background: '#0d0b0a',
  cream: '#f2eadb',
  gold: '#d4af55',
  muted: '#938a80',
  beadLabel: '#746b61',
  panel: 'rgba(21,17,14,0.78)',
  panelBorder: 'rgba(212,175,85,0.15)',
  goldFaint: 'rgba(212,175,85,0.46)',
  goldFill: 'rgba(212,175,85,0.48)',
  segmentTrack: 'rgba(255,255,255,0.025)',
} as const;

/** Nomes registrados em `useFonts` em `src/app/_layout.tsx`. */
export const contemplativeFonts = {
  serif: 'CormorantGaramond_500Medium',
  serifRegular: 'CormorantGaramond_400Regular',
  serifItalic: 'CormorantGaramond_400Regular_Italic',
  sans: 'Inter_500Medium',
  sansSemi: 'Inter_600SemiBold',
} as const;

/** Durações contemplativas, todas entre 220 e 280 ms. */
export const contemplativeMotion = {
  panel: 260,
  bead: 260,
  content: 240,
  advanceLock: 260,
  screen: 280,
} as const;
