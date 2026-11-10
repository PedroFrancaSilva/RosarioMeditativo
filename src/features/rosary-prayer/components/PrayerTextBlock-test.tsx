import { render, userEvent } from '@testing-library/react-native';

jest.mock('react-native-reanimated', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: { View },
    useSharedValue: (initial: number) => ({ value: initial }),
    useAnimatedStyle: (updater: () => object) => updater(),
    withTiming: (toValue: number) => toValue,
  };
});

import { PrayerTextBlock } from '@/features/rosary-prayer/components/PrayerTextBlock';

describe('<PrayerTextBlock />', () => {
  it('expande o texto ao toque', async () => {
    const user = userEvent.setup();
    const { getAllByText, queryByText } = await render(
      <PrayerTextBlock
        kicker="Oração"
        title="Ave-Maria"
        summary="Resumo curto"
        fullText="Texto completo da oração"
      />,
    );

    expect(getAllByText('Resumo curto').length).toBeGreaterThan(0);
    expect(queryByText('Texto completo da oração')).toBeNull();

    const copies = getAllByText('Resumo curto');
    await user.press(copies[copies.length - 1]!);

    expect(getAllByText('Texto completo da oração').length).toBeGreaterThan(0);
  });
});
