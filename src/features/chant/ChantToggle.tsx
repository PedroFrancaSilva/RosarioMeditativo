import { Switch, StyleSheet, Text, View } from 'react-native';

import { useChant } from '@/features/chant/chantContext';
import { contemplative, contemplativeFonts } from '@/shared/constants/contemplative';

export function chantCreditLine(credit: { title: string; performer: string; licenseName: string }): string {
  return `${credit.title} — ${credit.performer}. ${credit.licenseName}.`;
}

export function ChantToggle() {
  const { enabled, unavailable, ready, credit, setEnabled } = useChant();
  const line = chantCreditLine(credit);

  return (
    <View style={styles.block}>
      <View style={styles.row}>
        <Text style={styles.label}>Canto gregoriano</Text>
        <Switch
          value={enabled}
          disabled={!ready}
          onValueChange={setEnabled}
          accessibilityLabel="Canto gregoriano"
          accessibilityState={{ disabled: !ready, checked: enabled }}
          trackColor={{ false: '#3a342c', true: contemplative.gold }}
          thumbColor={contemplative.cream}
        />
      </View>
      <Text style={styles.credit} numberOfLines={2} accessibilityLabel={line}>
        {line}
      </Text>
      {unavailable ? <Text style={styles.unavailable}>Canto indisponível</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginTop: 22,
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  label: {
    color: contemplative.cream,
    fontFamily: contemplativeFonts.sansSemi,
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  credit: {
    color: contemplative.muted,
    fontFamily: contemplativeFonts.sans,
    fontSize: 11,
    lineHeight: 15,
  },
  unavailable: {
    color: contemplative.gold,
    fontFamily: contemplativeFonts.sans,
    fontSize: 11,
    lineHeight: 14,
  },
});
