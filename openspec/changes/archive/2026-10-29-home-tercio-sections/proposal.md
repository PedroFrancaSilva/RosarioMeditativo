# Proposal

## Why

A home listava todos os mistérios numa única lista, sem refletir a divisão litúrgica em terços (Gozosos, Dolorosos, etc.).

## What Changes

- Home agrupa mistérios por terço, com título e contagem.
- Ação "Rezar este terço" (5 mistérios + abertura) por seção.
- Modo `tercio` na sessão de oração.
- Rótulos do segmento clássico/JP II mencionam quantidade de terços.

## Capabilities

### Modified Capabilities

- `rosary-prayer`: seleção na home e modo `tercio`.

## Impact

- `src/app/(tabs)/index.tsx`, `src/domain/mysteryTerco.ts`, `src/app/prayer/index.tsx`, `buildPrayerSteps`.
