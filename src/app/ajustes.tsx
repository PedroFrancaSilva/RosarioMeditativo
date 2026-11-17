import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState, type ReactNode } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  formatReminderTime,
  shiftReminderTime,
  TEXT_SIZE_LABELS,
  TEXT_SIZES,
  textScale,
  type OpeningIntentions,
} from '@/domain/preferences/prayerPreferences';
import { completedCountLabel } from '@/domain/rosary/completionCount';
import { openingLeads } from '@/domain/rosary/buildPrayerSteps';
import { usePrayerPreferences } from '@/features/preferences/preferencesContext';
import { cancelDailyReminder, scheduleDailyReminder } from '@/features/reminder/dailyReminder';
import { useCompletedCount } from '@/features/rosary-prayer/session/completionCounter';
import { contemplative, contemplativeFonts } from '@/shared/constants/contemplative';

const REMINDER_STEP_MINUTES = 15;

const OPENING_OPTIONS: { id: OpeningIntentions; label: string }[] = [
  { id: 'virtues', label: 'Fé, esperança e caridade' },
  { id: 'angelus', label: 'Angelus' },
];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionLabel}>
        <Text style={styles.sectionLabelText}>{title}</Text>
        <View style={styles.sectionRule} />
      </View>
      {children}
    </View>
  );
}

function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
}) {
  return (
    <View style={styles.segment} accessibilityRole="radiogroup">
      {options.map((option) => {
        const selected = option.id === value;
        return (
          <Pressable
            key={option.id}
            style={[styles.segmentButton, selected && styles.segmentActive]}
            onPress={() => onChange(option.id)}
            accessibilityRole="radio"
            accessibilityState={{ selected }}>
            <Text style={[styles.segmentText, selected && styles.segmentTextActive]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { preferences, update } = usePrayerPreferences();
  const { data: completedCount } = useCompletedCount();
  const [reminderNote, setReminderNote] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const { reminder } = preferences;
  const remindersSupported = Platform.OS !== 'web';

  const applyReminder = async (next: typeof reminder) => {
    setBusy(true);
    setReminderNote(null);
    if (!next.enabled) {
      await cancelDailyReminder();
      update({ reminder: next });
      setBusy(false);
      return;
    }
    const result = await scheduleDailyReminder(next.hour, next.minute);
    if (result === 'scheduled') {
      update({ reminder: next });
    } else {
      update({ reminder: { ...next, enabled: false } });
      setReminderNote(
        result === 'denied'
          ? 'Sem permissão para notificações. Ative-as nas definições do aparelho para receber o lembrete.'
          : 'Não foi possível agendar o lembrete.',
      );
    }
    setBusy(false);
  };

  const shiftTime = (delta: number) => {
    const time = shiftReminderTime(reminder, delta);
    const next = { ...reminder, ...time };
    if (reminder.enabled) void applyReminder(next);
    else update({ reminder: next });
  };

  const sampleScale = textScale(preferences.textSize);

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
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Voltar ao início">
          <Text style={styles.backMark}>‹</Text>
        </Pressable>
        <Text style={styles.title}>Ajustes</Text>
        <Text style={styles.counter}>{completedCountLabel(completedCount ?? 0)}</Text>

        <Section title="Tamanho do texto">
          <Segmented
            options={TEXT_SIZES.map((id) => ({ id, label: TEXT_SIZE_LABELS[id] }))}
            value={preferences.textSize}
            onChange={(textSize) => update({ textSize })}
          />
          <Text
            style={[styles.sample, { fontSize: 16 * sampleScale, lineHeight: 24 * sampleScale }]}>
            Ave, Maria, cheia de graça, o Senhor é convosco…
          </Text>
        </Section>

        <Section title="Durante a oração">
          <View style={styles.row}>
            <View style={styles.rowCopy}>
              <Text style={styles.rowLabel}>Vibrar a cada conta</Text>
              <Text style={styles.hint}>Um toque leve por oração; outro, diferente, ao fim da dezena.</Text>
            </View>
            <Switch
              value={preferences.haptics}
              onValueChange={(haptics) => update({ haptics })}
              accessibilityLabel="Vibrar a cada conta"
              trackColor={{ false: '#3a342c', true: contemplative.gold }}
              thumbColor={contemplative.cream}
            />
          </View>
        </Section>

        <Section title="Três Ave-Marias iniciais">
          <Segmented
            options={OPENING_OPTIONS}
            value={preferences.openingIntentions}
            onChange={(openingIntentions) => update({ openingIntentions })}
          />
          <View style={styles.leads}>
            {openingLeads(preferences.openingIntentions).map((lead) => (
              <Text key={lead} style={styles.hint}>
                {lead}
              </Text>
            ))}
          </View>
          <Text style={styles.hint}>Vale para a próxima oração que começar.</Text>
        </Section>

        {remindersSupported ? (
          <Section title="Lembrete diário">
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Lembrar de rezar</Text>
              <Switch
                value={reminder.enabled}
                disabled={busy}
                onValueChange={(enabled) => void applyReminder({ ...reminder, enabled })}
                accessibilityLabel="Lembrete diário"
                trackColor={{ false: '#3a342c', true: contemplative.gold }}
                thumbColor={contemplative.cream}
              />
            </View>
            <View style={styles.timeRow}>
              <Pressable
                style={styles.timeButton}
                onPress={() => shiftTime(-REMINDER_STEP_MINUTES)}
                disabled={busy}
                accessibilityRole="button"
                accessibilityLabel={`${REMINDER_STEP_MINUTES} minutos mais cedo`}>
                <Text style={styles.timeButtonText}>−</Text>
              </Pressable>
              <Text
                style={[styles.time, !reminder.enabled && styles.timeOff]}
                accessibilityLabel={`Hora do lembrete: ${formatReminderTime(reminder)}`}>
                {formatReminderTime(reminder)}
              </Text>
              <Pressable
                style={styles.timeButton}
                onPress={() => shiftTime(REMINDER_STEP_MINUTES)}
                disabled={busy}
                accessibilityRole="button"
                accessibilityLabel={`${REMINDER_STEP_MINUTES} minutos mais tarde`}>
                <Text style={styles.timeButtonText}>+</Text>
              </Pressable>
            </View>
            {reminderNote ? <Text style={styles.warning}>{reminderNote}</Text> : null}
          </Section>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: contemplative.background },
  container: { paddingHorizontal: 25 },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(242,234,219,0.28)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backMark: { color: contemplative.cream, fontSize: 28, lineHeight: 30, marginTop: -2 },
  title: {
    marginTop: 20,
    color: contemplative.cream,
    fontFamily: contemplativeFonts.serif,
    fontSize: 44,
    lineHeight: 46,
  },
  counter: {
    marginTop: 8,
    color: contemplative.gold,
    fontFamily: contemplativeFonts.serifItalic,
    fontSize: 16,
  },
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
  segment: {
    flexDirection: 'row',
    padding: 4,
    borderWidth: 1,
    borderColor: contemplative.panelBorder,
    borderRadius: 14,
    backgroundColor: contemplative.segmentTrack,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 11,
    paddingHorizontal: 6,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: { backgroundColor: 'rgba(255,255,255,0.06)' },
  segmentText: {
    color: contemplative.muted,
    fontFamily: contemplativeFonts.sans,
    fontSize: 13,
    textAlign: 'center',
  },
  segmentTextActive: { color: contemplative.cream, fontFamily: contemplativeFonts.sansSemi },
  sample: { color: contemplative.cream, fontFamily: contemplativeFonts.serifRegular },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  rowCopy: { flex: 1, gap: 4 },
  rowLabel: { color: contemplative.cream, fontFamily: contemplativeFonts.sans, fontSize: 15 },
  hint: {
    color: contemplative.muted,
    fontFamily: contemplativeFonts.sans,
    fontSize: 12,
    lineHeight: 17,
  },
  leads: { gap: 2 },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 18 },
  timeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: contemplative.goldFaint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeButtonText: { color: contemplative.gold, fontSize: 22, lineHeight: 24 },
  time: {
    minWidth: 92,
    textAlign: 'center',
    color: contemplative.cream,
    fontFamily: contemplativeFonts.serif,
    fontSize: 34,
  },
  timeOff: { color: contemplative.muted },
  warning: {
    color: contemplative.gold,
    fontFamily: contemplativeFonts.sans,
    fontSize: 12,
    lineHeight: 17,
  },
});
