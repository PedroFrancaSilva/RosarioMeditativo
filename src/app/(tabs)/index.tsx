import { useMysteries } from '@/features/rosary-prayer/hooks/useMysteries';
import type { MysteryType } from '@/domain/mystery';
import {
  groupMysteriesByTerco,
  liturgicalSundayNote,
  mysteryTypesForSet,
  tercoTypeForDate,
} from '@/domain/mysteryTerco';
import type { MysterySet, PrayerLanguage } from '@/domain/rosary/types';
import { completedCountLabel } from '@/domain/rosary/completionCount';
import { usePrayerPreferences } from '@/features/preferences/preferencesContext';
import { useCompletedCount } from '@/features/rosary-prayer/session/completionCounter';
import { ResumePrayerDialog } from '@/features/rosary-prayer/components/ResumePrayerDialog';
import { usePrayerStart } from '@/features/rosary-prayer/hooks/usePrayerStart';
import type { PrayerStartIntent } from '@/features/rosary-prayer/navigation/incompleteSessionLabel';
import { AppIcon } from '@/shared/components/AppIcon';
import { contemplative, contemplativeFonts } from '@/shared/constants/contemplative';
import { router, type Href } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomePrayerScreen() {
  const insets = useSafeAreaInsets();
  const { preferences, update } = usePrayerPreferences();
  const set = preferences.mysterySet;
  const setSet = (mysterySet: MysterySet) => update({ mysterySet });
  const setLanguage = (prayerLanguage: PrayerLanguage) => update({ prayerLanguage });
  const { data: mysteries, isLoading, isError } = useMysteries(set);

  const daySection = useMemo(() => {
    const sections = groupMysteriesByTerco(mysteries ?? [], set);
    const dayType = tercoTypeForDate(set, new Date());
    return sections.find((section) => section.type === dayType) ?? null;
  }, [mysteries, set]);
  const dayNote = liturgicalSundayNote(set, new Date());

  const { begin, continueSaved, startFresh, dismiss, dialogDescription } = usePrayerStart();
  const { data: completedCount } = useCompletedCount();

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
        <View style={styles.topBar}>
          <View style={styles.eyebrowRow}>
            <View style={styles.eyebrowRule} />
            <Text style={styles.eyebrow}>Rosário meditativo</Text>
          </View>
          <Pressable
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
            onPress={() => router.push('/ajustes' as Href)}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Ajustes">
            <AppIcon name="settings" size={20} color={contemplative.cream} />
          </Pressable>
        </View>
        <Text style={styles.title}>Ora et{'\n'}Contempla</Text>
        <Text style={styles.intro}>Um momento de silêncio, presença e oração.</Text>
        {completedCount ? (
          <Text style={styles.counter}>{completedCountLabel(completedCount)}</Text>
        ) : null}

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

        {set === 'classic' ? (
          <View style={styles.languageRow} accessibilityRole="radiogroup">
            <Text style={styles.languageLabel}>Orações em</Text>
            {(
              [
                { id: 'pt', label: 'Português' },
                { id: 'la', label: 'Latim' },
              ] as const
            ).map((option) => {
              const selected = preferences.prayerLanguage === option.id;
              return (
                <Pressable
                  key={option.id}
                  style={[styles.languageChip, selected && styles.languageChipActive]}
                  onPress={() => setLanguage(option.id)}
                  hitSlop={6}
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}>
                  <Text style={[styles.languageText, selected && styles.languageTextActive]}>
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ) : null}

        <Pressable
          style={({ pressed }) => [styles.completeCard, pressed && styles.pressed]}
          onPress={startFull}
          accessibilityRole="button">
          <View style={styles.cross}>
            <Text style={styles.crossMark}>✦</Text>
          </View>
          <View style={styles.completeCopy}>
            <Text style={styles.completeKicker}>Todos os mistérios</Text>
            <Text style={styles.completeTitle}>Rosário completo</Text>
            <Text style={styles.completeHint}>{mysteryTypesForSet(set).length * 5} mistérios</Text>
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
                <Text style={styles.days}>
                  {(dayNote ?? daySection.recommendedDays).toUpperCase()}
                </Text>
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
                  style={({ pressed }) => [styles.mysteryRow, pressed && styles.pressed]}
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
          style={({ pressed }) => [styles.chooseCard, pressed && styles.pressed]}
          onPress={() =>
            router.push({ pathname: '/meditation-coverage', params: { set } } as Href)
          }
          accessibilityRole="button">
          <AppIcon name="menu_book" size={20} color={contemplative.gold} />
          <View style={styles.completeCopy}>
            <Text style={styles.completeKicker}>Outro dia, outro terço</Text>
            <Text style={styles.chooseTitle}>Escolher um terço</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.chooseCard, styles.indulgenceCard, pressed && styles.pressed]}
          onPress={() => router.push('/indulgencias' as Href)}
          accessibilityRole="button">
          <Text style={styles.crossMark}>✦</Text>
          <View style={styles.completeCopy}>
            <Text style={styles.completeKicker}>Como obter e em quais dias</Text>
            <Text style={styles.chooseTitle}>Indulgências</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </Pressable>

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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(242,234,219,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
  chooseCard: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: contemplative.panelBorder,
  },
  indulgenceCard: {
    marginTop: 10,
  },
  languageRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  languageLabel: {
    flex: 1,
    color: contemplative.muted,
    fontFamily: contemplativeFonts.serifItalic,
    fontSize: 15,
  },
  languageChip: {
    minHeight: 34,
    justifyContent: 'center',
    paddingHorizontal: 13,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: contemplative.panelBorder,
  },
  languageChipActive: {
    borderColor: contemplative.gold,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  languageText: {
    color: contemplative.muted,
    fontFamily: contemplativeFonts.sans,
    fontSize: 13,
  },
  languageTextActive: {
    color: contemplative.cream,
    fontFamily: contemplativeFonts.sansSemi,
  },
  chooseTitle: {
    color: contemplative.cream,
    fontFamily: contemplativeFonts.serif,
    fontSize: 19,
    lineHeight: 23,
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
  counter: {
    marginTop: 10,
    color: contemplative.gold,
    fontFamily: contemplativeFonts.sansSemi,
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
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
