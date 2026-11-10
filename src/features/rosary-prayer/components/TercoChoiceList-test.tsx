import { fireEvent, render } from '@testing-library/react-native';

import { getEmbeddedCatalog } from '@/data/repositories/mysteryRepository';
import { groupMysteriesByTerco } from '@/domain/mysteryTerco';
import { TercoChoiceList } from '@/features/rosary-prayer/components/TercoChoiceList';

describe('<TercoChoiceList />', () => {
  it('no conjunto tradicional lista três terços, sem luminosos nem status de curadoria', async () => {
    const sections = groupMysteriesByTerco(getEmbeddedCatalog('classic'), 'classic');
    const onStartTerco = jest.fn();
    const { getByText, getAllByText, queryByText, getByRole } = await render(
      <TercoChoiceList
        sections={sections}
        offline={false}
        dayType="glorious"
        onStartTerco={onStartTerco}
      />,
    );

    expect(getAllByText('Rezar este terço')).toHaveLength(3);
    expect(getByText('Segunda e quinta')).toBeTruthy();
    expect(getByText('A Anunciação')).toBeTruthy();
    expect(getByText('Do dia')).toBeTruthy();
    expect(queryByText('Mistérios Luminosos')).toBeNull();
    expect(queryByText('Curado')).toBeNull();
    expect(queryByText('Pendente')).toBeNull();

    fireEvent.press(getByText('A Anunciação'));
    expect(onStartTerco).not.toHaveBeenCalled();

    fireEvent.press(getByRole('button', { name: 'Rezar Mistérios Dolorosos' }));
    expect(onStartTerco).toHaveBeenCalledTimes(1);
    expect(onStartTerco).toHaveBeenCalledWith('sorrowful');
  });

  it('com luminosos lista os quatro terços', async () => {
    const sections = groupMysteriesByTerco(getEmbeddedCatalog('jp2'), 'jp2');
    const { getByText, getAllByText } = await render(
      <TercoChoiceList
        sections={sections}
        offline={false}
        dayType="luminous"
        onStartTerco={() => undefined}
      />,
    );

    expect(getAllByText('Rezar este terço')).toHaveLength(4);
    expect(getByText('Mistérios Luminosos')).toBeTruthy();
    expect(getByText('O Batismo de Jesus')).toBeTruthy();
  });

  it('quando o remoto falha mostra o catálogo e um aviso, sem tela em branco', async () => {
    const sections = groupMysteriesByTerco(getEmbeddedCatalog('classic'), 'classic');
    const { getByText, getAllByText } = await render(
      <TercoChoiceList
        sections={sections}
        offline
        dayType="joyful"
        onStartTerco={() => undefined}
      />,
    );

    expect(getByText('Usando catálogo offline embutido.')).toBeTruthy();
    expect(getAllByText('Rezar este terço')).toHaveLength(3);
    expect(getByText('A Anunciação')).toBeTruthy();
    expect(getByText('A Crucifixão')).toBeTruthy();
  });
});
