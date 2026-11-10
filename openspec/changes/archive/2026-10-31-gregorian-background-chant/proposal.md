# Proposal

## Why

O requisito de canto gregoriano em `openspec/specs/local-experience/spec.md` ainda não tem player, faixa nem critério de licença. O fundo deve ser a antífona mariana do tempo litúrgico, a mesma que a Igreja canta no fim da oração da noite, e não uma trilha genérica. A melodia medieval é de domínio público; cada fonograma tem licença própria.

## What Changes

- Um interruptor opcional no menu principal, desligado por padrão, guarda a preferência do canto. Ao entrar na oração, se estiver ligado, toca em loop e em volume baixo a antífona mariana da data local, só com o app em primeiro plano. Ao voltar ao menu, o canto pausa e o interruptor permanece como estava.
- A data local, à meia-noite, escolhe: *Alma Redemptoris Mater* do 1º domingo do Advento até 2 de fevereiro; *Ave Regina caelorum* de 3 de fevereiro até o Sábado Santo; *Regina caeli* da Páscoa até Pentecostes; *Salve Regina* do dia seguinte a Pentecostes até a véspera do Advento. Páscoa e Advento seguem o calendário romano. Quinta, Sexta e Sábado Santos continuam na antífona pré-pascal, porque a *Regina caeli* só começa no domingo de Páscoa.
- Entram no pacote, sob CC BY-SA 3.0: *Salve Regina* dos Petits Chanteurs de Passy (ticket VRT `2012011510002954`) e *Alma Redemptoris Mater* de Rick Dechance, ambas no Wikimedia Commons. *Ave Regina caelorum* e *Regina caeli* só entram se aparecer gravação cantada com licença equivalente (CC0, domínio público, CC BY ou CC BY-SA). Sem essa gravação, esses dias tocam a *Salve Regina* e o crédito nomeia a *Salve Regina*.
- O crédito fica no menu principal, junto ao interruptor: intérprete, obra e licença. A tela de oração não mostra interruptor nem crédito.
- Se o áudio não carregar, a oração continua em silêncio e o interruptor informa que o canto não está disponível.

## Capabilities

### New Capabilities

_(nenhuma)_

### Modified Capabilities

- `local-experience`: o requisito “Gregorian background audio” em `openspec/specs/local-experience/spec.md` passa a exigir a antífona mariana da data, licença que permita embutir a fonograma, crédito da faixa que toca, recurso à *Salve Regina* quando faltar gravação, preferência persistida e falha que não interrompe a oração.

## Impact

- Função pura de calendário (Advento e Páscoa romanos) e catálogo das faixas disponíveis.
- Player em `src/shared/`, montado em `AppProviders` / `src/app/_layout.tsx`, para o áudio sobreviver à troca entre a seleção e `/prayer` e trocar de faixa quando a data muda.
- Interruptor e crédito na seleção (`src/app/(tabs)/index.tsx`). A oração (`PrayerScreen`) só avisa o provider de que a sessão começou, para tocar ou ficar em silêncio conforme a preferência.
- Assets locais em `assets/audio/`. Sem download de áudio.
- Dependência: `expo-audio` no SDK 58 (`npx expo install`). `expo-av` está no `package.json` e não é usado; o SDK 58 não o inclui mais. Esta change o substitui por `expo-audio`.
- `docs/project-spec.md` já aponta áudio para `expo-av`; a nota de stack precisa acompanhar a troca, sem virar requisito novo.

## Fora do escopo

- Áudio falado ou cantado das orações (Pai-Nosso, Ave-Maria, Glória). O texto na tela continua sendo o guia. `docs/project-spec.md` deixa o áudio da oração falada fora do MVP.
- Rosário cantado em tom de salmo, com antífonas por mistério (*Cantus Mariales* / *Cantus Selecti*). Escolher o canto à mão continua fora do MVP (“escolha de diferentes estilos de cantos”).
- Troca na hora das primeiras vésperas. A fronteira é a data local à meia-noite.
- Reprodução com o app em segundo plano, notificação de mídia ou controles na tela de bloqueio.
- Slider de volume, ou trilha ambiente que apenas imita canto (por exemplo Kevin MacLeod no Commons).
- Gravações com todos os direitos reservados (Solesmes, Decca e selos equivalentes), o acervo de gregorian-chant-hymns.com (uso pessoal ou paroquial, sem venda) e licenças não comerciais (CC BY-NC).
- Contador de rosários, cache do React Query e pacotes offline — os outros requisitos de `local-experience` permanecem como estão.
