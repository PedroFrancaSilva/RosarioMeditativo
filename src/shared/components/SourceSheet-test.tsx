import { render, userEvent } from '@testing-library/react-native';
import * as WebBrowser from 'expo-web-browser';

import { SourceSheet } from '@/shared/components/SourceSheet';
import { artworkSheet } from '@/features/rosary-prayer/components/artworkSheet';
import { DEFAULT_MYSTERY_IMAGE_CREDIT } from '@/shared/constants/prayerAssets';

jest.mock('expo-web-browser', () => ({ openBrowserAsync: jest.fn(() => Promise.resolve()) }));
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

describe('<SourceSheet />', () => {
  it('mostra a obra e abre o acervo', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    const content = artworkSheet(DEFAULT_MYSTERY_IMAGE_CREDIT);
    const { getByText, getByLabelText } = await render(<SourceSheet content={content} onClose={onClose} />);
    expect(getByText('Imaculada Conceição')).toBeTruthy();
    expect(getByText('Cristóbal de Villalpando')).toBeTruthy();
    expect(getByText(/Catedral de Puebla/)).toBeTruthy();
    await user.press(getByLabelText('Ver a obra no acervo'));
    expect(WebBrowser.openBrowserAsync).toHaveBeenCalledWith(DEFAULT_MYSTERY_IMAGE_CREDIT.sourceUrl);
    await user.press(getByLabelText('Fechar'));
    expect(onClose).toHaveBeenCalled();
  });

  it('obra sem link não mostra o botão', async () => {
    const { queryByLabelText } = await render(
      <SourceSheet content={artworkSheet({ title: 'T', artist: 'A' })} onClose={() => undefined} />,
    );
    expect(queryByLabelText('Ver a obra no acervo')).toBeNull();
  });
});
