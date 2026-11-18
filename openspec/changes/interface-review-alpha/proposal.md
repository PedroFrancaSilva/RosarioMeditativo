# Proposal

## Why

A revisão da versão alfa encontrou partes da interface que ficaram soltas. O canto gregoriano fica no rodapé da home, longe dos outros ajustes, e “Ajustes” é um link de texto no fim da página, fácil de não ver. Na oração, a obra percorre a largura inteira numa velocidade quase constante: rápido demais para contemplar o centro da cena, onde está o essencial do quadro. O crédito da obra só aparece nas orações iniciais (por isso só se via a Imaculada Conceição), e nenhuma citação diz onde ler o texto completo. Passagens de Isaías, Atos, 1 Coríntios e Apocalipse aparecem com o rótulo “Evangelho”. O ícone do lembrete diário aparece como um bloco branco na barra do Android, porque a notificação usa o ícone colorido e opaco do app.

## What Changes

- **Ajustes com ícone**: a home ganha um botão de engrenagem no topo, que abre os Ajustes. O link de texto sai do rodapé.
- **Canto nos Ajustes**: o interruptor do canto e o crédito da gravação passam para uma seção “Canto gregoriano” da tela de Ajustes.
- **“Escolher um terço”** vira um cartão na home, no mesmo estilo do “Rosário completo”.
- **Varredura com velocidade variável**: nas bordas a obra corre na velocidade de antes; perto do foco curado (o centro da obra, por padrão) cai para cerca de 30%, e desacelera um pouco antes de virar. A ida deixa de ter teto de 30 s (passa a 90 s).
- **Crédito da obra em todos os passos**, tocável, abre uma ficha com título, artista, acervo e link da fonte da imagem. A obra padrão ganha acervo e link.
- **Fontes das citações**: a passagem e o comentário têm “Ler no contexto” / “Ver a fonte”, que abrem uma ficha com a referência completa e um link: capítulo bíblico, página do Catecismo que contém o parágrafo, artigo da Suma, documento do Magistério em vatican.va, ou uma busca pela referência quando não há edição online estável.
- **Rótulo “Sagrada Escritura”** para passagens que não são dos quatro evangelhos.
- **Ícone de notificação** monocromático (silhueta do terço, branca sobre transparente) no plugin `expo-notifications`.
- **Imagens**: obras com resolução baixa trocadas por reproduções maiores, em domínio público, da mesma obra (ou de outra obra do mesmo mistério quando não há reprodução melhor).
- Remoção das telas e componentes do template Expo que não são usados (aba “Tab Two”, `EditScreenInfo`, `Themed`, etc.).

### Decisões revertidas

- `2026-10-31-gregorian-background-chant` pôs o interruptor do canto na seleção. O dono do produto pediu que fique nos Ajustes.
- `rosary-prayer` escondia o crédito da obra durante os mistérios. O dono do produto pediu a referência de todos os quadros.

## Capabilities

### Modified Capabilities

- `rosary-prayer`: apresentação da seleção, ajustes, crédito da obra, movimento da obra, rótulos da meditação.
- `local-experience`: lugar do interruptor do canto e do crédito; ícone do lembrete.
- `meditation-content`: fontes das citações.

## Fora do escopo

- Interruptor do canto dentro da tela de oração.
- Campo `sourceUrl` por comentário no JSON curado e no Supabase (hoje o link sai da referência em texto).
- Tradução para português dos títulos das obras que estão em inglês.

## Dependência

Esta change altera requisitos introduzidos por `prayer-experience-upgrade` (“Settings screen”, “Daily prayer reminder”, “Contemplative artwork motion”). Arquivar `prayer-experience-upgrade` antes desta.

## Impact

- **UI:** home, `ajustes.tsx`, `PrayerScreen`, `MeditationBlock`, `ChantToggle`; novos `AppIcon`, `SourceSheet`, `ContemplativeSwitch`.
- **Domínio:** `artworkMotion` (curva tempo → posição), novo `citationSources`.
- **Config:** `app.json` (ícone de notificação; precisa de novo build nativo).
- **Assets:** `assets/images/notification-icon.png` e imagens substituídas em `assets/images/mysteries/`.
