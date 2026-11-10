# Design

## Context

A seleção está em `src/app/(tabs)/index.tsx` e lista todos os terços de `groupMysteriesByTerco`. A oração está em `PrayerScreen`, com `RosaryProgressMap` em duas linhas, chevrons inferiores e swipe. O passo, o texto curto/completo e o modelo `buildRosaryProgressModel` já existem. `react-native-reanimated` 4.7 e `react-native-safe-area-context` já estão instalados; a única fonte carregada é SpaceMono. A referência visual é `referencia/Figma Rosário/` (Cormorant Garamond, Inter, ouro `#d4af55`, fundo `#0d0b0a`). Ver proposal.md para o motivo.

## Goals / Non-Goals

**Goals:**

- Reproduzir a hierarquia, a cópia e a paleta das imagens na seleção e na oração, em cima dos modos de sessão que já existem (`full`, `tercio`, `single`).
- Animar painel, conta e troca de tela em 200–300 ms sem alterar a sequência de passos.
- Manter testável a escolha do terço do dia e o estado visual das dez contas.

**Non-Goals:**

- Trocar a fonte dos textos fixos ou do catálogo de mistérios.
- Reimplementar meditação, crédito da obra ou crop. Só o aspecto visual desses blocos muda.
- Apagar a rota `(tabs)/two`.

## Decisions

### Paleta sempre escura nestas duas telas

Seleção e oração ignoram o tema claro do sistema. Tokens novos em `src/shared/constants/contemplative.ts`: fundo `#0d0b0a`, creme `#f2eadb`, ouro `#d4af55`, texto secundário `#938a80`, painel `rgba(21,17,14,0.78)` com borda `rgba(212,175,85,0.15)`.

Alternativa: seguir `useColorScheme`. Rejeitada — o protótipo é uma atmosfera só, e o claro quebraria o quadro.

### Fontes

Carregar Cormorant Garamond (400, 500, itálico 400) e Inter (500, 600) com `@expo-google-fonts/cormorant-garamond` e `@expo-google-fonts/inter`, via `npx expo install`, no `useFonts` de `src/app/_layout.tsx`. Títulos e corpo da oração usam Cormorant; rótulos em caixa alta usam Inter. Se o load falhar, o `ErrorBoundary` atual continua valendo; o texto não pode depender da fonte para existir.

Alternativa: copiar os TTF para `assets/fonts`. Rejeitada — os pacotes já entram no `transformIgnorePatterns` do Jest e acompanham o SDK.

### Terço do dia

Função pura `tercoTypeForDate(set, date)` em `src/domain/mysteryTerco.ts`, ao lado de `RECOMMENDED_DAYS`. `Date#getDay()` (0 = domingo):

- Tradicional: seg/qui gozosos, ter/sex dolorosos, qua/sáb/dom gloriosos.
- Com luminosos: seg/sáb gozosos, ter/sex dolorosos, qua/dom gloriosos, qui luminosos.

A home filtra `groupMysteriesByTerco` por esse tipo. O subtítulo da seção é `getRecommendedDaysLabel`, em caixa alta, como “SEGUNDA-FEIRA E SÁBADO”. Os círculos da lista usam 1–5 na ordem exibida, não um `sortOrder` global. “Cerca de 45 minutos” fica cópia fixa do card nos dois conjuntos.

Alternativa: mostrar todos os terços abaixo do do dia. Rejeitada — a imagem termina na frase de rodapé.

### Chrome da seleção

Na rota `index`, `headerShown: false` e `tabBarStyle: { display: 'none' }`. Safe area com `useSafeAreaInsets`. O segmented control continua `classic` / `jp2`, com rótulos “Tradicional” e “Com Luminosos”. Navegação para `/prayer` permanece com os params atuais.

### Tela de oração

`PrayerScreen` fica em coluna: fundo em `ImageBackground` (hook atual), `LinearGradient` transparente → `#0d0b0a`, cabeçalho, área de avanço, bloco inferior.

- Cabeçalho: chevron chama `router.back()` (volta à seleção). No centro, “Nº mistério” e “N de M” a partir de `progress.mysteries`. Na abertura, o centro diz “Abertura”, sem índice. “Próximo mistério” é um texto pequeno sob esse centro, só quando `canSkipToNextMystery`.
- A área central é um `Pressable` com “Toque para avançar”. O painel é outro `Pressable` e não propaga o avanço.
- O nome do conjunto vem de `TERCO_TITLES[activeMysteryType]`; o título do mistério continua o rótulo persistente. Na abertura, só “Abertura”.
- O painel usa `presentPrayerStep`: kicker “Nª conta da dezena” na Ave-Maria e “Oração” nos outros passos; título; resumo ou texto completo; “Toque para ver texto completo” / “Toque para recolher”.
- `MeditationBlock` fica acima do painel, nas mesmas cores, só quando há passagem ou comentário. O crédito da obra permanece discreto e o toque nele não avança.
- A conclusão reutiliza o passo atual, no mesmo painel escuro, com “Voltar ao início”. Toque e swipe não passam desse passo.
- Some a fileira inferior de chevrons. Swipe esquerda/direita permanece no `Gesture.Pan` existente.

### Contas

`RosaryProgressMap` sai da oração. Um view-model puro, ao lado de `stepPresentation`, traduz o passo e `RosaryProgressModel` para dez estados visuais e a legenda:

- Ave-Maria: contas anteriores preenchidas, a atual dourada e maior, legenda “N de 10”.
- Pai-Nosso antes da dezena: primeira conta destacada, nenhuma concluída, legenda com o nome da oração. Isso é só visual; `buildRosaryProgressModel` continua sem marcar Ave-Maria concluída nesse passo.
- Glória e Fátima: as dez concluídas, legenda com o nome da oração.
- Abertura: dez contas sem destaque e sem concluída.

O domínio de progresso não muda, para não reabrir os testes de `rosaryProgress`.

### Animações

Todas com Reanimated, `withTiming` entre 220 e 280 ms, easing suave.

- Painel: medir a altura do resumo e do texto completo e animar a altura. Sem `maxHeight` fixo, que corta o Pai-Nosso.
- Conta atual: animar diâmetro (7 → 15) e o preenchimento dourado. As outras não saltam de tamanho.
- Troca seleção ↔ oração: na apply, usar a `animation` do native stack do Expo Router 58 com duração ~280 ms (`fade` ou equivalente com deslocamento curto). Se a duração não for configurável nessa versão, animar a opacidade da tela com Reanimated. Confirmar na doc versionada do SDK 58 antes de escrever a opção.
- Trava de avanço: um ref na tela ignora novo `onNext` enquanto a animação de avanço não terminou. O índice da sessão só incrementa uma vez.

Alternativa: copiar os 500–600 ms do CSS do protótipo. Rejeitada — o pedido fixa 200–300 ms.

## Risks / Trade-offs

- [A change `meditation-content` também edita `PrayerScreen`] → Esta change só move e reestiliza o bloco; não altera hooks nem precedência de dados. Aplicar em cima do estado atual do arquivo e reler o componente antes de editar.
- [Toque no Android disputado entre o `Pressable` central, o painel e o pan] → O pan exige deslocamento horizontal (~20 px), como hoje. O painel é o alvo do toque e chama `stop` implícito por ser o responder. Testar toque no painel, toque no quadro e swipe.
- [Esconder a tab bar deixa “Tab Two” fora do caminho a partir da home] → Aceito. A rota modelo não faz parte desta tela.
- [Rosário de 20 mistérios deixa o cabeçalho “12 de 20” em vez de “4 de 5”] → O protótipo web só tinha cinco mistérios. O spec pede o total da sessão. As dez bolinhas não crescem com o número de mistérios.
- [Fonte extra no bundle] → Só os cortes usados (três de Cormorant, dois de Inter).

## Migration Plan

Não há migração de dados. As rotas e os params de `/prayer` permanecem. Reverter é desfazer o diff de UI; o modelo de passos e o catálogo não mudam.

## Open Questions

Nenhuma. A cópia “Cerca de 45 minutos” fica fixa nos dois conjuntos, como no protótipo, sem cálculo por número de mistérios.
