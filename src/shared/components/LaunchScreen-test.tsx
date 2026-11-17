import { render } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

jest.mock('react-native-reanimated', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: { View },
    Easing: {
      bezier: () => (value: number) => value,
      out: (easing: unknown) => easing,
      inOut: (easing: unknown) => easing,
      ease: (value: number) => value,
    },
    useSharedValue: (initial: number) => ({ value: initial }),
    useAnimatedStyle: (updater: () => object) => updater(),
    withTiming: (toValue: number) => toValue,
    withDelay: (_delay: number, animation: unknown) => animation,
    withRepeat: (animation: unknown) => animation,
    withSequence: (...animations: unknown[]) => animations[0],
  };
});

import { LaunchScreen } from '@/shared/components/LaunchScreen';

describe('<LaunchScreen />', () => {
  it('mostra o terço, o nome e a espera da oração', async () => {
    const screen = await render(
      <SafeAreaProvider
        initialMetrics={{
          frame: { x: 0, y: 0, width: 390, height: 844 },
          insets: { top: 47, left: 0, right: 0, bottom: 34 },
        }}>
        <LaunchScreen onReady={() => undefined} onFinish={() => undefined} />
      </SafeAreaProvider>,
    );

    expect(screen.getByText('Rosário meditativo')).toBeTruthy();
    expect(screen.getByText('Ora et\nContempla')).toBeTruthy();
    expect(screen.getByText('Preparando seu momento de oração')).toBeTruthy();
    expect(screen.getByLabelText('Carregando')).toBeTruthy();
    expect(
      screen.getByLabelText('Ora et Contempla. Preparando seu momento de oração.'),
    ).toBeTruthy();
  });
});
