# Tasks

## 1. Base visual

- [x] 1.1 Criar `src/shared/constants/contemplative.ts` com fundo `#0d0b0a`, creme `#f2eadb`, ouro `#d4af55`, texto secundário e o painel semitransparente. Verificar que a seleção e a oração importam esses tokens e não usam o azul padrão de `Colors.ts`.
- [x] 1.2 Instalar `@expo-google-fonts/cormorant-garamond` e `@expo-google-fonts/inter` com `npx expo install` e carregá-los no `useFonts` de `src/app/_layout.tsx` (Cormorant 400, 500 e itálico 400; Inter 500 e 600). Verificar que `npx expo-doctor` termina sem erro de dependência.

## 2. Terço do dia

- [x] 2.1 Adicionar `tercoTypeForDate(set, date)` em `src/domain/mysteryTerco.ts` com o calendário do design (tradicional e com luminosos, quinta inclusive). Estender `src/domain/mysteryTerco-test.ts` com uma data fixa por dia da semana nos dois conjuntos e verificar que `npm test -- src/domain/mysteryTerco-test.ts` passa.

## 3. Tela de seleção

- [x] 3.1 Reescrever `src/app/(tabs)/index.tsx` na ordem do protótipo: título “Rosário Meditativo”, subtítulo, “Tradicional” / “Com Luminosos”, card “Rosário completo” com “Cerca de 45 minutos”, seção “Mistérios do dia” só com o terço de `tercoTypeForDate`, “Rezar este terço”, lista 1–5 e “Permanecei em mim”. Em falha do catálogo remoto, manter o catálogo local e um aviso discreto. Verificar na tela que os outros terços não aparecem e que os três inícios (`full`, `tercio`, `single`) seguem para `/prayer` com os params atuais.
- [x] 3.2 Ocultar header nativo e tab bar na rota `index`, e respeitar a safe area. Verificar que a seleção ocupa a tela inteira, sem a barra “Rezar” / “Tab Two”, e que o título não fica sob o recorte do aparelho.

## 4. Contas da dezena

- [x] 4.1 Criar o view-model puro das dez contas (Ave-Maria, Pai-Nosso com destaque na primeira sem concluída, Glória/Fátima com as dez concluídas, abertura sem destaque) sem alterar `buildRosaryProgressModel`. Cobrir esses quatro casos em teste unitário e verificar que `npm test` desse arquivo passa.

## 5. Tela de oração

- [x] 5.1 Remontar `PrayerScreen`: quadro em tela cheia, gradiente inferior, cabeçalho com índice “N de M” (ou “Abertura”), chevron que volta à seleção, “Próximo mistério” só quando houver mistério seguinte, área “Toque para avançar”, painel com kicker, título, resumo/completo e as dez contas. Remover os chevrons inferiores e o `RosaryProgressMap`. Verificar toque fora do painel avança, toque no painel não muda o passo, swipe esquerda/direita continua, e a conclusão não avança além de si com ação separada de voltar ao início.
- [x] 5.2 Animar com Reanimated a altura do painel (medida, não `maxHeight` fixo) e o diâmetro/preenchimento da conta atual, entre 220 e 280 ms, e ignorar um segundo avanço enquanto a animação de troca de passo não termina. Verificar no código as durações nesse intervalo e, na tela, que dois toques rápidos na área central avançam um único passo.
- [x] 5.3 Confirmar na documentação do Expo SDK 58 a animação do native stack e aplicar fade ou deslize curto de cerca de 280 ms na rota `/prayer`. Se a duração não for configurável, animar a opacidade com Reanimated. Verificar a ida e a volta entre seleção e oração.
- [x] 5.4 Reestilizar `MeditationBlock`, o crédito da obra e o passo de conclusão com a mesma paleta, sem mudar hooks de conteúdo. Verificar que anúncio com meditação mostra passagem ou comentário junto do painel, anúncio sem conteúdo não deixa bloco vazio, e o toque no crédito não avança o passo.

## 6. Verificação de integração

- [x] 6.1 Rodar `npx tsc --noEmit` e `npm test -- src/domain/mysteryTerco-test.ts` mais o teste novo das contas, e confirmar que ambos passam.
- [x] 6.2 Rodar `npm run openspec:check` e confirmar que o delta `contemplative-ui` valida em modo estrito.

## Workflow follow-up

- Arquivar a change depois da revisão, com `openspec archive`.
- Não editar `openspec/specs/rosary-prayer/spec.md` direto; o archive faz o merge do delta.
