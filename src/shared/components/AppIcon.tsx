import { SymbolView, type SFSymbol } from 'expo-symbols';
import light from 'expo-symbols/androidWeights/light';
import type { StyleProp, ViewStyle } from 'react-native';

import { contemplative } from '@/shared/constants/contemplative';

/**
 * Ícones do app: Material Symbols no Android e na web, SF Symbols no iOS.
 * O nome é o do Material; o iOS usa o equivalente abaixo.
 */
const IOS_NAMES = {
  settings: 'gearshape',
  info: 'info.circle',
  open_in_new: 'arrow.up.right.square',
  close: 'xmark',
  music_note: 'music.note',
  chevron_right: 'chevron.right',
  chevron_left: 'chevron.left',
  menu_book: 'book',
  search: 'magnifyingglass',
  palette: 'paintpalette',
} as const satisfies Record<string, SFSymbol>;

export type AppIconName = keyof typeof IOS_NAMES;

type Props = {
  name: AppIconName;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function AppIcon({ name, size = 22, color = contemplative.cream, style }: Props) {
  return (
    <SymbolView
      name={{ ios: IOS_NAMES[name], android: name, web: name }}
      size={size}
      tintColor={color}
      weight={{ ios: 'light', android: light }}
      style={style}
      accessible={false}
      importantForAccessibility="no"
    />
  );
}
