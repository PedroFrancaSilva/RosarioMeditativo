# Tasks

## 1. Orações fixas

- [x] 1.1 Acrescentar `opening-offering`, `closing-thanksgiving` e `hail-holy-queen` com resumo e texto completo da spec, sem alterar o Sinal da Cruz. Verificar que os três textos completos batem com a spec e que `getFixedPrayer` os devolve sem rede.

## 2. Sequência

- [x] 2.1 Em `full` e `tercio`, ordenar a abertura como Sinal da Cruz, Oferecimento, Credo, Pai-Nosso, três Ave-Marias e Glória, com um único Sinal da Cruz. Nas três Ave-Marias, preencher `lead` com as três citações do Ângelus, no mesmo passo. Depois do último mistério e antes da conclusão, acrescentar agradecimento e Salve Rainha. O modo `single` continua no anúncio e termina na conclusão, sem essas orações e sem `lead` nas Ave-Marias da dezena. Verificar em `buildPrayerSteps-test`: ordem da abertura, um só Sinal da Cruz, as três citações, o par final, e a ausência disso no mistério avulso.

## 3. Apresentação

- [x] 3.1 Mostrar `lead` inteiro, acima do corpo da Ave-Maria, no dourado versalete da referência. No agradecimento e na Salve Rainha, o rótulo persistente é “Encerramento”, não “Abertura”, e nenhuma conta da dezena fica concluída. Verificar no teste da apresentação: a citação não entra no texto recolhido da Ave-Maria; o encerramento não usa o rótulo de abertura.

## 4. Meditação

- [x] 4.1 Em `MeditationBlock`, rotular a passagem como “Evangelho” e o comentário como “Comentário”, reutilizando o estilo da referência. Sem comentário, “Comentário” não aparece. O toque nesses textos não avança o passo. Verificar no teste do componente esses dois casos, inclusive a ausência de cartão, “Outra passagem” e “Outro comentário”.

## 5. Verificação de integração

- [x] 5.1 `npm test`, `npx tsc --noEmit` e `openspec validate rosary-prayers-and-gospel-label --type change --strict --no-interactive` passam.

## Workflow follow-up

- Revisar os artefatos. Implementar com `/opsx-apply` quando for a hora.
- Ao editar `MeditationBlock`, não repor “Outra passagem” nem “Outro comentário”.
- Arquivar esta change só depois da implementação revista.
