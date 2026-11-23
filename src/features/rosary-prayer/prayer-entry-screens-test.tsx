import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { router } from 'expo-router';

import HomePrayerScreen from '@/app/(tabs)/index';
import MeditationCoverageScreen from '@/app/meditation-coverage';
import { TERCO_TITLES, tercoTypeForDate } from '@/domain/mysteryTerco';
import { clearIncompleteSession } from '@/features/rosary-prayer/session/incompleteSessionStorage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
}));

jest.mock('@/features/rosary-prayer/hooks/useMysteries', () => {
  const { getEmbeddedCatalog } = require('@/data/repositories/mysteryRepository');
  return {
    useMysteries: (set: string) => ({
      data: getEmbeddedCatalog(set),
      isLoading: false,
      isError: false,
    }),
  };
});

jest.mock('@/features/rosary-prayer/session/completionCounter', () => ({
  useCompletedCount: () => ({ data: 0 }),
}));

jest.mock('@/features/chant/ChantToggle', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    ChantToggle: () => React.createElement(Text, null, 'Canto gregoriano'),
  };
});

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn() },
  useLocalSearchParams: () => ({ set: 'classic' }),
}));

jest.mock('react-native-safe-area-context', () => {
  const actual = jest.requireActual('react-native-safe-area-context');
  return {
    ...actual,
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  };
});

const THIRD_TITLES = [
  'Mistérios Gozosos',
  'Mistérios Dolorosos',
  'Mistérios Luminosos',
  'Mistérios Gloriosos',
];

describe('entrada para escolher um terço', () => {
  beforeEach(async () => {
    (router.push as jest.Mock).mockClear();
    await clearIncompleteSession();
  });

  it('a home mostra o link e uma única seção de mistérios', async () => {
    const { getByText, queryByText } = await render(<HomePrayerScreen />);

    expect(getByText('Escolher um terço')).toBeTruthy();
    expect(queryByText('Conteúdo dos mistérios')).toBeNull();

    const present = THIRD_TITLES.filter((title) => queryByText(title));
    expect(present).toEqual([TERCO_TITLES[tercoTypeForDate('jp2', new Date())]]);
  });

  it('o Rosário completo mostra os mistérios do conjunto, sem estimar tempo', async () => {
    const { getByText, queryByText } = await render(<HomePrayerScreen />);
    expect(getByText('20 mistérios')).toBeTruthy();
    expect(queryByText(/minutos/)).toBeNull();
  });

  it('escolher um terço inicia esse terço e não o checklist', async () => {
    const { getByText, queryByText, getByRole } = await render(<MeditationCoverageScreen />);

    expect(getByText('Escolher um terço')).toBeTruthy();
    expect(queryByText('Conteúdo dos mistérios')).toBeNull();

    fireEvent.press(getByRole('button', { name: 'Rezar Mistérios Dolorosos' }));

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith({
        pathname: '/prayer',
        params: {
          mode: 'tercio',
          set: 'classic',
          mysteryType: 'sorrowful',
        },
      });
    });
  });
});
