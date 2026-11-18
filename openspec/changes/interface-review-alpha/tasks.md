# Tasks

## 1. Ajustes e home

- [x] 1.1 Botão de engrenagem (`AppIcon` com `expo-symbols`) no topo da home, rótulo de acessibilidade “Ajustes”; remover o link de texto e o `ChantToggle` da home; “Escolher um terço” vira cartão. Verificar com `npx jest src/features/rosary-prayer/prayer-entry-screens-test.tsx` e captura web da home.
- [x] 1.2 Seção “Canto gregoriano” na tela de Ajustes com `ChantToggle` (interruptor + crédito) e seção “Sobre”. Verificar com `npx jest src/features/chant/ChantToggle-test.tsx` e captura web de `/ajustes`.
- [x] 1.3 `ContemplativeSwitch`: dourado também na web (`activeThumbColor`).
- [x] 1.4 Remover a aba “Tab Two” e os componentes do template (`EditScreenInfo`, `ExternalLink`, `StyledText`, `Themed`, `useClientOnlyValue`, `Colors`); `+not-found` no estilo do app. Verificar com `npx tsc --noEmit`.

## 2. Movimento da obra

- [x] 2.1 `artworkSweepSpeed` / `artworkSweepTimeline` em `src/domain/artworkMotion.ts`: velocidade de borda 36 px/s, 30% no foco, desaceleração antes da virada, ida entre 18 e 90 s; o ponto lento segue o foco curado. Verificar com `npx jest src/domain/artworkMotion-test.ts`.
- [x] 2.2 `ArtworkBackground` usa tempo linear e `interpolate` pela curva. Verificar na web medindo a translação: perto das bordas ~30–36 px/s, no centro ~11 px/s.

## 3. Créditos e fontes

- [x] 3.1 Crédito da obra em todos os passos, tocável, abre `SourceSheet` com acervo e link; crédito da obra padrão com acervo e link. Verificar com `npx jest src/shared/components/SourceSheet-test.tsx`.
- [x] 3.2 `src/domain/citationSources.ts`: links de Bíblia, Catecismo (página com o parágrafo), Suma (questão/artigo), documentos do Magistério e busca de reserva; `passageLabel` (“Sagrada Escritura” fora dos evangelhos); `shortCitationSource`. Verificar com `npx jest src/domain/citationSources-test.ts`; todos os links de vatican.va e newadvent.org gerados pelo conteúdo curado respondem 200.
- [x] 3.3 `MeditationBlock` com “Ler no contexto” e “Ver a fonte”. Verificar com `npx jest src/features/rosary-prayer/components/MeditationBlock-test.tsx`.

## 4. Assets

- [x] 4.1 `assets/images/notification-icon.png` (96×96, branco sobre transparente) e `"icon"` no plugin `expo-notifications` do `app.json`. Verificar num build Android que a notificação mostra a silhueta.
- [ ] 4.2 Substituir as obras de baixa resolução por reproduções maiores em domínio público, atualizando título, descrição e `sourceUrl` em `generatedMysteryGalleries.ts`.

## 5. Verificação integrada

- [x] 5.1 `npx jest`, `npx tsc --noEmit` e `npm run openspec:check`.
