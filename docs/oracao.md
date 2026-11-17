# Oração, conteúdo e canto

Mapa da implementação atual. Comportamento normativo continua em `openspec/specs/` (`rosary-prayer`, `meditation-content`, `local-experience`). Curadoria de um pacote novo: skill `meditation-content-package`.

## Rotas

| Rota | Papel |
|------|--------|
| `src/app/(tabs)/index.tsx` | Início: conjunto tradicional ou com luminosos, terço do dia, um mistério, canto |
| `src/app/meditation-coverage.tsx` | Lista os terços do conjunto (`?set=classic` ou `jp2`) |
| `src/app/prayer/index.tsx` | Sessão. Params: `mode`, `set`, `mysteryId`, `mysteryType`, `stepIndex` |
| `src/app/(tabs)/two.tsx` e `src/app/modal.tsx` | Telas do template Expo; a barra de abas fica oculta no início |

`AppProviders` monta o `QueryClient` (`staleTime` 60 s, `retry` 1) e o `ChantProvider`. A rota `/prayer` é um modal transparente sem gesto de dismiss; a saída é o botão de voltar.

## Sessão

Três modos (`RosaryMode` em `src/domain/rosary/types.ts`):

| Modo | Quem monta | Passos (`buildPrayerSteps`) |
|------|------------|------------------------------|
| `full` | Catálogo do conjunto | Abertura, cada mistério (anúncio + década), encerramento, conclusão |
| `tercio` | Mistérios de um `MysteryType` | Igual ao completo, só com esse terço |
| `single` | Um `mysteryId` | Só anúncio + década + conclusão. Sem abertura nem Salve Rainha |

Conjuntos: `classic` (gozosos, dolorosos, gloriosos) e `jp2` (inclui luminosos). O terço do dia está em `tercoTypeForDate` (`src/domain/mysteryTerco.ts`): `date.getDay()` com domingo = 0.

Uma década é Pai-Nosso (`hailMaryIndex` 0), dez Ave-Marias (1–10), Glória e oração de Fátima. A meditação (passagem + comentário) aparece no **anúncio** do mistério, não em cada Ave-Maria.

Navegação (`useRosarySession`):

- Avançar e voltar mudam `stepIndex`. No passo `completion` os dois ficam bloqueados.
- Deslizar: `translationX` menor que −40 avança; maior que 40 volta. O pan só ativa depois de 24 px. Um avanço trava por `contemplativeMotion.advanceLock` (260 ms).
- “Próximo mistério” salta para o próximo passo `mystery-announcement`. Some quando não há outro anúncio à frente (inclui o mistério único e o último do terço).

### Retomar

Qualquer início (`usePrayerStart` → `startPrayerWithResumeCheck`) lê a sessão incompleta. Se existir, o diálogo oferece continuar **aquela** sessão ou começar a intenção nova. “Começar de novo” apaga o snapshot antes de abrir.

Gravação (`usePersistRosarySession`):

- Chave `@rosario/incomplete-session`, debounce de 300 ms, e de novo ao desmontar a rota se não estiver na conclusão.
- Há uma cópia em memória: o diálogo pode aparecer antes do disco terminar.
- No passo `completion` a chave é apagada.
- `schemaVersion` tem de ser `1`. JSON inválido é removido. `stepIndex` na conclusão, ou um id que não existe no catálogo embutido, invalida o snapshot.

O snapshot guarda slugs embutidos (`joyful-1`), mesmo quando o catálogo remoto usa UUID. A retoma reconstrói a sessão com `getEmbeddedCatalog`.

## Catálogo e meditação

`useMysteries` pede `fetchMysteriesBySet`. Sem as duas variáveis `EXPO_PUBLIC_SUPABASE_*`, o cliente é `null` e o app usa o catálogo embutido (`mysteryRepository.ts`), com `meditationReady: true` em todos. Com cliente configurado, erro ou lista vazia **lança**; a query fica `isError` e a UI cai no catálogo embutido (`data ?? getEmbeddedCatalog`). A frase “Usando catálogo offline” na home só aparece nesse erro — não quando o Supabase simplesmente não está configurado.

Slug de conteúdo: `{type}-{sortOrder}` (`joyful-1`). `resolveMysteryContentTarget` exige `mysteryId` e os hints `type` + `sortOrder`; sem isso a query de meditação nem corre.

`fetchMysteryMeditationBundle` busca remoto e embutido em paralelo e aplica `preferRemoteList`: lista remota não vazia ganha; caso contrário fica o embutido.

| Parte | Embutido | Remoto ganha quando |
|-------|----------|---------------------|
| Passagens | `CURATED_MEDITATIONS[slug].passages` (2–3 por mistério, texto verbatim de Matos Soares). Slug ausente desse mapa usa `supabase/seed/passages-matos-soares.json` | `passages` do `mystery_id` não vazio |
| Comentários | Os de cada passagem do JSON curado, com `passageId` `embedded-passage-<slug>-<índice>` | Há pelo menos um comentário remoto cujo `passage_id` está nas passagens **já escolhidas**. Comentário sem `passage_id` é descartado (`toCommentary`) |
| Imagens | Galeria em `prayerAssets.ts` (`url` vazio; o fundo usa o `require` local) | A lista `images` do mistério não é vazia: entra no bundle no lugar da galeria. O fundo usa `{ uri }` só quando `url` tem texto; senão mostra o ficheiro embutido do mesmo índice (ou o fundo padrão) |
| Aprofundar | Só `joyful-1` tem uma referência embutida | `deeper_references` não vazio |
| Rotação | `rotateEveryNHailMarys` da galeria, senão 2 | O primeiro valor não nulo nas imagens **remotas**, mesmo que a galeria embutida seja a que aparece |

Sorteio (`drawMeditationPair`): uma passagem ao acaso e um comentário **dessa** passagem. O par é redesenhado quando a lista de ids de passagem muda. “Outra meditação” (`drawAnother`) sorteia outro par entre todos os pares passagem + comentário do mistério, nunca o atual, e só aparece com mais de um par.

Índice da obra (`mysteryGalleryImageIndex`): uma imagem → sempre 0. Ave-Maria *n* → `floor((n - 1) / every)`, limitado à última. Glória e Fátima mostram a última. Fora da década, a primeira. Movimento padrão em `src/domain/artworkMotion.ts` (escala 1 → 1,045 em 18 s); não há zoom por imagem.

RLS nas tabelas de conteúdo é leitura `anon`. Não há bucket de Storage nem políticas de escrita no app.

## Canto

`ChantProvider` (`expo-audio`) só toca se as quatro condições de `shouldPlayChant` forem verdade: interruptor ligado, ecrã de oração montado (`useChantDuringPrayer`), app em primeiro plano, faixa carregada. `playsInSilentMode: true`, `shouldPlayInBackground: false`, `interruptionMode: 'mixWithOthers'`. O ganho do player é 1 (volume do aparelho). Em SSR web o provider não cria player.

Preferência em `@rosario/chant-enabled`: `'1'` ligado, qualquer outro valor desligado. O default antes da leitura é desligado. A spec pede volume baixo; o player fica em ganho 1 e o volume é o do aparelho.

Antífona do dia (`marianAntiphonForDate`, calendário local):

| Período | Id |
|---------|-----|
| Do 1.º domingo do Advento a 2 de fevereiro | `alma` |
| De 3 de fevereiro ao Sábado Santo | `ave-regina` |
| Da Páscoa a Pentecostes (Páscoa + 49 dias) | `regina-caeli` |
| Resto do ano | `salve` |

Ficheiros em `assets/audio/`: Alma, Regina caeli, Salve Regina. **Ave Regina caelorum não está no pacote**; `resolveChant` cai na Salve. A troca de dia recalcula à meia-noite local e quando o app volta a `active`.

## Persistência local

| Chave | Conteúdo |
|-------|----------|
| `@rosario/incomplete-session` | Snapshot da oração (`schemaVersion` 1) |
| `@rosario/chant-enabled` | `'1'` ou `'0'` |
| `@rosario/preferences` | Ajustes (`schemaVersion` 1): tamanho do texto, vibração, Ave-Marias iniciais, lembrete |
| `@rosario/completed-tercos` | Contador de terços (número inteiro) |
| `@rosario/dev/tools-enabled` | Painel de crop. Só é lido com `__DEV__` |
| `@rosario/dev/mystery-image-crop/…` | Ajuste de crop do dev |

Não há `expo-sqlite`. A spec `local-experience` ainda descreve um download de pacote no primeiro arranque e uma ação explícita de offline; o código usa o JSON embutido e não faz esse download.

## Ajustes, contador e lembrete

- `PreferencesProvider` lê `@rosario/preferences`; componentes usam `usePrayerPreferences` (de `preferencesContext.ts`, sem AsyncStorage). A rota `/prayer` espera essa leitura antes de montar a sessão, porque os passos (frases das Ave-Marias iniciais) fixam-se ao montar.
- Ave-Marias iniciais: `openingIntentions` no `RosarySessionConfig`; padrão fé/esperança/caridade, opção Angelus (`buildPrayerSteps`).
- Contador (`completionCounter.ts`): soma no passo `completion`, uma vez por montagem. Terço = 1; rosário completo = um por conjunto; mistério avulso = 0.
- Vibração (`hapticCueForStep` + `playHapticCue`): só ao avançar ou em “Próximo mistério”. Glória com `mysteryId` = fim de dezena.
- Lembrete (`dailyReminder.ts`): trigger `DAILY` local, canal Android `daily-reminder`, id fixo `daily-rosary-reminder`. Precisa de development build com o plugin `expo-notifications`.
- `useKeepAwake` na `PrayerScreen`.

## Onde mexer

| Intenção | Sítio |
|----------|--------|
| Texto fixo das orações | `src/domain/rosary/fixedPrayers.ts` |
| Ordem dos passos | `src/domain/rosary/buildPrayerSteps.ts` |
| Novo pacote de meditação | JSON em `src/data/content/`, entrada em `curatedMeditations.ts`, galeria, migration. Ver a skill |
| Dias do terço | `src/domain/mysteryTerco.ts` |
| Calendário do canto | `src/domain/chant/marianAntiphon.ts` e `chantAssets.ts` |

Testes ao lado do código (`*-test.ts`, `*-test.tsx`): `npm test`. Tipos: `npx tsc --noEmit`. Specs: `npm run openspec:check`.

## Armadilhas

- Passagens remotas sem comentários ligados a esses ids deixam a meditação **sem** comentário: o fallback embutido também é filtrado pelos ids já escolhidos, e os ids embutidos (`embedded-passage-…`) não coincidem com UUIDs.
- Uma lista remota de imagens, mesmo com `url` vazio, substitui a galeria no bundle e define quantos índices a rotação tem. O píxel remoto só entra quando `url` tem texto; caso contrário o fundo volta ao `require` local daquele índice.
- `meditation_ready` no SQL não escolhe o texto da oração. O que entra no sorteio é o bundle (remoto ou curado). No catálogo embutido a flag está sempre `true`.
- Aplicar só `20251029000000_initial_content_schema.sql` deixa o remoto sem `passage_id`, `meditation_ready` e as colunas de apresentação da imagem. O app precisa da sequência inteira em `supabase/migrations/`.
- Retomar uma sessão gravada com um catálogo remoto diferente pode falhar a validação se o slug embutido não existir em `EMBEDDED_MYSTERIES`.
- `src/app/(tabs)/two.tsx` ainda é a tab do template. Não é o fluxo de oração.
