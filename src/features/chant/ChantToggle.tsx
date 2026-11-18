import { StyleSheet, Text, View } from 'react-native';

import { ContemplativeSwitch } from '@/shared/components/ContemplativeSwitch';

import { useChant } from '@/features/chant/chantContext';
import { contemplative, contemplativeFonts } from '@/shared/constants/contemplative';

export function chantCreditLine(credit: { title: string; performer: string; licenseName: string }): string {
  return `${credit.title} — ${credit.performer}. ${credit.licenseName}.`;
}

/** Linha de ajuste do canto: interruptor e, embaixo, a gravação de hoje. */
export function ChantToggle() {
  const { enabled, unavailable, ready, credit, setEnabled } = useChant();
  const line = chantCreditLine(credit);

  return (
    <View style={styles.block}>
      <View style={styles.row}>
        <View style={styles.copy}>
          <Text style={styles.label}>Tocar durante a oração</Text>
          <Text style={styles.hint}>A antífona mariana do tempo litúrgico, em loop, só com a oração aberta.</Text>
        </View>
        <ContemplativeSwitch
          value={enabled}
          disabled={!ready}
          onValueChange={setEnabled}
          accessibilityLabel="Canto gregoriano"
          accessibilityState={{ disabled: !ready, checked: enabled }}
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
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  copy: { flex: 1, gap: 4 },
  label: {
    color: contemplative.cream,
    fontFamily: contemplativeFonts.sans,
    fontSize: 15,
  },
  hint: {
    color: contemplative.muted,
    fontFamily: contemplativeFonts.sans,
    fontSize: 12,
    lineHeight: 17,
  },
  credit: {
    color: contemplative.muted,
    fontFamily: contemplativeFonts.serifItalic,
    fontSize: 14,
    lineHeight: 18,
  },
  unavailable: {
    color: contemplative.gold,
    fontFamily: contemplativeFonts.sans,
    fontSize: 11,
    lineHeight: 14,
  },
});
