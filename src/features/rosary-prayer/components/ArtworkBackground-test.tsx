import { act, fireEvent, render } from '@testing-library/react-native';

jest.mock('react-native-reanimated', () => {
  const { View: NativeView, Image } = require('react-native');
  return {
    __esModule: true,
    default: { View: NativeView, Image },
    useSharedValue: (initial: unknown) => ({ value: initial }),
    useAnimatedStyle: (updater: () => object) => updater(),
    withTiming: (toValue: number) => toValue,
    withRepeat: (animation: unknown) => animation,
    cancelAnimation: () => undefined,
    interpolate: (value: number, input: number[], output: number[]) => {
      const i = Math.max(1, input.findIndex((x) => x >= value));
      const k = (value - input[i - 1]) / (input[i] - input[i - 1] || 1);
      return output[i - 1] + (output[i] - output[i - 1]) * k;
    },
    Easing: {
      linear: (value: number) => value,
      sin: (value: number) => value,
      inOut: (easing: (value: number) => number) => easing,
    },
  };
});

import { ArtworkBackground } from '@/features/rosary-prayer/components/ArtworkBackground';

const motion = { focalX: 0.5, focalY: 0.5, driftX: 0.02, driftY: 0.01 };

describe('<ArtworkBackground />', () => {
  it('mostra carregamento até a imagem carregar e some se ela falha', async () => {
    const screen = await render(
      <ArtworkBackground source={{ uri: 'https://example.com/a.jpg' }} motion={motion} backgroundKey="a" />,
    );
    expect(screen.getByLabelText('A carregar')).toBeTruthy();

    const image = screen.getByTestId('artwork-image');
    await act(async () => {
      fireEvent(image, 'load', {
        nativeEvent: { source: { width: 800, height: 600 } },
      });
    });
    expect(screen.queryByLabelText('A carregar')).toBeNull();

    await screen.rerender(
      <ArtworkBackground source={{ uri: 'https://example.com/b.jpg' }} motion={motion} backgroundKey="b" />,
    );
    expect(screen.getByLabelText('A carregar')).toBeTruthy();
    await act(async () => {
      fireEvent(screen.getByTestId('artwork-image'), 'error');
    });
    expect(screen.queryByLabelText('A carregar')).toBeNull();
  });
});
