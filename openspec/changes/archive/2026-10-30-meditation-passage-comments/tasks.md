# Tasks

## 1. Schema e seed

- [x] 1.1 Adicionar migration com `commentaries.passage_id` (not null, FK para `passages`) e `mysteries.meditation_ready` (boolean not null, default false); aplicar no projeto remoto e verificar as colunas com SQL ou `list_tables`.
- [x] 1.2 No mesmo seed idempotente, retirar da Anunciação as passagens `Lc 1, 26-38` e `Is 7, 14` e os dois comentários de amostra; inserir `Lc 1, 26-27` (texto Matos Soares do design) e os nove comentários da tabela do design, cada um com `passage_id`, autor e fonte. Verificar por SQL: uma passagem, nove comentários nessa ordem, `meditation_ready` verdadeiro só nesse mistério, e leitura anon sem login.

## 2. Domínio e repositório

- [x] 2.1 Mapear `passageId` no comentário e `meditationReady` no mistério, no repositório remoto e no catálogo embutido (`mysteryRepository` e `meditationContentRepository`). Teste: comentário sem passagem não entra na meditação; fallback de `joyful-1` é a passagem `Lc 1, 26-27` com os nove comentários, sem `Is 7, 14` nem `Lc 1, 26-38`; os outros mistérios continuam com as passagens do JSON e `meditationReady` falso.
- [x] 2.2 Implementar `pickItem(items, randomIndex)` e cobrir com teste: conjunto vazio não devolve item; o índice escolhe esse item e nenhum de outro conjunto.

## 3. Oração

- [x] 3.1 No hook de meditação, ao entrar no mistério sortear uma passagem e um comentário dela, e guardar o par. Teste: avançar o passo não troca o par; com uma só passagem, ela é a mostrada; o comentário sai só dessa passagem; remontar a sessão sorteia de novo.
- [x] 3.2 Atualizar `MeditationBlock` para esse par, sem lista, sem “Outra passagem” e sem “Outro comentário”, mesmo quando há várias passagens ou vários comentários. Texto acima de 280 caracteres abre e fecha como `PrayerTextBlock` (corte nos primeiros 140, no último espaço); até 280, texto inteiro sem o convite. Teste de componente desses casos e de o toque não ser o avanço do terço.

## 4. Carregamento

- [x] 4.1 Enquanto a passagem não resolve, mostrar indicador “A carregar” na área da meditação, com o painel da oração visível. Se a leitura falha e não há passagem local, não renderizar bloco vazio. Verificar no componente ou no teste do estado do hook.
- [x] 4.2 Enquanto a imagem de fundo não dispara `onLoad`, mostrar o mesmo tipo de indicador sobre o fundo escuro; em erro, o indicador sai e o fundo escuro permanece, com o painel legível. Verificar no componente do fundo.

## 5. Checklist de cobertura

- [x] 5.1 Na home, depois da lista do dia e antes de “Permanecei em mim”, acrescentar “Conteúdo dos mistérios”, abrindo `/meditation-coverage` com os mistérios do conjunto ativo agrupados por terço e marcados por `meditationReady`. A lista da home continua só o terço do dia. Teste: conjunto tradicional mostra quinze e não os luminosos; com luminosos, vinte; falha remota usa o catálogo embutido e um aviso, sem tela em branco.

## 6. Verificação de integração

- [ ] 6.1 `npm test`, `npx tsc --noEmit` e `npm run openspec:check` passam.

## Workflow follow-up

- Revisar os artefatos. Quando for a hora de implementar, `/opsx-apply`.
- Ao arquivar `meditation-content`, não repor “Outra passagem” nem “Outro comentário” por cima do sorteio único desta change.
- Arquivar esta change só depois da implementação revista.
