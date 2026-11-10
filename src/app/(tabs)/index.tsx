import { useMysteries } from '@/features/rosary-prayer/hooks/useMysteries';
import type { MysteryType } from '@/domain/mystery';
import { groupMysteriesByTerco, tercoTypeForDate } from '@/domain/mysteryTerco';
import type { MysterySet } from '@/domain/rosary/types';
import { ChantToggle } from '@/features/chant/ChantToggle';
import { ResumePrayerDialog } from '@/features/rosary-prayer/components/ResumePrayerDialog';
import { usePrayerStart } from '@/features/rosary-prayer/hooks/usePrayerStart';
import type { PrayerStartIntent } from '@/features/rosary-prayer/navigation/incompleteSessionLabel';
import { contemplative, contemplativeFonts } from '@/shared/constants/contemplative';
import { router, type Href } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomePrayerScreen() {
  const insets = useSafeAreaInsets();
  const [set, setSet] = useState<MysterySet>('classic');
  const { data: mysteries, isLoading, isError } = useMysteries(set);

  const daySection = useMemo(() => {
    const sections = groupMysteriesByTerco(mysteries ?? [], set);
    const dayType = tercoTypeForDate(set, new Date());
    return sections.find((section) => section.type === dayType) ?? null;
  }, [mysteries, set]);

  const { begin, continueSaved, startFresh, dismiss, dialogDescription } = usePrayerStart();

  const beginPrayer = (intent: PrayerStartIntent) => {
    void begin(intent).then((result) => {
      if (result.kind === 'open') router.push(result.href);
    });
  };

  const startFull = () => {
    beginPrayer({ mode: 'full', set });
  };

  const startTerco = (type: MysteryType) => {
    beginPrayer({ mode: 'tercio', set, mysteryType: type });
  };

  const startSingle = (mysteryId: string) => {
    beginPrayer({ mode: 'single', set, mysteryId });
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingTop: insets.top + 28, paddingBottom: insets.bottom + 28 },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.eyebrowRow}>
          <View style={styles.eyebrowRule} />
          <Text style={styles.eyebrow}>Ora et contempla</Text>
        </View>
        <Text style={styles.title}>Rosário{'\n'}Meditativo</Text>
        <Text style={styles.intro}>Um momento de silêncio, presença e oração.</Text>

        <View style={styles.segment} accessibilityRole="tablist">
          <Pressable
            style={[styles.segmentButton, set === 'classic' && styles.segmentActive]}
            onPress={() => setSet('classic')}
            accessibilityRole="tab"
            accessibilityState={{ selected: set === 'classic' }}>
            <Text style={[styles.segmentText, set === 'classic' && styles.segmentTextActive]}>
              Tradicional
            </Text>
          </Pressable>
          <Pressable
            style={[styles.segmentButton, set === 'jp2' && styles.segmentActive]}
            onPress={() => setSet('jp2')}
            accessibilityRole="tab"
            accessibilityState={{ selected: set === 'jp2' }}>
            <Text style={[styles.segmentText, set === 'jp2' && styles.segmentTextActive]}>
              Com Luminosos
            </Text>
          </Pressable>
        </View>

        <Pressable style={styles.completeCard} onPress={startFull} accessibilityRole="button">
          <View style={styles.cross}>
            <Text style={styles.crossMark}>✦</Text>
          </View>
          <View style={styles.completeCopy}>
            <Text style={styles.completeKicker}>Todos os mistérios</Text>
            <Text style={styles.completeTitle}>Rosário completo</Text>
            <Text style={styles.completeHint}>Cerca de 45 minutos</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </Pressable>

        {isLoading && !daySection ? (
          <ActivityIndicator color={contemplative.gold} style={styles.loading} />
        ) : null}
        {isError ? (
          <Text style={styles.note}>Usando catálogo offline embutido.</Text>
        ) : null}

        {daySection ? (
          <View style={styles.daily}>
            <View style={styles.sectionLabel}>
              <Text style={styles.sectionLabelText}>Mistérios do dia</Text>
              <View style={styles.sectionRule} />
            </View>
            <View style={styles.dailyHeading}>
              <View style={styles.dailyTitles}>
                <Text style={styles.days}>{daySection.recommendedDays.toUpperCase()}</Text>
                <Text style={styles.dailyTitle}>{daySection.title}</Text>
              </View>
              <Pressable
                onPress={() => startTerco(daySection.type)}
                accessibilityRole="button"
                hitSlop={8}>
                <Text style={styles.prayLink}>Rezar este terço</Text>
              </Pressable>
            </View>
            <View style={styles.list}>
              {daySection.mysteries.map((mystery, index) => (
                <Pressable
                  key={mystery.id}
                  style={styles.mysteryRow}
                  onPress={() => startSingle(mystery.id)}
                  accessibilityRole="button">
                  <Text style={styles.number}>{index + 1}</Text>
                  <Text style={styles.mysteryName}>{mystery.name}</Text>
                  <Text style={styles.chevron}>›</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : null}

        <Pressable
          style={styles.coverageLink}
          onPress={() =>
            router.push({ pathname: '/meditation-coverage', params: { set } } as Href)
          }
          accessibilityRole="button">
          <Text style={styles.coverageText}>Escolher um terço</Text>
        </Pressable>

        <ChantToggle />

        <View style={styles.footer}>
          <View style={styles.footerRule} />
          <Text style={styles.footerQuote}>“Permanecei em mim”</Text>
          <View style={styles.footerRule} />
        </View>
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
  container: {
    paddingHorizontal: 25,
    gap: 0,
  },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    marginBottom: 14,
  },
  eyebrowRule: {
    width: 22,
    height: 1,
    backgroundColor: contemplative.gold,
  },
  eyebrow: {
    color: contemplative.gold,
    fontFamily: contemplativeFonts.sansSemi,
    fontSize: 10,
    letterSpacing: 1.9,
    textTransform: 'uppercase',
  },
  title: {
    color: contemplative.cream,
    fontFamily: contemplativeFonts.serif,
    fontSize: 54,
    lineHeight: 50,
    letterSpacing: -1.2,
  },
  intro: {
    maxWidth: 240,
    marginTop: 20,
    color: contemplative.muted,
    fontFamily: contemplativeFonts.serifItalic,
    fontSize: 16,
    lineHeight: 22,
  },
  segment: {
    flexDirection: 'row',
    marginTop: 31,
    padding: 4,
    borderWidth: 1,
    borderColor: contemplative.panelBorder,
    borderRadius: 14,
    backgroundColor: contemplative.segmentTrack,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: 'center',
  },
  segmentActive: {
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  segmentText: {
    color: contemplative.muted,
    fontFamily: contemplativeFonts.sans,
    fontSize: 13,
  },
  segmentTextActive: {
    color: contemplative.cream,
    fontFamily: contemplativeFonts.sansSemi,
  },
  completeCard: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: contemplative.panelBorder,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  cross: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: contemplative.goldFaint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossMark: {
    color: contemplative.gold,
    fontSize: 16,
  },
  completeCopy: {
    flex: 1,
    gap: 2,
  },
  completeKicker: {
    color: contemplative.muted,
    fontFamily: contemplativeFonts.sansSemi,
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  completeTitle: {
    color: contemplative.cream,
    fontFamily: contemplativeFonts.serif,
    fontSize: 22,
    lineHeight: 26,
  },
  completeHint: {
    color: contemplative.muted,
    fontFamily: contemplativeFonts.serifItalic,
    fontSize: 14,
  },
  chevron: {
    color: contemplative.muted,
    fontSize: 22,
    lineHeight: 24,
  },
  loading: {
    marginTop: 20,
  },
  note: {
    marginTop: 12,
    color: contemplative.muted,
    fontFamily: contemplativeFonts.sans,
    fontSize: 12,
  },
  daily: {
    marginTop: 28,
  },
  sectionLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionLabelText: {
    color: contemplative.gold,
    fontFamily: contemplativeFonts.sansSemi,
    fontSize: 10,
    letterSpacing: 1.9,
    textTransform: 'uppercase',
  },
  sectionRule: {
    flex: 1,
    height: 1,
    backgroundColor: contemplative.panelBorder,
  },
  dailyHeading: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 12,
  },
  dailyTitles: {
    flex: 1,
    gap: 2,
  },
  days: {
    color: contemplative.muted,
    fontFamily: contemplativeFonts.sans,
    fontSize: 11,
    letterSpacing: 1.2,
  },
  dailyTitle: {
    color: contemplative.cream,
    fontFamily: contemplativeFonts.serif,
    fontSize: 28,
    lineHeight: 32,
  },
  prayLink: {
    color: contemplative.gold,
    fontFamily: contemplativeFonts.serifItalic,
    fontSize: 15,
    textDecorationLine: 'underline',
    paddingBottom: 4,
  },
  list: {
    marginTop: 8,
  },
  mysteryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(242,234,219,0.12)',
  },
  number: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: contemplative.goldFaint,
    color: contemplative.gold,
    fontFamily: contemplativeFonts.serif,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 26,
  },
  mysteryName: {
    flex: 1,
    color: contemplative.cream,
    fontFamily: contemplativeFonts.serifRegular,
    fontSize: 17,
    lineHeight: 22,
  },
  coverageLink: {
    marginTop: 28,
    alignSelf: 'flex-start',
  },
  coverageText: {
    color: contemplative.gold,
    fontFamily: contemplativeFonts.serifItalic,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  footer: {
    marginTop: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  footerRule: {
    width: 28,
    height: 1,
    backgroundColor: 'rgba(242,234,219,0.2)',
  },
  footerQuote: {
    color: contemplative.muted,
    fontFamily: contemplativeFonts.serifItalic,
    fontSize: 14,
  },
});
