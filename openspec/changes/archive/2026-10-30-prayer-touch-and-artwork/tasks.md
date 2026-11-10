# Tasks

## 1. Caminho da imagem

- [x] 1.1 Criar o tipo `ArtworkMotion` e a função pura que, dada a tela, o tamanho intrínseco e o foco, devolve translação inicial e final já grampeadas, com escala só de 1 a cerca de 1,045. Cobrir o padrão, um foco customizado e a imagem sem tamanho. Verificar no teste que um percentual de crop lateral não altera a escala.
- [x] 1.2 Aceitar `motion` opcional (foco e deriva, sem zoom) no catálogo embutido, mapear colunas nulas `focal_x`, `focal_y`, `drift_x`, `drift_y` em `MysteryImage` e no `select` de `fetchRemoteMysteryImages`, e adicionar a migration com check de faixa. Verificar que imagem sem esses campos, inclusive a Anunciação, resolve para o fôlego padrão.

## 2. Toque e crédito

- [x] 2.1 Dividir a área do quadro em metades esquerda (passo anterior, se houver) e direita (próximo, com a trava já existente), manter o deslize, e subir as dicas para o topo da faixa (“Toque para voltar” e “Toque para avançar”). Na conclusão, os toques não saem do passo. Verificar no código a divisão em 50% e, na tela, que um toque à esquerda volta e um toque à direita avança, sem o rótulo no meio vertical.
- [x] 2.2 Mover o crédito para o canto inferior esquerdo, em linha, ocultá-lo quando o passo tem `mysteryId`, e ignorar o toque nele para navegação. Verificar na abertura e na conclusão que título e artista aparecem nesse canto, e que somem numa Ave-Maria.

## 3. Movimento na tela

- [x] 3.1 Trocar o `ImageBackground` com `contain` por uma imagem absoluta animada com Reanimated no caminho de 1.1, cerca de 18 s, ida e volta, sem reiniciar enquanto a `backgroundKey` não muda. Com movimento reduzido do sistema, ficar no quadro inicial. Falha de carga deixa o fundo `#0d0b0a` e o painel legível. Verificar que não há faixas vazias e que avançar um passo da mesma obra não zera a animação.

## 4. Verificação

- [x] 4.1 Rodar `npx tsc --noEmit` e `npm test` do módulo de movimento, e confirmar que passam.
- [x] 4.2 Rodar `npm run openspec:check` e confirmar que o delta `prayer-touch-and-artwork` valida em modo estrito.

## Workflow follow-up

- Arquivar `contemplative-ui` antes desta change.
- Não editar `openspec/specs/rosary-prayer/spec.md` direto; o archive faz o merge.
