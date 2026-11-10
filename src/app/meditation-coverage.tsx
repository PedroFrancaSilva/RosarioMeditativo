import { TercoChoiceList } from '@/features/rosary-prayer/components/TercoChoiceList';
import { useMysteries } from '@/features/rosary-prayer/hooks/useMysteries';
import { usePrayerStart } from '@/features/rosary-prayer/hooks/usePrayerStart';
import { groupMysteriesByTerco, tercoTypeForDate } from '@/domain/mysteryTerco';
import type { MysterySet } from '@/domain/rosary/types';
import { ResumePrayerDialog } from '@/features/rosary-prayer/components/ResumePrayerDialog';
import { contemplative, contemplativeFonts } from '@/shared/constants/contemplative';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function readSet(value: string | string[] | undefined): MysterySet {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === 'jp2' ? 'jp2' : 'classic';
}

export default function MeditationCoverageScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ set?: string }>();
  const set = readSet(params.set);
  const { data: mysteries, isError } = useMysteries(set);
  const sections = useMemo(
    () => groupMysteriesByTerco(mysteries ?? [], set),
    [mysteries, set],
  );
  const dayType = tercoTypeForDate(set, new Date());
  const { begin, continueSaved, startFresh, dismiss, dialogDescription } = usePrayerStart();

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 28 },
        ]}>
        <Pressable onPress={() => router.back()} accessibilityRole="button" hitSlop={8}>
          <Text style={styles.back}>Voltar</Text>
        </Pressable>
        <Text style={styles.title}>Escolher um terço</Text>
        <TercoChoiceList
          sections={sections}
          offline={isError}
          dayType={dayType}
          onStartTerco={(mysteryType) => {
            void begin({ mode: 'tercio', set, mysteryType }).then((result) => {
              if (result.kind === 'open') router.push(result.href);
            });
          }}
        />
      </ScrollView>
      <ResumePrayerDialog
        description={dialogDescription}
        onContinue={() => {
          const href = continueSaved();
          if (href) router.push(href);
        }}
        onStartNew={() => {
          void startFresh().then((href) => {
            if (href) router.push(href);
          });
        }}
        onDismiss={dismiss}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: contemplative.background,
  },
  content: {
    paddingHorizontal: 25,
  },
  back: {
    color: contemplative.gold,
    fontFamily: contemplativeFonts.sansSemi,
    fontSize: 13,
  },
  title: {
    marginTop: 18,
    marginBottom: 22,
    color: contemplative.cream,
    fontFamily: contemplativeFonts.serif,
    fontSize: 32,
    lineHeight: 36,
  },
});
