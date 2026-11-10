import type { DecadeBeadView, DecadeBeadVisual } from '@/features/rosary-prayer/session/decadeBeadView';
import { contemplative, contemplativeFonts, contemplativeMotion } from '@/shared/constants/contemplative';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  view: DecadeBeadView;
};

export function DecadeBeadRow({ view }: Props) {
  return (
    <View style={styles.wrap} accessibilityRole="progressbar" accessibilityLabel={view.caption}>
      <View style={styles.row}>
        {view.beads.map((state, index) => (
          <DecadeBead key={index} state={state} />
        ))}
      </View>
      {view.caption ? <Text style={styles.caption}>{view.caption}</Text> : null}
    </View>
  );
}

function DecadeBead({ state }: { state: DecadeBeadVisual }) {
  const emphasis = useSharedValue(state === 'current' ? 1 : 0);
  const tone = useSharedValue(state === 'current' ? 2 : state === 'completed' ? 1 : 0);

  useEffect(() => {
    emphasis.value = withTiming(state === 'current' ? 1 : 0, { duration: contemplativeMotion.bead });
    tone.value = withTiming(state === 'current' ? 2 : state === 'completed' ? 1 : 0, {
      duration: contemplativeMotion.bead,
    });
  }, [emphasis, state, tone]);

  const style = useAnimatedStyle(() => {
    const size = 7 + emphasis.value * 8;
    return {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: interpolateColor(
        tone.value,
        [0, 1, 2],
        ['transparent', contemplative.goldFill, contemplative.gold],
      ),
      borderColor: interpolateColor(
        tone.value,
        [0, 1, 2],
        [contemplative.goldFaint, contemplative.goldFill, contemplative.gold],
      ),
    };
  });

  return <Animated.View style={[styles.bead, style]} />;
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 16,
    gap: 6,
  },
  row: {
    height: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  bead: {
    borderWidth: 1,
  },
  caption: {
    color: contemplative.beadLabel,
    fontFamily: contemplativeFonts.sansSemi,
    fontSize: 10,
    letterSpacing: 1.4,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
