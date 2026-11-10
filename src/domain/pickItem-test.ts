import { pickItem } from '@/domain/pickItem';

describe('pickItem', () => {
  it('não devolve item quando o conjunto está vazio', () => {
    expect(pickItem([], 0)).toBeUndefined();
  });

  it('escolhe o índice pedido e ignora outro conjunto', () => {
    const chosen = ['primeiro', 'segundo'];
    const other = ['alheio'];
    const picked = pickItem(chosen, 1);
    expect(picked).toBe('segundo');
    expect(picked).not.toBe(other[0]);
  });
});
