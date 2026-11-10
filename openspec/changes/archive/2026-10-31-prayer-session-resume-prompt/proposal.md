# Proposal

## Why

Hoje o progresso da oração vive só no `useRosarySession` enquanto a rota `/prayer` está montada. Ao voltar à seleção (`router.back()`), o índice do passo e a configuração da sessão somem; iniciar de novo recomeça do zero. Isso frustra quem interrompe o terço e quer retomar depois no mesmo ponto.

## What Changes

- Persistir localmente uma sessão **incompleta** (modo, conjunto, parâmetros de mistério, lista de IDs de mistérios e índice do passo) sempre que o usuário avança ou recua, e ao sair da tela de oração sem concluir.
- Limpar o rascunho salvo quando o usuário chega ao passo de **conclusão** ou escolhe **iniciar uma nova** oração no diálogo.
- Antes de abrir `/prayer` a partir da home, se existir sessão incompleta salva, mostrar um diálogo em pt-BR: **Continuar** (restaura o passo salvo) ou **Iniciar nova** (descarta o rascunho e abre a oração que o usuário acabou de escolher).
- Tratar snapshot inválido ou corrompido como ausência de sessão (fluxo normal, sem travar a seleção).

## Capabilities

### New Capabilities

_(nenhuma — o comportamento pertence ao fluxo de oração existente.)_

### Modified Capabilities

- `rosary-prayer`: persistência de sessão incompleta no dispositivo; diálogo de retomada ao tentar iniciar oração a partir da seleção; restauração do passo e limpeza ao concluir ou ao iniciar nova.

## Impact

- **Domínio / dados:** tipo serializável de snapshot de sessão; validação ao ler do armazenamento (`AsyncStorage`, alinhado a canto gregoriano e dev tools).
- **Features:** `useRosarySession` (estado inicial restaurado, gravação); camada de persistência em `src/features/rosary-prayer/` ou `src/data/`; interceptação em `src/app/(tabs)/index.tsx` (e helpers compartilhados se vários pontos de entrada chamarem `/prayer`).
- **UI:** modal ou `Alert` nativo com copy contemplativa; sem mudança no layout da `PrayerScreen` além de receber índice inicial opcional.
- **Fora do escopo:** sincronização entre dispositivos ou contas; retomada automática sem pergunta; múltiplas sessões salvas; persistir estado de “texto expandido” ou crop de imagem de dev; alterar o contador de rosários completos em `local-experience`.
