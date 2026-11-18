import { Switch, type SwitchProps } from 'react-native';

import { contemplative } from '@/shared/constants/contemplative';

/**
 * Interruptor no dourado do app. Na web o react-native-web ignora
 * `thumbColor` quando ligado e usa `activeThumbColor`, que o tipo nativo não declara.
 */
export function ContemplativeSwitch(props: SwitchProps) {
  const webProps = { activeThumbColor: contemplative.cream } as object;
  return (
    <Switch
      trackColor={{ false: '#3a342c', true: contemplative.gold }}
      thumbColor={contemplative.cream}
      {...webProps}
      {...props}
    />
  );
}
