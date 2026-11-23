# Proposal

## Why

A revisão teológica de 18/11/2026 mostrou que o app guia bem a oração, mas deixa de fora elementos que quem reza de forma tradicional espera: o fruto de cada mistério, a oração conclusiva do Rosário, as formas tradicionais das orações, o latim e o ciclo litúrgico. O Oferecimento pede “a graça de ganharmos as indulgências”, mas o app não explica o que são nem como se obtêm. Hoje a aba “Tradicional” só retira os Mistérios Luminosos.

## What Changes

- **Fruto do mistério**: o anúncio diz a posição, o tipo e o fruto (“Quarto mistério glorioso. Fruto: a graça de uma boa morte.”). O fruto continua visível durante a dezena.
- **Oração conclusiva** (“Ó Deus, cujo Filho Unigênito…”) depois da Salve Rainha, no terço e no Rosário completo.
- **Modo Rosário tradicional**: a aba “Tradicional” passa a usar “desceu aos infernos”, o Glória longo e a forma tradicional da Oração de Fátima. A Oração de Fátima pode ser desligada.
- **Orações em latim**, opção do modo tradicional. Ao expandir o texto, a tradução em português aparece abaixo. Oferecimento e Agradecimento são devoções em português sem texto latino consagrado e permanecem em português.
- **A escolha do conjunto fica salva.** Para que o modo tradicional seja uma escolha, a primeira abertura passa a mostrar “Com Luminosos”.
- **Sessão retomada mantém a forma** com que começou, para o passo salvo continuar correto.
- **Mistérios pelo tempo litúrgico**: no modo tradicional, os domingos do Advento sugerem os Gozosos e os da Quaresma, os Dolorosos.
- **Página “Indulgências”**: o que são, as condições, como o Rosário se qualifica, as obras de cada dia e o calendário do ano, com a próxima data em destaque.
- Correções da revisão já feitas nesta branch: troca de duas obras, títulos em português, rótulo do mistério avulso, *Regina Caeli* até o sábado depois de Pentecostes, “Outra meditação” sem repetição e maior contraste do texto.

## Capabilities

### New Capabilities

- `indulgence-guide`: página explicativa e calendário de indulgências.

### Modified Capabilities

- `rosary-prayer`: anúncio, encerramento, formas das orações, seleção do conjunto, terço do dia e retomada.

## Fora do escopo

- Ladainha lauretana, cláusulas cristológicas e áudio da *Ave Regina Caelorum*.
- Tradução da interface e das meditações para o latim.
- Calendário do rito de 1962 com Septuagésima e transferências de festas.
- Rastrear ou afirmar que o usuário obteve uma indulgência.
- Datas próprias de cada diocese, igreja ou santuário.

## Impact

- **Domínio:** `fixedPrayers`, `buildPrayerSteps`, `mysteryTerco`, `incompleteRosarySession`, `prayerPreferences`; novos `prayerForm`, `mysteryFruits` e `indulgences`.
- **UI:** home, ajustes, tela de oração e nova rota `/indulgencias`.
- **Dados:** sem mudança de esquema no Supabase. A migração `20261123120000` leva as correções de obras e títulos.
- **Fontes:** *Manual of Indulgences* (4ª ed., 1999), concessões 2, 3, 7, 13, 17, 26, 28, 29 e 33, normas 18 a 22, e decreto da Penitenciaria Apostólica de 29/6/2002.
