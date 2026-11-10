# Design

## Context

Não há player nem asset de áudio em `src/`. `expo-av` está no `package.json` e não é importado. O app usa Expo SDK 58; a API de reprodução desse SDK é `expo-audio` (`useAudioPlayer`, `player.loop`, `player.volume`, `setAudioModeAsync`). A seleção e `/prayer` são rotas diferentes. `AppProviders` permanece montado nas duas. Não há cálculo de Advento nem de Páscoa no código; `tercoTypeForDate` só escolhe o terço pelo dia da semana. Ver `proposal.md` e o delta em `specs/local-experience/spec.md`.

As quatro melodias são medievais e estão em domínio público. A fonograma é outro direito. Duas gravações no Commons já passam no critério: `Petits Chanteurs de Passy - Salve Regina de Hermann Contract.ogg` (VRT `2012011510002954`, `{{cc-by-sa-3.0,2.5,2.0,1.0}}` e `{{GFDL-1.2}}`) e `Alma Redemptoris Mater.ogg` (Rick Dechance, CC BY-SA 3.0, com ajuste posterior de volume na própria página). Não há canto gregoriano cantado de *Ave Regina caelorum* nem de *Regina caeli* nessa categoria com licença que autorize o app.

## Goals / Non-Goals

**Goals:**

- Uma função pura da data local para a antífona, e um catálogo que só lista arquivo embutido.
- Um provider estável, que troca a faixa quando a data muda e mantém o interruptor.
- Crédito da faixa que está tocando.

**Non-Goals:**

- Plugin `enableBackgroundPlayback`, `setActiveForLockScreen` e notificação de mídia.
- Tela de ajustes, slider, ou a rota modelo `(tabs)/two`.
- Editar a interpretação (corte, reverb, mix).
- Gravar as duas antífonas que faltam. Sem arquivo autorizado, o catálogo não as lista.

## Decisions

### 1. Calendário romano pela data local

A função recebe o ano, o mês e o dia no fuso do aparelho e devolve `alma`, `ave-regina`, `regina-caeli` ou `salve`. Meia-noite local é a fronteira. Páscoa pelo cômputo gregoriano ocidental (algoritmo anônimo de Meeus/Jones/Butcher). Pentecostes é Páscoa + 49 dias. O 1º domingo do Advento é 25 de dezembro menos 28 dias se o Natal cai num domingo, e menos `21 + dia da semana do Natal` nos outros casos (domingo = 0).

Janelas, todas inclusive:

- `alma`: do 1º domingo do Advento até 2 de fevereiro
- `ave-regina`: de 3 de fevereiro até o Sábado Santo
- `regina-caeli`: do domingo de Páscoa até Pentecostes
- `salve`: do dia seguinte a Pentecostes até a véspera do Advento

Quinta, Sexta e Sábado Santos ficam em `ave-regina`. O Ofício encerra essa antífona na quarta-feira; estender até o Sábado Santo evita três dias sem antífona mariana e segura a *Regina caeli* para o domingo.

Datas que o teste deve travar: 2026-02-02 `alma`; 2026-02-03 `ave-regina`; 2026-04-04 `ave-regina`; 2026-04-05 `regina-caeli`; 2026-05-24 `regina-caeli`; 2026-05-25 `salve`; 2026-11-28 `salve`; 2026-11-29 `alma`; 2022-11-27 `alma`; 2028-12-02 `salve`; 2028-12-03 `alma`.

### 2. Catálogo: duas faixas certas, duas opcionais

O app adota a CC BY-SA 3.0 em cada arquivo multi-licença. O arquivo entra como dado separado, sem remix.

| Id | Arquivo | Crédito |
| --- | --- | --- |
| `salve` | `assets/audio/salve-regina.mp3` | Salve Regina — Les Petits Chanteurs de Passy. CC BY-SA 3.0. |
| `alma` | `assets/audio/alma-redemptoris-mater.mp3` | Alma Redemptoris Mater — Rick Dechance. CC BY-SA 3.0. |

Cada crédito guarda também a URL da licença e a URL da página do arquivo no Commons. O MP3 é o que o Commons já transcodificou; `expo-audio` no SDK 58 documenta `require()` de `.mp3`.

`ave-regina` e `regina-caeli` só existem no catálogo se a tarefa de busca achar canto gregoriano cantado sob CC0, domínio público, CC BY ou CC BY-SA, com direito de distribuir no app. Fora isso: gregorian-chant-hymns.com, Solesmes, Decca, CC BY-NC, MIDI e o sino `Salve Regina.ogg`.

`resolveChant(antiphon, catalog)` devolve a faixa pedida quando ela está no catálogo. Caso contrário devolve `salve`. O crédito segue essa faixa devolvida. Sem a *Salve Regina* licenciada, a change para: ela é o recurso das outras.

### 3. Player no provider raiz, com `expo-audio`

`npx expo install expo-audio`. Remover `expo-av`. Atualizar a linha de áudio em `docs/project-spec.md` e no README.

Um provider dentro de `AppProviders` segura um `useAudioPlayer`. O hook desmonta com o componente; por isso o provider fica acima do stack. `player.loop = true`. Volume fixo `0.22`. `setAudioModeAsync({ playsInSilentMode: true, shouldPlayInBackground: false, interruptionMode: 'mixWithOthers' })`.

A fonte é a faixa resolvida para a data local. Ao cruzar a meia-noite, ou ao voltar a `active`, o provider compara a data e troca a fonte se a antífona mudou, sem desligar o interruptor. `replace` / nova fonte da API do SDK 58; se a troca exigir recriar o player, o provider continua montado e a preferência não volta para desligado.

`AppState`: em `background` ou `inactive`, `player.pause()`; ao voltar a `active`, `player.play()` só se a preferência estiver ligada e a tela de oração ainda estiver aberta. No menu o canto fica em pausa. `setIsAudioActiveAsync(false)` desliga o subsistema inteiro; a pausa do player basta.

`useAudioPlayerStatus` alimenta “canto indisponível”. Ligar o interruptor nesse estado não navega, não bloqueia o passo e não deixa o controle em loading eterno.

### 4. Preferência em AsyncStorage, padrão desligado

Chave própria, valor `'1'` / `'0'`, no estilo de `useDevToolsEnabled`. Leitura na montagem, antes de dar play. Ausência ou valor ilegível contam como desligado. A data não entra na preferência: ela se calcula de novo a cada abertura.

### 5. Interruptor e crédito só no menu principal

Na seleção, acima do rodapé “Permanecei em mim”: rótulo, interruptor e o crédito da faixa da data, numa ou duas linhas. A oração não monta esse bloco. Ao montar `PrayerScreen`, o provider marca a sessão como oração e aplica `shouldPlayChant`; ao desmontar, pausa sem gravar o interruptor como desligado. Cor e tipo seguem `contemplative`.

## Risks / Trade-offs

- [CC BY-SA tratada como obra derivada do app] → Arquivo sem remix, crédito visível e link da licença. A change não relicencia o código.
- [Páscoa ou Advento calculados errado] → Testes nas datas da decisão 1, inclusive os extremos de 2022 e 2028.
- [Quaresma e Páscoa soando *Salve Regina* até haver gravação] → O crédito nomeia a Salve. A spec já cobre esse recurso.
- [Loop curto num rosário longo] → Aceito. Não há rodízio dentro da mesma estação.
- [A licença da página do Commons muda antes do apply] → A tarefa relê o wikitext. *Salve* inválida interrompe a change. *Alma* inválida sai do catálogo e cai no recurso da *Salve*.
- [Web e Android tratam o foco de áudio de modo diferente] → Critério manual no Android primeiro. `mixWithOthers` evita tomar o áudio de outro app.

## Migration Plan

Não há dado de usuário para migrar: a chave ainda não existe e o padrão é silêncio. Rollback é remover o provider, os assets e `expo-audio`. `expo-av` só volta ao `package.json` se outro código passar a precisar dele — hoje ninguém precisa.
