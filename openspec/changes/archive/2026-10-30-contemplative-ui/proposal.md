# Proposal

## Why

O fluxo de seleção e de oração já funciona, mas a interface ainda parece um protótipo de React Native: tipografia de sistema, chrome de abas e um mapa de contas que compete com o quadro. O protótipo em `referencia/Figma Rosário/` e as imagens de referência definem a atmosfera contemplativa que o app deve ter agora, sem esperar o conteúdo dinâmico do Supabase.

## What Changes

- A tela de seleção passa a seguir o protótipo: fundo quase preto, título serifado “Rosário Meditativo”, segmented control “Tradicional” / “Com Luminosos”, card “Rosário completo”, seção “Mistérios do dia” e frase de rodapé.
- **BREAKING** A home deixa de listar todos os terços empilhados. Mostra só o terço do dia litúrgico do conjunto selecionado, com “Rezar este terço” e a lista dos cinco mistérios. O rosário completo continua cobrindo todos os mistérios daquele conjunto.
- A tela de oração passa a usar o quadro em tela cheia, vinheta escura, legenda do conjunto e do mistério, painel semitransparente da oração e fileira de dez contas.
- **BREAKING** O mapa de duas linhas (mistérios + Ave-Marias) sai da oração. A posição do mistério vai para o cabeçalho (“N de M”); as dez bolinhas mostram só a dezena. Pai-Nosso, Glória e Fátima não consomem conta.
- **BREAKING** O toque na área central, fora do painel de texto, avança um passo. O chevron superior volta à seleção. O swipe para a esquerda continua avançando e o swipe para a direita continua voltando um passo. O toque no painel só expande ou recolhe o texto.
- Animações com `react-native-reanimated`, discretas, cerca de 200–300 ms: altura do painel, destaque da conta atual e transição entre seleção e oração.
- Orações fixas permanecem no app. Imagens, passagens e comentários continuam nos fluxos já existentes; esta change só os apresenta no novo visual.

## Capabilities

### New Capabilities

_(nenhuma)_

### Modified Capabilities

- `rosary-prayer`: layout da seleção e da oração, terço do dia no lugar do catálogo completo na home, gestos de avanço por toque, e contador de contas da dezena no lugar do mapa de duas linhas. Spec em `openspec/specs/rosary-prayer/spec.md`.

## Impact

- `src/app/(tabs)/index.tsx` e `src/app/(tabs)/_layout.tsx`: seleção em tela cheia, sem header nativo nem tab bar nessa rota.
- `src/features/rosary-prayer/components/` (`PrayerScreen`, painel de texto, contas, bloco de meditação) e `src/app/_layout.tsx` (transição do stack `/prayer`).
- `src/domain/mysteryTerco.ts`: resolver o terço do dia a partir do conjunto e do dia da semana, reusando os dias já documentados em `RECOMMENDED_DAYS`.
- Tipografia: Cormorant Garamond (títulos e orações) e Inter (rótulos), carregadas com `expo-font`.
- Tokens de cor contemplativos em `src/shared/` (ouro `#d4af55`, creme `#f2eadb`, fundo `#0d0b0a`).
- `react-native-reanimated` já está no projeto; não entra capability nova de conteúdo.
- A change em andamento `meditation-content` não muda de requisito aqui. O bloco de meditação só é reestilizado para caber no painel.

## Fora do escopo

- Carregar ou alterar passagens, comentários, imagens ou seeds no Supabase.
- Áudio gregoriano, contador de rosários concluídos, autenticação e download offline (`openspec/specs/local-experience/spec.md`).
- Remover a rota modelo `two` ou redesenhar o modal de info.
- Mudar a sequência de passos, os textos das orações fixas ou a regra de pular para o próximo mistério. O controle de pular permanece, só fica discreto.
- Escolher na home um terço que não seja o do dia. Os outros terços entram pelo rosário completo.
- Copiar o estado simplificado do protótipo web (um único conjunto falso por modo, Pinturas do Unsplash, retorno automático à seleção no fim). A conclusão do rosário continua um passo próprio, com volta ao início.
