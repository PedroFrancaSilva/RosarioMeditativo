# Tasks

## 1. Correções da revisão

- [x] 1.1 Trocar `sorrowful-2-1` e `joyful-2-4`, traduzir os títulos das obras e criar a migração `20261123120000`. Verificar com `npx tsc --noEmit`.
- [x] 1.2 Corrigir o rótulo do mistério avulso, a *Regina Caeli* e “Outra meditação”. Verificar com `npx jest`.

## 2. Domínio

- [x] 2.1 `prayerForm` e textos tradicionais e latinos em `fixedPrayers`. Verificar com `npx jest src/domain/rosary/fixedPrayers-test.ts`.
- [x] 2.2 `mysteryFruits`, anúncio com fruto, oração conclusiva e Fátima opcional em `buildPrayerSteps`. Verificar com `npx jest src/domain/rosary/buildPrayerSteps-test.ts`.
- [x] 2.3 Preferências com conjunto, idioma e Fátima; sessão salva com a forma. Verificar com `npx jest src/domain/preferences src/domain/rosary/incompleteRosarySession-test.ts`.
- [x] 2.4 Terço do dia pelo tempo litúrgico. Verificar com `npx jest src/domain/mysteryTerco-test.ts`.
- [x] 2.5 Conteúdo e calendário de indulgências. Verificar com `npx jest src/domain/indulgences-test.ts`.

## 3. Interface

- [x] 3.1 Home com conjunto salvo, idioma no modo tradicional, nota litúrgica e acesso às indulgências. Verificar na web em largura de celular.
- [x] 3.2 Seção “Rosário tradicional” nos Ajustes. Verificar na web.
- [x] 3.3 Oração com fruto, latim e tradução ao expandir. Verificar na web percorrendo um terço.
- [x] 3.4 Rota `/indulgencias`. Verificar na web em largura de celular.

- [x] 3.5 Texto expandido sem corte, rolagem visível, passo novo no topo. Verificar na web em todos os tamanhos de texto.
- [x] 3.6 Remover o tempo estimado e nomear a conclusão. Verificar com `npx jest src/features/rosary-prayer`.
- [x] 3.7 Painel escuro atrás da passagem e do comentário. Verificar com `npx jest src/features/rosary-prayer/components/MeditationBlock-test.tsx` e na web sobre uma obra clara.

## 4. Fechamento

- [x] 4.1 Rodar `npx jest`, `npx tsc --noEmit`, lint e `openspec validate traditional-rosary-and-indulgences --strict`.
