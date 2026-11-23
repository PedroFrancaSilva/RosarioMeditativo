import { render, userEvent } from '@testing-library/react-native';

import { MeditationBlock } from '@/features/rosary-prayer/components/MeditationBlock';
import type { Commentary, Passage } from '@/domain/mystery';

const passage: Passage = {
  id: 'p1',
  mysteryId: 'm',
  text: 'Texto curto da passagem.',
  reference: 'Lc 1, 26-27',
  sortOrder: 0,
};

const longText = `${'Palavra '.repeat(40)}fim do comentário longo.`;

const commentary: Commentary = {
  id: 'c1',
  mysteryId: 'm',
  passageId: 'p1',
  text: longText,
  author: 'São Tomás de Aquino',
  source: 'Suma Teológica, III, q. 30, a. 1',
  sortOrder: 0,
};

describe('<MeditationBlock />', () => {
  it('mostra o texto curto inteiro, sem convite para expandir', async () => {
    const { getByText, queryByText } = await render(
      <MeditationBlock
        status="ready"
        passage={passage}
        hasDeeperReferences={false}
        onOpenDeeper={() => undefined}
      />,
    );
    expect(getByText('Evangelho')).toBeTruthy();
    expect(getByText('Lc 1, 26-27')).toBeTruthy();
    expect(getByText('Texto curto da passagem.')).toBeTruthy();
    expect(queryByText('Comentário')).toBeNull();
    expect(queryByText('Toque para ver texto completo')).toBeNull();
    expect(queryByText('Outra passagem')).toBeNull();
    expect(queryByText('Outro comentário')).toBeNull();
  });

  it('expande e recolhe o comentário longo sem oferecer outra passagem', async () => {
    const user = userEvent.setup();
    const onOpenDeeper = jest.fn();
    const { getAllByText, getByText, queryByText } = await render(
      <MeditationBlock
        status="ready"
        passage={passage}
        commentary={commentary}
        hasDeeperReferences={false}
        onOpenDeeper={onOpenDeeper}
      />,
    );

    expect(getByText('Evangelho')).toBeTruthy();
    expect(getByText('Comentário')).toBeTruthy();
    expect(getByText('São Tomás de Aquino · Suma Teológica, III, q. 30, a. 1')).toBeTruthy();
    expect(queryByText(longText)).toBeNull();
    expect(queryByText('Outra passagem')).toBeNull();
    expect(queryByText('Outro comentário')).toBeNull();
    expect(onOpenDeeper).not.toHaveBeenCalled();

    const hints = getAllByText('Toque para ver texto completo');
    await user.press(hints[hints.length - 1]!);
    expect(getAllByText(longText).length).toBeGreaterThan(0);
    expect(getByText('Toque para recolher')).toBeTruthy();

    await user.press(getByText('Toque para recolher'));
    expect(queryByText(longText)).toBeNull();
  });

  it('indica carregamento e não mostra bloco vazio', async () => {
    const loading = await render(
      <MeditationBlock status="loading" hasDeeperReferences={false} onOpenDeeper={() => undefined} />,
    );
    expect(loading.getByLabelText('Carregando')).toBeTruthy();

    const empty = await render(
      <MeditationBlock status="empty" hasDeeperReferences={false} onOpenDeeper={() => undefined} />,
    );
    expect(empty.toJSON()).toBeNull();
  });

  it('«Outra meditação» só aparece quando há outro par e chama o sorteio', async () => {
    const onDrawAnother = jest.fn();
    const { getByText, queryByText, rerender } = await render(
      <MeditationBlock
        status="ready"
        passage={passage}
        commentary={commentary}
        hasDeeperReferences={false}
        onOpenDeeper={() => undefined}
        canDrawAnother
        onDrawAnother={onDrawAnother}
      />,
    );
    await userEvent.setup().press(getByText('Outra meditação'));
    expect(onDrawAnother).toHaveBeenCalledTimes(1);

    await rerender(
      <MeditationBlock
        status="ready"
        passage={passage}
        commentary={commentary}
        hasDeeperReferences={false}
        onOpenDeeper={() => undefined}
        canDrawAnother={false}
        onDrawAnother={onDrawAnother}
      />,
    );
    expect(queryByText('Outra meditação')).toBeNull();
  });
});

describe('<MeditationBlock /> fontes', () => {
  it('abre a ficha da passagem e do comentário com o link do texto completo', async () => {
    const user = userEvent.setup();
    const onOpenSource = jest.fn();
    const { getByLabelText } = await render(
      <MeditationBlock
        status="ready"
        passage={passage}
        commentary={commentary}
        hasDeeperReferences={false}
        onOpenDeeper={() => undefined}
        onOpenSource={onOpenSource}
      />,
    );
    await user.press(getByLabelText('Ler no contexto'));
    expect(onOpenSource).toHaveBeenLastCalledWith(
      expect.objectContaining({
        kicker: 'Evangelho',
        title: 'Lc 1, 26-27',
        link: expect.objectContaining({ url: 'https://www.bibliacatolica.com.br/biblia-ave-maria/sao-lucas/1/' }),
      }),
    );
    await user.press(getByLabelText('Ver a fonte'));
    expect(onOpenSource).toHaveBeenLastCalledWith(
      expect.objectContaining({
        kicker: 'Comentário',
        title: 'São Tomás de Aquino',
        link: expect.objectContaining({ url: 'https://www.newadvent.org/summa/4030.htm#article1' }),
      }),
    );
  });

  it('passagem fora dos evangelhos não leva o rótulo Evangelho', async () => {
    const { getByText, queryByText } = await render(
      <MeditationBlock
        status="ready"
        passage={{ ...passage, reference: 'Is 53, 5' }}
        hasDeeperReferences={false}
        onOpenDeeper={() => undefined}
      />,
    );
    expect(getByText('Sagrada Escritura')).toBeTruthy();
    expect(queryByText('Evangelho')).toBeNull();
  });
});
