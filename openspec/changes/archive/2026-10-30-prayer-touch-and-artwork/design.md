# Design

## Context

A oração em `PrayerScreen` trata a área entre o cabeçalho e o painel como um único `Pressable` que avança, com “Toque para avançar” centrado nessa faixa (`justifyContent: 'center'`). O crédito está rotacionado à direita, em `top: '46%'`. O fundo usa `ImageBackground` com `resizeMode` `contain` (catálogo embutido e seed da Anunciação). O percentual de crop lateral fica só no preview de desenvolvimento e não define a oração. O protótipo em `referencia/Figma Rosário/src/index.css` cobre a tela (`background-size: cover`, `background-position: center 26%`) e anima `scale(1)` → `scale(1.045)` em 18 s, ida e volta (`slow-breathe`). Ver proposal.md para o motivo.

## Goals / Non-Goals

**Goals:**

- Voltar um passo com a metade esquerda, sem depender de o usuário descobrir o deslize.
- Tirar dica e crédito do centro do quadro.
- Cobrir a tela e percorrer um caminho lento, configurável por imagem, com padrão seguro.

**Non-Goals:**

- Recalibrar à mão o foco de todos os mistérios.
- Mudar a cada quantas Ave-Marias a galeria troca de obra.

## Decisions

### Metades da área do quadro

A faixa entre o cabeçalho e o painel continua sendo a área de toque, fora do painel e do crédito. Ela se divide ao meio na horizontal: esquerda chama `onPrevious` se `canGoPrevious`; direita chama `onNext` se `canGoNext`, com a trava de 260 ms que já existe. O deslize permanece. O chevron do topo continua saindo para a seleção.

As dicas ficam no topo dessa faixa (`justifyContent: 'flex-start'`), “Toque para voltar” à esquerda e “Toque para avançar” à direita. Na conclusão a faixa não muda o passo.

Alternativa: só o deslize para voltar. Rejeitada — o pedido é um toque simétrico, visível.

### Crédito no canto inferior esquerdo

Texto horizontal, uma linha, canto inferior esquerdo da área do quadro, acima do bloco de texto, fonte pequena já usada. Some quando `presentation.step.mysteryId` existe (anúncio e dezena). Abertura e conclusão mostram, se houver título e artista. O toque no crédito não chama avanço nem retorno.

### Caminho Ken Burns, não letterbox

Pesquisa: o protótipo não mostra o quadro inteiro nem aplica um zoom por obra. Ele corta com `cover`, ancora um pouco acima do centro e respira 4,5% em 18 s. O crop lateral antigo (até 70% na Anunciação) aperta demais e deixa de valer na oração.

Todas as imagens usam a mesma escala: `1` sobre o cover até `1,045`, em 18 s, ida e volta. O que pode variar por obra é só para onde se olha.

Tipo puro `ArtworkMotion` em `src/domain/`:

- `focalX`, `focalY` em 0–1
- `driftX`, `driftY` como fração extra do enquadramento (padrão 0,035 e −0,025)
- `durationMs` fixo em 18000
- escala fixa de 1 a 1,045, não configurável por imagem

Padrão: foco `(0,5, 0,38)`, o viés alto do `center 26%` do protótipo. Imagem sem foco usa esse padrão. `bakedLateralCropPercent` não entra no cálculo.

Render: `Animated.Image` absoluto, maior que a tela. No `onLoad`, com largura e altura intrínsecas:

- `cover = max(telaL / imgL, telaA / imgA)`
- tamanho renderizado = intrínseco × cover × escala do quadro
- translação leva o foco ao centro e é limitada para as bordas da imagem nunca entrarem na tela

Reanimated anima escala e translação com `withRepeat(..., -1, true)` na duração do caminho. A mesma `backgroundKey` não reinicia a animação; trocar a obra zera o progresso. `AccessibilityInfo.isReduceMotionEnabled` deixa o quadro no quadro inicial.

Até o `onLoad`, o fundo é `#0d0b0a`. Falha de carga mantém esse fundo e o painel.

Alternativa: continuar em `contain`. Rejeitada — é a faixa vazia que o pedido quer deixar para trás. Alternativa: pan de uma ponta à outra do quadro. Rejeitada — longo demais para um retrato de oração e fácil de cortar o rosto.

### Onde vive o caminho

- Catálogo embutido: campo opcional `motion` só com foco e deriva. Sem esse campo, a obra usa o padrão. A Anunciação não ganha zoom próprio.
- Remoto: colunas nulas `focal_x`, `focal_y`, `drift_x`, `drift_y` em `public.images`, com check de faixa. Nulo significa padrão. O `select` de `fetchRemoteMysteryImages` passa a pedi-las. Se a query falhar porque a migration ainda não rodou, o repositório continua caindo no catálogo embutido, como já faz em erro.
- `resizeMode: 'contain'` deixa de mandar na oração. O cover calculado substitui. A coluna pode permanecer para não quebrar a migration anterior; a tela não letterboxa.

A change `meditation-content` também edita esse repositório. Reler o arquivo na apply antes de mexer no `select`.

## Risks / Trade-offs

- [Um quadro muito largo pode deixar um rosto fora do cover] → O foco padrão fica um pouco acima do centro, como no protótipo, e um foco opcional por imagem recentra sem aumentar o zoom. A translação continua grampeada para não abrir faixa vazia.
- [Select com colunas novas antes da migration zera as imagens remotas daquele mistério] → O fallback embutido permanece. A migration entra na mesma change, antes de depender do remoto.
- [Arquivar esta change antes de `contemplative-ui` disputa o requirement Navigation gestures] → Arquivar `contemplative-ui` primeiro. O texto daqui é o gesto que deve ficar.

## Migration Plan

Uma migration aditiva, colunas nulas, sem backfill. Reverter a migration dropa as colunas; o cliente trata ausência como caminho padrão. Não há migração de passos da oração.

## Open Questions

Nenhuma. O crédito some em todo passo com `mysteryId`, não só no anúncio. As dicas ficam no topo da área do quadro, com “Toque para voltar” à esquerda.
