# Design

## Context

Ver `proposal.md`. A abertura de `full` e `tercio` já começa no Sinal da Cruz (`fixedPrayers.ts`, texto longo “Pelo sinal da Santa Cruz…”), seguido de Credo, Pai-Nosso, três Ave-Marias e Glória. O modo `single` começa no anúncio. O encerramento é só a tela “Terço concluído”. Qualquer passo sem `mysteryId` é rotulado “Abertura” em `PrayerScreen`. O bloco de meditação mostra a referência em dourado versalete e o comentário no mesmo serif do evangelho, com autor só no fim.

## Goals / Non-Goals

**Goals:**

- Inserir Oferecimento, as três citações do Ângelus e o par agradecimento + Salve Rainha sem criar passos extras para a citação.
- Rotular evangelho e comentário com o estilo que a referência bíblica já usa.
- Marcar o trecho final como encerramento, sem concluir conta de dezena.

**Non-Goals:**

- Não alterar o texto do Sinal da Cruz nem duplicar esse passo.
- Não colocar citação nas dez Ave-Marias do mistério.

## Decisions

1. **Três orações fixas novas, o Sinal da Cruz fica.** Novos ids `opening-offering`, `closing-thanksgiving` e `hail-holy-queen` em `FixedPrayerId`, cada um com `summary` e `fullText` iguais aos textos da spec. Alternativa rejeitada: um único passo “encerramento” com as duas orações, porque a spec exige dois passos.

2. **A citação do Ângelus não é um passo.** `PrayerStep` ganha `lead: string | null`. Só as três Ave-Marias da abertura preenchem `lead`, nesta ordem: “O Anjo do Senhor anunciou a Maria, e ela concebeu do Espírito Santo.”; “Eis aqui a serva do Senhor; faça-se em mim segundo a vossa palavra.”; “A Palavra se fez carne e habitou entre nós.” A apresentação mostra `lead` sempre inteiro, acima do corpo da Ave-Maria, no mesmo dourado versalete da referência. O resumo e o texto completo continuam sendo só a Ave-Maria. Alternativa rejeitada: colar a citação no `fullText`, porque o recolher esconderia a citação ou o convite de expandir passaria a valer para ela.

3. **Onde a sequência muda.** `openingSteps()` insere o Oferecimento logo após o Sinal da Cruz. `closingSteps()` devolve agradecimento e Salve Rainha. `buildPrayerSteps` acrescenta o encerramento só em `full` e `tercio`, imediatamente antes do passo de conclusão. `single` não chama abertura nem encerramento.

4. **Rótulo persistente.** A apresentação distingue passo sem mistério que seja encerramento. `PrayerScreen` mostra “Encerramento” nesses passos e continua mostrando “Abertura” na abertura. As contas seguem a regra atual de passo sem `mysteryId`: nenhuma concluída.

5. **Rótulos da meditação.** `MeditationBlock` reutiliza o estilo da referência (`contemplative.gold`, versalete). “Evangelho” fica acima da referência; “Comentário” fica acima do texto do comentário. Autor e fonte permanecem na linha discreta de baixo. Sem comentário, o rótulo “Comentário” não é renderizado.

## Risks / Trade-offs

- [A change `meditation-passage-comments` também edita `MeditationBlock`] → Esta change só acrescenta os dois rótulos em cima do par já sorteado. Não reintroduz “Outra passagem” nem “Outro comentário”.
- [Passo sem mistério hoje cai em “Abertura”] → O encerramento precisa de marca própria; senão o agradecimento aparece como abertura.
- [As duas primeiras citações do Ângelus não foram ditadas palavra a palavra] → Ficam fixadas na spec como os versículos que acompanham o exemplo “A Palavra se fez carne…”. Mudar o texto depois é troca de constante, não de sequência.

## Migration Plan

Sem migração de dados. As orações novas são constantes do app. Reverter é retirar os ids e os passos.

## Open Questions

Nenhuma.
