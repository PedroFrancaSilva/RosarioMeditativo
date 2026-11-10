import { render } from '@testing-library/react-native';

import { CHANT_CREDITS } from '@/domain/chant/chantCredits';
import { ChantToggle } from '@/features/chant/ChantToggle';
import { ChantContext, type ChantContextValue } from '@/features/chant/chantContext';

async function renderToggle(credit: ChantContextValue['credit']) {
  const value: ChantContextValue = {
    enabled: true,
    unavailable: false,
    ready: true,
    credit,
    setEnabled: () => undefined,
    setInPrayer: () => undefined,
  };
  return render(
    <ChantContext.Provider value={value}>
      <ChantToggle />
    </ChantContext.Provider>,
  );
}

describe('<ChantToggle />', () => {
  it('nomeia Rick Dechance quando a Alma está em execução', async () => {
    const { getByText } = await renderToggle(CHANT_CREDITS.alma);
    expect(getByText(/Alma Redemptoris Mater/)).toBeTruthy();
    expect(getByText(/Rick Dechance/)).toBeTruthy();
    expect(getByText(/CC BY-SA 3\.0/)).toBeTruthy();
  });

  it('nomeia Les Petits Chanteurs de Passy quando o recurso é a Salve Regina', async () => {
    const { getByText } = await renderToggle(CHANT_CREDITS.salve);
    expect(getByText(/Salve Regina/)).toBeTruthy();
    expect(getByText(/Les Petits Chanteurs de Passy/)).toBeTruthy();
    expect(getByText(/CC BY-SA 3\.0/)).toBeTruthy();
  });
});
