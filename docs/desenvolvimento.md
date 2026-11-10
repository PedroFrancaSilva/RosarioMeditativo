# Desenvolvimento

O que o código faz hoje e como subir o app. O comportamento de produto pretendido está em `openspec/specs/` e em `docs/project-spec.md`.

## Estado da implementação

| Área | Situação | Onde olhar |
|------|----------|------------|
| Shell Expo Router, abas e modal | Template inicial ainda na UI | `src/app/` |
| Fonte SpaceMono e splash até a fonte carregar | Implementado | `src/app/_layout.tsx` |
| Tema claro/escuro conforme o sistema | Implementado | `src/shared/components/useColorScheme.ts` |
| TanStack Query em memória (`staleTime` 60s, `retry` 1) | Implementado | `src/shared/providers/AppProviders.tsx` |
| Cliente Supabase | Exportado; nenhuma tela o importa | `src/data/api/supabaseClient.ts` |
| Tipos de conteúdo | Implementados | `src/domain/mystery.ts` |
| Schema Postgres e RLS de leitura `anon` | Migração inicial | `supabase/migrations/` |
| Fluxo de oração, áudio, contador, pacote offline | Fora do código de `src/` | `src/features/` e `src/data/repositories/` só têm `.gitkeep` |

`expo-av` e `@react-native-async-storage/async-storage` estão em `package.json` e não são importados em `src/`. As specs `rosary-prayer` e `local-experience` descrevem o alvo, não telas existentes.

As telas mostram "Tab One", "Tab Two" e "Modal". O texto pede para abrir `app/(tabs)/index.tsx` (e o equivalente de `two` e `modal`). Os arquivos estão em `src/app/`.

## Bootstrap

1. `src/app/_layout.tsx` chama `SplashScreen.preventAutoHideAsync()` ao carregar o módulo.
2. Carrega `assets/fonts/SpaceMono-Regular.ttf` como família `SpaceMono`. Falha no carregamento é relançada para o `ErrorBoundary` exportado de `expo-router`. Enquanto a fonte não carrega, o layout devolve `null` e a splash permanece.
3. Com a fonte pronta, a splash é escondida e a árvore monta `AppProviders` → `ThemeProvider` → `Stack`.
4. `unstable_settings.anchor` é `(tabs)`, para um reload em `/modal` manter o botão de voltar.
5. `useColorScheme` devolve `'dark'` quando o sistema está em dark. Qualquer outro valor do React Native vira `'light'`.

Rotas do file-based routing:

| Arquivo | Rota |
|---------|------|
| `src/app/(tabs)/index.tsx` | `/` |
| `src/app/(tabs)/two.tsx` | `/two` |
| `src/app/modal.tsx` | `/modal` (apresentação `modal`) |
| `src/app/+not-found.tsx` | rota desconhecida; link de volta para `/` |

O grupo `(tabs)` entra no stack com `headerShown: false`. O header de cada aba fica a cargo de `src/app/(tabs)/_layout.tsx`.

`app.json` liga `experiments.typedRoutes`, define `scheme` `rosariomeditativo` e, na web, bundler Metro com `output: "server"`. O alias TypeScript `@/*` aponta para `src/*` (`tsconfig.json`).

Na web, `useClientOnlyValue(false, true)` deixa `headerShown` falso no render do servidor e verdadeiro no cliente (`src/shared/components/useClientOnlyValue.web.ts`). No nativo, o hook devolve direto o valor de cliente (`useClientOnlyValue.ts`). O comentário no layout das abas liga isso a erro de hidratação do header.

`QueryClient` nasce uma vez no `useState` de `AppProviders`. Padrão das queries: `staleTime: 60_000` e `retry: 1`. Não há persister: o cache existe só enquanto o processo do app está aberto.

## Ambiente

- Node `>= 22.13.0`. `.nvmrc` fixa `22.13.0`. `package.json` declara `packageManager` `npm@10.9.9`.
- Instalar com `npm ci` (lockfile) ou `npm install`. Pacote do ecossistema Expo: `npx expo install <pacote>`.
- Scripts npm: `start`, `android`, `ios`, `web`, `openspec:check`. O repositório não inclui script `lint` nem config de ESLint.
- `npm run openspec:check` roda `openspec validate --all --strict --no-interactive`.

```bash
git clone https://github.com/PedroFrancaSilva/RosarioMeditativo.git
cd RosarioMeditativo
nvm use
npm ci
cp .env.example .env
npm start
```

`npm run android` e `npm run ios` são `expo start` com a plataforma. `ios/` e `android/` estão no `.gitignore` (Continuous Native Generation). Ajuste nativo em `app.json` e nos plugins.

## Variáveis `EXPO_PUBLIC_`

`src/data/api/supabaseClient.ts` lê, com acesso estático, `process.env.EXPO_PUBLIC_SUPABASE_URL` e `process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY`. No SDK 58 o Expo CLI embute variáveis com prefixo `EXPO_PUBLIC_` a partir dos `.env` no bundle do cliente. Elas aparecem em texto no aplicativo. A anon key é a chave pública do projeto Supabase; chave de serviço fica fora do app.

Em desenvolvimento o CLI carrega, nesta ordem de prioridade, `.env.development.local`, `.env.local`, `.env.development` e `.env` ([Environment variables in Expo](https://docs.expo.dev/guides/environment-variables/)). O `.gitignore` ignora `.env` e `.env*.local` e versiona `.env.example`.

Depois de mudar o `.env`, faça um reload completo do app. Se o valor antigo continuar no bundle, suba de novo com `npx expo start --clear`.

Com URL ou anon key ausente, o módulo exporta `supabase` como `null` e escreve no console:

```text
[supabase] EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY are not set. Remote content will be unavailable until configured.
```

O restante do app abre mesmo assim: nenhum outro arquivo importa esse módulo.

## Problemas frequentes

| O que acontece | O que o código faz | O que fazer |
|----------------|--------------------|-------------|
| Aviso `[supabase]` e sem conteúdo remoto | Uma das duas variáveis está vazia; o client fica `null` | Preencher `.env` a partir de `.env.example` e recarregar o app |
| `npm` recusa instalar por causa de `engines` | `package.json` exige Node `>= 22.13.0` | `nvm use` na raiz (`.nvmrc`) |
| A tela manda abrir `app/(tabs)/...` | String do template em `index.tsx`, `two.tsx` e `modal.tsx` | Editar o arquivo em `src/app/` |
| Insert pela anon key é recusado | A migração só cria policy `SELECT` para `anon` | Carregar linhas pelo SQL Editor; ver `docs/modelo-de-conteudo.md` |
| Procura da tela de oração, canto ou contador | Essas pastas de produto ainda estão vazias | Tratar `openspec/specs/` como alvo e `src/app/` como shell atual |

## Onde entra código novo

- Fluxo de produto em `src/features/`.
- Cliente e repositórios em `src/data/`.
- Tipos e regras em `src/domain/`.
- UI compartilhada e providers em `src/shared/`.
- Somente rotas em `src/app/`.

Comportamento novo segue OpenSpec (propose → apply → archive ou sync). As specs em `openspec/specs/` não são editadas direto para entregar funcionalidade.
