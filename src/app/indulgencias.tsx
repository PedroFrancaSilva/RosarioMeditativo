import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo, type ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { civilDateFromLocal } from '@/domain/chant/marianAntiphon';
import {
  currentOrNextIndulgenceDays,
  formatIndulgenceDate,
  INDULGENCE_GUIDE,
  upcomingIndulgenceDays,
  type IndulgenceDay,
} from '@/domain/indulgences';
import { usePrayerPreferences } from '@/features/preferences/preferencesContext';
import { AppIcon } from '@/shared/components/AppIcon';
import { contemplative, contemplativeFonts } from '@/shared/constants/contemplative';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionLabel} accessibilityRole="header">
        <Text style={styles.sectionLabelText}>{title}</Text>
        <View style={styles.sectionRule} />
      </View>
      {children}
    </View>
  );
}

function Bullets({ items, scale }: { items: readonly string[]; scale: number }) {
  return (
    <View style={styles.bullets}>
      {items.map((item) => (
        <View key={item} style={styles.bulletRow}>
          <Text style={styles.bulletMark}>✦</Text>
          <Text style={[styles.body, { fontSize: 15 * scale, lineHeight: 22 * scale }]}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function DayRow({
  day,
  badge,
  currentYear,
  scale,
}: {
  day: IndulgenceDay;
  badge: string | null;
  currentYear: number;
  scale: number;
}) {
  return (
    <View style={[styles.day, badge ? styles.dayHighlighted : null]}>
      <View style={styles.dayHeading}>
        <Text style={styles.dayDate}>{formatIndulgenceDate(day, currentYear)}</Text>
        {badge ? <Text style={styles.badge}>{badge}</Text> : null}
      </View>
      <Text style={[styles.dayTitle, { fontSize: 20 * scale, lineHeight: 24 * scale }]}>
        {day.title}
      </Text>
      <Text style={[styles.body, { fontSize: 15 * scale, lineHeight: 22 * scale }]}>{day.work}</Text>
      <Text style={styles.source}>{day.source}</Text>
    </View>
  );
}

export default function IndulgencesScreen() {
  const insets = useSafeAreaInsets();
  const { textScale: scale } = usePrayerPreferences();
  const today = useMemo(() => civilDateFromLocal(new Date()), []);
  const highlight = useMemo(() => currentOrNextIndulgenceDays(today), [today]);
  const highlightedKeys = new Set(highlight.days.map((day) => `${day.id}-${day.start.year}`));
  const days = useMemo(() => upcomingIndulgenceDays(today), [today]);
  const badge = highlight.isToday ? 'Hoje' : 'Próxima';
  const bodySize = { fontSize: 16 * scale, lineHeight: 24 * scale };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 28 },
        ]}
        showsVerticalScrollIndicator={false}>
        <Pressable
          style={styles.backButton}
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Voltar">
          <AppIcon name="chevron_left" size={20} color={contemplative.cream} />
        </Pressable>
        <Text style={styles.title} accessibilityRole="header">
          Indulgências
        </Text>
        <Text style={[styles.body, bodySize, styles.intro]}>{INDULGENCE_GUIDE.what}</Text>

        <Section title="Com o Rosário">
          <Text style={[styles.lead, bodySize]}>A indulgência é plenária quando rezado:</Text>
          <Bullets items={INDULGENCE_GUIDE.rosaryPlaces} scale={scale} />
          <Text style={[styles.lead, bodySize]}>E sempre com:</Text>
          <Bullets items={INDULGENCE_GUIDE.rosaryRequirements} scale={scale} />
          <Text style={[styles.callout, bodySize]}>{INDULGENCE_GUIDE.rosaryAlone}</Text>
        </Section>

        <Section title="Condições da plenária">
          <View style={styles.conditions}>
            {INDULGENCE_GUIDE.conditions.map((condition, index) => (
              <View key={condition.title} style={styles.condition}>
                <Text style={styles.number}>{index + 1}</Text>
                <View style={styles.conditionCopy}>
                  <Text style={[styles.conditionTitle, { fontSize: 18 * scale, lineHeight: 22 * scale }]}>
                    {condition.title}
                  </Text>
                  <Text style={[styles.body, { fontSize: 15 * scale, lineHeight: 22 * scale }]}>
                    {condition.text}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <Bullets items={INDULGENCE_GUIDE.notes} scale={scale} />
        </Section>

        <Section title="Em qualquer dia">
          <Bullets items={INDULGENCE_GUIDE.everyDay} scale={scale} />
        </Section>

        <Section title="Próximos 12 meses">
          <View style={styles.days}>
            {days.map((day) => (
              <DayRow
                key={`${day.id}-${day.start.year}`}
                day={day}
                badge={highlightedKeys.has(`${day.id}-${day.start.year}`) ? badge : null}
                currentYear={today.year}
                scale={scale}
              />
            ))}
          </View>
        </Section>

        <Text style={styles.disclaimer}>{INDULGENCE_GUIDE.disclaimer}</Text>
        <Text style={styles.source}>{INDULGENCE_GUIDE.sources}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: contemplative.background },
  container: { paddingHorizontal: 25 },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(242,234,219,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 20,
    color: contemplative.cream,
    fontFamily: contemplativeFonts.serif,
    fontSize: 44,
    lineHeight: 48,
  },
  intro: { marginTop: 14 },
  section: { marginTop: 30, gap: 12 },
  sectionLabel: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  sectionLabelText: {
    color: contemplative.gold,
    fontFamily: contemplativeFonts.sansSemi,
    fontSize: 10,
    letterSpacing: 1.9,
    textTransform: 'uppercase',
  },
  sectionRule: { flex: 1, height: 1, backgroundColor: contemplative.panelBorder },
  body: { flex: 1, color: contemplative.cream, fontFamily: contemplativeFonts.serifRegular },
  lead: { color: contemplative.cream, fontFamily: contemplativeFonts.serifItalic },
  callout: {
    padding: 14,
    borderLeftWidth: 2,
    borderLeftColor: contemplative.gold,
    color: contemplative.cream,
    fontFamily: contemplativeFonts.serifItalic,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  bullets: { gap: 8 },
  bulletRow: { flexDirection: 'row', gap: 10 },
  bulletMark: { marginTop: 4, color: contemplative.gold, fontSize: 9 },
  conditions: { gap: 14 },
  condition: { flexDirection: 'row', gap: 12 },
  conditionCopy: { flex: 1, gap: 2 },
  conditionTitle: { color: contemplative.cream, fontFamily: contemplativeFonts.serif },
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
  days: { gap: 10 },
  day: {
    gap: 5,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: contemplative.panelBorder,
  },
  dayHighlighted: { borderColor: contemplative.gold, backgroundColor: 'rgba(255,255,255,0.04)' },
  dayHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dayDate: {
    color: contemplative.gold,
    fontFamily: contemplativeFonts.sansSemi,
    fontSize: 11,
    letterSpacing: 0.6,
  },
  badge: {
    color: contemplative.background,
    backgroundColor: contemplative.gold,
    borderRadius: 8,
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontFamily: contemplativeFonts.sansSemi,
    fontSize: 10,
  },
  dayTitle: { color: contemplative.cream, fontFamily: contemplativeFonts.serif },
  source: {
    marginTop: 2,
    color: contemplative.muted,
    fontFamily: contemplativeFonts.sans,
    fontSize: 11,
    lineHeight: 15,
  },
  disclaimer: {
    marginTop: 28,
    marginBottom: 8,
    color: contemplative.muted,
    fontFamily: contemplativeFonts.serifItalic,
    fontSize: 15,
    lineHeight: 21,
  },
});
