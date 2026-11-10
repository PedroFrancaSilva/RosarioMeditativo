# Proposal

## Why

Na meditação, a passagem e o comentário usam o mesmo corpo de texto, e só o autor no fim distingue um do outro. No rosário completo e no terço do dia faltam o oferecimento, as citações do Ângelus antes das três Ave-Marias iniciais, o agradecimento final e a Salve Rainha.

## What Changes

- No anúncio do mistério, a passagem ganha o rótulo “Evangelho” e o comentário o rótulo “Comentário”, com a mesma tipografia dourada já usada na referência bíblica. A referência continua no evangelho; autor e fonte continuam no comentário. Não há cartão, cor nova nem lista.
- No rosário completo e no terço do dia, a abertura passa a ser: Sinal da Cruz (o texto longo que já existe, num só passo), Oferecimento, Credo, Pai-Nosso, três Ave-Marias e Glória. Cada uma dessas três Ave-Marias mostra, no mesmo passo, a citação do Ângelus antes do texto da Ave-Maria.
- Depois do último mistério, e antes da tela de conclusão, entram o agradecimento (“Infinitas graças vos damos…”) e a Salve Rainha. O mistério avulso não ganha abertura nem encerramento.
- As orações novas viajam no app, com resumo e texto completo, sem rede.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `rosary-prayer`: sequência de abertura e encerramento do rosário completo e do terço; citação antes das três Ave-Marias iniciais; rótulos “Evangelho” e “Comentário” na meditação; orações fixas novas disponíveis offline.

## Impact

- `src/domain/rosary/fixedPrayers.ts`, `types.ts`, `buildPrayerSteps.ts` e a apresentação do passo.
- `MeditationBlock` e o rótulo persistente do encerramento em `PrayerScreen` (hoje qualquer passo sem mistério aparece como “Abertura”).
- Testes de sequência, contas e do bloco de meditação.
- A change em curso `meditation-passage-comments` já desenha um par passagem/comentário. Esta change só rotula esse par; não devolve “Outra passagem” nem “Outro comentário”.

## Fora de escopo

- Cláusula dentro das dez Ave-Marias de cada mistério.
- Ladainha, a oração “Ó Deus, cujo Filho…” e um segundo sinal da cruz no fim.
- Abrir ou encerrar o mistério avulso com essas orações.
- Trocar a tradução bíblica, o sorteio da meditação ou o checklist de cobertura.
- Áudio, indulgências interativas e arquivar as changes `meditation-content` e `meditation-passage-comments`.
