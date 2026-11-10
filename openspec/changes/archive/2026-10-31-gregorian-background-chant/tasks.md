# Tasks

## 1. Faixas e crédito

- [x] 1.1 Confirmar de novo o wikitext de `File:Petits_Chanteurs_de_Passy_-_Salve_Regina_de_Hermann_Contract.ogg`: ainda precisa constar `cc-by-sa-3.0` e o ticket `2012011510002954`. Baixar o MP3 já transcodificado para `assets/audio/salve-regina.mp3`, sem corte nem remix. Se a licença não for mais essa, parar esta change e não substituir a faixa. Verificar que o arquivo existe, dura perto de 3 min, e que o crédito de `salve` nomeia Les Petits Chanteurs de Passy, Salve Regina, CC BY-SA 3.0, a URL da licença e a URL da página.
- [x] 1.2 Confirmar o wikitext de `File:Alma_Redemptoris_Mater.ogg`: CC BY-SA 3.0 e intérprete Rick Dechance. Baixar o MP3 transcodificado para `assets/audio/alma-redemptoris-mater.mp3`, sem corte nem remix. Se a licença não qualificar, não embutir o arquivo e deixar `alma` fora do catálogo. Verificar que, com licença válida, o arquivo existe e o crédito nomeia Rick Dechance, Alma Redemptoris Mater e CC BY-SA 3.0.
- [x] 1.3 Procurar canto gregoriano cantado de *Ave Regina caelorum* e de *Regina caeli* sob CC0, domínio público, CC BY ou CC BY-SA que permita distribuir no app. Recusar gregorian-chant-hymns.com, Solesmes, Decca, CC BY-NC, MIDI e gravação de sino. Se achar, embutir com crédito no mesmo formato. Se não achar, o catálogo fica sem esses ids. Verificar que cada id do catálogo tem arquivo em disco e que `ave-regina` e `regina-caeli` só aparecem quando o arquivo foi aceito.

## 2. Dependência de áudio

- [x] 2.1 Instalar `expo-audio` com `npx expo install expo-audio`, remover `expo-av` do `package.json`, e trocar a menção a `expo-av` em `docs/project-spec.md` e no README pela de `expo-audio`. Verificar que `npx expo-doctor` termina sem erro de dependência e que nenhum arquivo em `src/` importa `expo-av`.

## 3. Calendário, preferência e player

- [x] 3.1 Implementar a função pura da data local (Advento e Páscoa romanos, janelas da decisão 1 do design, inclusive Quinta a Sábado Santo em `ave-regina`) e `resolveChant` com recurso à `salve` quando o id não está no catálogo. Cobrir 2026-02-02, 2026-02-03, 2026-04-04, 2026-04-05, 2026-05-24, 2026-05-25, 2026-11-28, 2026-11-29, 2022-11-27, 2028-12-02 e 2028-12-03, mais o recurso quando `ave-regina` ou `regina-caeli` faltam. Verificar que `npm test` desse arquivo passa.
- [x] 3.2 Extrair a leitura da preferência (`'1'`, `'0'`, ausente ou ilegível) e a decisão de tocar (interruptor ligado, app em primeiro plano, faixa carregada). Cobrir primeiro uso em silêncio, reidratação ligada e desligada, valor ilegível como desligado, e pausa com o interruptor ainda ligado quando o app não está ativo. Verificar que `npm test` desse arquivo passa.
- [x] 3.3 Montar um provider em `AppProviders` com `useAudioPlayer` da faixa resolvida para a data local, `loop` ligado, volume `0.22`, `setAudioModeAsync({ playsInSilentMode: true, shouldPlayInBackground: false, interruptionMode: 'mixWithOthers' })`, pausa via `AppState` sem gravar o interruptor como desligado, troca de fonte ao cruzar a meia-noite ou ao voltar a `active` se a antífona mudou, e texto de indisponível quando a faixa não carrega. A preferência vai para AsyncStorage na troca. Verificar no código que o plugin `enableBackgroundPlayback` e `setActiveForLockScreen` não entram, e que `npx tsc --noEmit` passa.

## 4. Interruptor nas duas telas

- [x] 4.1 Colocar o mesmo bloco (rótulo, interruptor, crédito numa linha) na seleção, acima de “Permanecei em mim”. O crédito é o da faixa resolvida. Com a faixa indisponível, o bloco mostra que o canto não está disponível. Verificar com teste de componente que Alma em execução nomeia Rick Dechance e que o recurso da Salve nomeia Les Petits Chanteurs de Passy, e que `npm test` desse arquivo passa.
- [x] 4.2 Tirar o interruptor e o crédito de `PrayerScreen`, devolvendo o espaçador do cabeçalho. Ao montar a oração, tocar só se o interruptor do menu estiver ligado; ao desmontar, pausar sem desligar a preferência. No menu, com o interruptor ligado, o canto permanece em silêncio. Verificar que `shouldPlayChant` cobre esses casos, que `PrayerScreen` não importa `ChantToggle`, e que `npm test` desses arquivos passa.

## 5. Verificação de integração

- [x] 5.1 Rodar `npx tsc --noEmit`, `npm test` e `npm run openspec:check`. Verificar que os três passam.
- [x] 5.2 No aparelho ou emulador Android, com a data real em tempo comum (por exemplo 30 de outubro de 2026): o menu mostra o interruptor e o crédito de Passy, e a oração não mostra nenhum dos dois. Primeira abertura em silêncio; ligar no menu não toca; entrar na oração ouve a Salve Regina em loop baixo; o texto do passo continua na tela; voltar ao menu pausa e o interruptor segue ligado; sair do app na oração pausa; voltar retoma; reabrir restaura ligado e desligado. Verificar esses pontos na sessão manual. As outras estações ficam cobertas pelo teste de 3.1.

## Workflow follow-up

- Arquivar a change depois da revisão. O merge em `openspec/specs/local-experience/spec.md` fica a cargo do archive, não de uma edição direta.
