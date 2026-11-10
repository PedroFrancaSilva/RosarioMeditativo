# Design

## Context

A sessão já gera `PrayerStep[]` em `buildPrayerSteps`: abertura (só no terço completo), anúncio de mistério, Pai-Nosso, dez Ave-Marias, Glória, Fátima, e um passo de conclusão. `useRosarySession` só faz `next` / `previous` por índice. `PrayerScreen` cobre o terço inferior com um `Pressable` absoluto que avança; esse alvo fica por cima do cartão de texto, então expandir o texto também muda o passo. `DecadeBeads` desenha dez círculos da década atual e some fora dela. Ver `proposal.md` para o motivo.

Restrições: Expo SDK 58, sem dependência nova, UI em `src/features/rosary-prayer`, lógica de índice fora do componente de tela.

## Goals / Non-Goals

**Goals:**

- Mapa do terço derivado dos passos já gerados, sem alterar a ordem das orações.
- Nome do mistério (ou “Abertura”) sempre na tela, separado do título da oração corrente.
- Salto para o próximo `mystery-announcement` com índice maior que o atual.
- Avanço e volta de um passo só pelas setas e pelo deslize; o toque no texto só expande.

**Non-Goals:**

- Ver `proposal.md` — fora de escopo. Este desenho também não introduz salto para mistério anterior nem para um mistério escolhido na lista.

## Decisions

### 1. Mapa em dois níveis, não 50 contas iguais

Cada mistério da sessão é um grupo: uma conta maior (a “dezena”) numa curva ou fileira que lembra o laço do terço. A década **atual** abre as dez contas pequenas (mais a marca do Pai-Nosso quando `hailMaryIndex === 0`). Décadas já rezadas ficam preenchidas; as seguintes, vazias.

Alternativa rejeitada: desenhar as dez contas de todos os mistérios ao mesmo tempo. Em cinco mistérios cabe mal no celular e compete com o texto.

No modo `single` há um único grupo. Na abertura (`mysteryId` ausente e ainda não houve anúncio), nenhum grupo está ativo e o rótulo é “Abertura”.

### 2. Rótulo do mistério vem do passo, não de um fetch novo

`presentPrayerStep` (ou um helper ao lado) expõe `mysteryTitle` persistente: `step.mysteryTitle` no anúncio, ou o título do anúncio daquele `mysteryId` nos passos da década. Fora de mistério, “Abertura”. Na conclusão, o mapa pode mostrar as décadas preenchidas e o rótulo da conclusão, sem setas de passo.

### 3. Salto é um índice, não um modo novo

`useRosarySession` ganha `skipToNextMystery`: procura o menor índice `> stepIndex` com `kind === 'mystery-announcement'`. Se não houver, `canSkipToNextMystery` é falso e o botão não renderiza. Não salta para `completion`.

Alternativa rejeitada: filtrar passos já rezados. O histórico de `previous` continua passo a passo, então quem saltou pode voltar pelas setas.

### 4. Setas com `expo-symbols`, zona de toque removida

Remover o `Pressable` absoluto de 35% da altura. Barra inferior: voltar (oculto no primeiro passo), “Próximo mistério” (oculto quando `canSkipToNextMystery` é falso), avançar (oculto no último passo e na conclusão). Ícones já disponíveis em `expo-symbols` (chevron). O `Gesture.Pan` no root permanece para o deslize. O `Pressable` do texto não chama `onNext`.

Alvos de toque com pelo menos ~44 pt e `accessibilityLabel` em pt-BR.

### 5. Texto recolhe no destino

`PrayerTextBlock` já zera a expansão quando `stepKey` muda. O salto deve mudar `stepKey` (índice + id), então o destino abre no resumo sem estado extra.

## Risks / Trade-offs

- [Curva do terço apertada em telas baixas] → grupos compactos; só a década atual expande as dez contas; o texto continua com prioridade de leitura no cartão.
- [Deslize ainda pode avançar ao arrastar sobre o texto] → o pan exige deslocamento horizontal claro (`activeOffsetX`); toque curto não avança. Se o conflito continuar na prática, restringir o gesto à área do mapa, sem mudar a spec (a spec exige o deslize, não onde ele começa).
- [Salto pula meditação da década] → o controle é explícito e secundário às setas; o caminho passo a passo permanece o padrão.

## Migration Plan

Mudança só de cliente, na tela `/prayer`. Sem migração de dados. Reverter é voltar o overlay de avanço e a fileira única de contas.

## Open Questions

Nenhuma que altere spec, abordagem ou tarefas. O desenho exato da curva (arco vs. fileira) fica para o implementador, desde que os grupos de mistério e a década atual sejam distinguíveis.
