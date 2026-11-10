import { PrayerScreen } from '@/features/rosary-prayer/components/PrayerScreen';
import { useMysteries } from '@/features/rosary-prayer/hooks/useMysteries';
import { usePersistRosarySession } from '@/features/rosary-prayer/hooks/usePersistRosarySession';
import { useRosarySession } from '@/features/rosary-prayer/hooks/useRosarySession';
import {
  getEmbeddedCatalog,
  getEmbeddedMysteryById,
} from '@/data/repositories/mysteryRepository';
import type { MysteryType } from '@/domain/mystery';
import { filterMysteriesByType } from '@/domain/mysteryTerco';
import type { MysterySet, RosaryMode } from '@/domain/rosary/types';
import { contemplative, contemplativeMotion } from '@/shared/constants/contemplative';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

function parseSet(value: string | string[] | undefined): MysterySet {
  return value === 'jp2' ? 'jp2' : 'classic';
}

function parseMode(value: string | string[] | undefined): RosaryMode {
  if (value === 'single') return 'single';
  if (value === 'tercio') return 'tercio';
  return 'full';
}

const MYSTERY_TYPES: MysteryType[] = ['joyful', 'sorrowful', 'glorious', 'luminous'];

function parseMysteryType(value: string | string[] | undefined): MysteryType | undefined {
  if (typeof value !== 'string') return undefined;
  return MYSTERY_TYPES.includes(value as MysteryType) ? (value as MysteryType) : undefined;
}

function parseStepIndex(value: string | string[] | undefined): number | undefined {
  if (typeof value !== 'string') return undefined;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 0) return undefined;
  return parsed;
}

export default function PrayerRoute() {
  const params = useLocalSearchParams<{
    mode?: string;
    set?: string;
    mysteryId?: string;
    mysteryType?: string;
    stepIndex?: string;
  }>();

  const mode = parseMode(params.mode);
  const set = parseSet(params.set);
  const mysteryId = typeof params.mysteryId === 'string' ? params.mysteryId : undefined;
  const mysteryType = parseMysteryType(params.mysteryType);
  const initialStepIndex = parseStepIndex(params.stepIndex);

  const { data: remoteCatalog, isLoading: mysteriesLoading } = useMysteries(set);

  const sessionConfig = useMemo(() => {
    const catalog = remoteCatalog ?? getEmbeddedCatalog(set);
    if (mode === 'single' && mysteryId) {
      const mystery =
        catalog.find((m) => m.id === mysteryId) ?? getEmbeddedMysteryById(mysteryId);
      if (mystery) {
        return { mode, set, mysteries: [mystery] };
      }
    }
    if (mode === 'tercio' && mysteryType) {
      const subset = filterMysteriesByType(catalog, mysteryType);
      if (subset.length > 0) {
        return { mode: 'tercio' as const, set, mysteries: subset };
      }
    }
    return { mode: 'full' as const, set, mysteries: catalog };
  }, [remoteCatalog, mode, set, mysteryId, mysteryType]);

  const session = useRosarySession(sessionConfig, { initialStepIndex });

  usePersistRosarySession(sessionConfig, session.stepIndex, session.currentStep);

  if (mysteriesLoading && !remoteCatalog) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={contemplative.gold} />
        <Text style={styles.errorText}>Carregando mistérios…</Text>
      </View>
    );
  }

  if (!session.currentStep) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={contemplative.gold} />
        <Text style={styles.errorText}>Preparando oração…</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: 'transparentModal',
          animation: 'none',
          animationDuration: contemplativeMotion.screen,
          gestureEnabled: false,
          contentStyle: { backgroundColor: 'transparent' },
        }}
      />
      <PrayerScreen
        presentation={session.presentation}
        persistentMysteryLabel={session.persistentMysteryLabel}
        activeMysteryType={session.activeMystery?.type}
        activeMysterySortOrder={session.activeMystery?.sortOrder}
        progress={session.progress}
        canGoNext={session.canGoNext}
        canGoPrevious={session.canGoPrevious}
        canSkipToNextMystery={session.canSkipToNextMystery}
        onNext={session.next}
        onPrevious={session.previous}
        onSkipToNextMystery={session.skipToNextMystery}
      />
    </>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: contemplative.background,
    gap: 12,
  },
  errorText: { color: contemplative.cream },
});
