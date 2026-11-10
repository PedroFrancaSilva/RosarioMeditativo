# Proposal

## Why

Na oração, “Toque para avançar” ficou no meio do quadro e um toque sem querer não tem volta visível. O crédito da obra também ocupa o centro. As imagens entram com `contain` e faixas vazias, enquanto o protótipo cobre a tela e respira devagar. A contemplação pede um recorte que se move, com caminho próprio para cada quadro.

## What Changes

- **BREAKING** A metade direita da área do quadro, fora do painel, avança um passo. A metade esquerda volta um passo. As dicas ficam logo abaixo do cabeçalho, não no meio vertical da tela. O deslize esquerda/direita permanece.
- O crédito (título e artista) vai para o canto inferior esquerdo, em linha, e some nos passos de um mistério, quando o texto já ocupa a tela. Continua visível na abertura e na conclusão.
- O fundo deixa de letterbox. A imagem cobre a tela e percorre um caminho lento (foco + leve deriva + escala), no espírito do `slow-breathe` do protótipo (cerca de 18 s, ida e volta).
- Cada imagem pode apontar o foco e uma deriva curta. A escala é a mesma para todas: cobre a tela e respira cerca de 4,5%, como no protótipo. O zoom do crop lateral antigo não entra nesse enquadramento.

## Capabilities

### New Capabilities

_(nenhuma)_

### Modified Capabilities

- `rosary-prayer`: gestos de avanço e retorno por metade da tela, posição e visibilidade do crédito, e movimento contemplativo do quadro. Spec em `openspec/specs/rosary-prayer/spec.md`. A change `contemplative-ui` já implementou o toque único para avançar e ainda não foi arquivada; o delta daqui substitui esse gesto.

## Impact

- `PrayerScreen`: zonas de toque, dicas, crédito e a camada da imagem animada com Reanimated.
- `useMysteryBackground` e `prayerAssets`: caminho de movimento por imagem, em vez de só `resizeMode: 'contain'`.
- Tipo `MysteryImage` e colunas opcionais em `public.images` (`focal_x`, `focal_y`, `drift_x`, `drift_y`), nulas até alguém calibrar. Imagem sem esses campos usa o padrão.
- A rotação de imagem a cada duas Ave-Marias não muda; o caminho recomeça quando a obra troca.

## Fora do escopo

- Home, terço do dia, contas da dezena e textos das orações.
- Trocar a regra de qual imagem aparece, ou reaproveitar o painel e o percentual de crop lateral na oração.
- Áudio, catálogo de mistérios e seeds de foco para todos os mistérios. Sem foco gravado, a obra usa o enquadramento padrão.
- Arquivar `contemplative-ui`. Convém arquivá-la antes desta, porque as duas alteram Navigation gestures.
