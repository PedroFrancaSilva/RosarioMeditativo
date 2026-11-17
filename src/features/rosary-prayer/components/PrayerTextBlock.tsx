import { usePrayerPreferences } from '@/features/preferences/preferencesContext';
import { contemplative, contemplativeFonts, contemplativeMotion } from '@/shared/constants/contemplative';
import { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View, type LayoutChangeEvent } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type Props = {
  kicker: string;
  title: string;
  summary: string;
  fullText: string;
  lead?: string | null;
};

export function PrayerTextBlock({ kicker, title, summary, fullText, lead }: Props) {
  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useSharedValue(0);
  const hasMeasured = useRef(false);
  const body = expanded ? fullText : summary;
  const { textScale } = usePrayerPreferences();
  const titleSize = { fontSize: 28 * textScale, lineHeight: 32 * textScale };
  const bodySize = { fontSize: 16 * textScale, lineHeight: 24 * textScale };
  const leadSize = { fontSize: 10 * textScale, lineHeight: 14 * textScale };

  const onMeasure = (event: LayoutChangeEvent) => {
    const next = event.nativeEvent.layout.height;
    if (next <= 0) return;
    if (!hasMeasured.current) {
      animatedHeight.value = next;
      hasMeasured.current = true;
      return;
    }
    animatedHeight.value = withTiming(next, { duration: contemplativeMotion.panel });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value > 0 ? animatedHeight.value : undefined,
    overflow: 'hidden' as const,
  }));

  const inner = (
    <>
      <Text style={styles.kicker}>{kicker}</Text>
      <Text style={[styles.title, titleSize]}>{title}</Text>
      {lead ? <Text style={[styles.lead, leadSize]}>{lead}</Text> : null}
      <Text style={[styles.body, bodySize]}>{body}</Text>
      <Text style={styles.hint}>
        {expanded ? 'Toque para recolher' : 'Toque para ver texto completo'}
      </Text>
    </>
  );

  return (
    <Pressable
      style={styles.card}
      onPress={() => setExpanded((value) => !value)}
      accessibilityRole="button"
      accessibilityHint="Toque para expandir ou recolher o texto da oração">
      <View
        style={styles.measure}
        onLayout={onMeasure}
        pointerEvents="none"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants">
        {inner}
      </View>
      <Animated.View style={animatedStyle}>{inner}</Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: contemplative.panel,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: contemplative.panelBorder,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 14,
  },
  measure: {
    position: 'absolute',
    left: 0,
    right: 0,
    opacity: 0,
  },
  kicker: {
    color: contemplative.gold,
    fontFamily: contemplativeFonts.sansSemi,
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: 6,
    color: contemplative.cream,
    fontFamily: contemplativeFonts.serif,
    fontSize: 28,
    lineHeight: 32,
  },
  lead: {
    marginTop: 10,
    color: contemplative.gold,
    fontFamily: contemplativeFonts.sansSemi,
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  body: {
    marginTop: 8,
    color: contemplative.cream,
    fontFamily: contemplativeFonts.serifRegular,
    fontSize: 16,
    lineHeight: 24,
  },
  hint: {
    marginTop: 12,
    color: contemplative.muted,
    fontFamily: contemplativeFonts.sansSemi,
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
});
