# Design

## Decisões

### Uma única escolha de modo

A aba “Tradicional” da home já existe, então ela define também a forma das orações. A pessoa não precisa combinar dois seletores. Idioma e Oração de Fátima só aparecem quando o modo tradicional está ativo.

### `PrayerForm` acompanha a sessão

`PrayerForm` tem `traditional`, `language` e `fatima`. Desligar a Oração de Fátima muda a quantidade de passos, e a sessão salva guarda um índice de passo. Por isso a forma é gravada na sessão e volta pela rota ao retomar. Uma sessão antiga, sem forma, é retomada com a Oração de Fátima, em português, como foi iniciada.

### Texto resolvido na apresentação

`buildPrayerSteps` decide quais passos existem. `getFixedPrayer(id, form)` decide o texto. Assim o latim não altera o índice dos passos.

### Latim com apoio

O texto latino aparece recolhido e expandido. A tradução só aparece ao expandir, para não competir com a oração. Oferecimento e Agradecimento não recebem uma tradução inventada.

### Calendário calculado

As datas móveis saem de `easterSunday` e `adventSunday`, já usadas pela antífona. O app funciona sem rede e não exige manutenção anual.

### Indulgência sem promessa

A página ensina as condições, mas nunca diz que a pessoa “ganhou” uma indulgência, porque a disposição interior e as condições não são verificáveis. Ela deixa claro que o Rosário rezado sozinho dá indulgência parcial.

## Riscos

- O padrão da primeira abertura muda de “Tradicional” para “Com Luminosos”. Isso é necessário para que as formas tradicionais só apareçam por escolha.
- Os frutos dos Mistérios Luminosos não têm uma lista tradicional fixa e pedem revisão teológica.
