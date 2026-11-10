import type { ProgressBeadState, RosaryProgressModel } from '@/domain/rosary/rosaryProgress';
import {
  computeMysteryRowLayout,
  MYSTERY_ROW_PADDING_X,
} from '@/features/rosary-prayer/components/mysteryRowLayout';
import { useMemo } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

type Props = {
  progress: RosaryProgressModel;
};

export function RosaryProgressMap({ progress }: Props) {
  const { width: screenWidth } = useWindowDimensions();
  const { mysteries, hailMarys } = progress;

  const mysteryLayout = useMemo(() => {
    const available = screenWidth - MYSTERY_ROW_PADDING_X * 2;
    return computeMysteryRowLayout(mysteries.length, available);
  }, [mysteries.length, screenWidth]);

  if (mysteries.length === 0) {
    return null;
  }

  const a11yMysteries = mysteries
    .map((state, i) => `mistério ${i + 1}: ${state}`)
    .join(', ');
  const a11yHail = hailMarys
    .map((state, i) => `ave ${i + 1}: ${state}`)
    .join(', ');

  return (
    <View
      style={styles.wrapper}
      accessibilityRole="progressbar"
      accessibilityLabel={`Mistérios: ${a11yMysteries}. Ave-Marias: ${a11yHail}`}>
      <View style={[styles.row, { gap: mysteryLayout.gap }]}>
        {mysteries.map((state, index) => (
          <Bead
            key={`m-${index}`}
            state={state}
            diameter={mysteryLayout.beadSize}
            slotExtra={mysteryLayout.slotExtra}
          />
        ))}
      </View>
      <View style={styles.rowHail}>
        {hailMarys.map((state, index) => (
          <Bead key={`h-${index}`} state={state} diameter={16} slotExtra={4} />
        ))}
      </View>
    </View>
  );
}

function Bead({
  state,
  diameter,
  slotExtra,
}: {
  state: ProgressBeadState;
  diameter: number;
  slotExtra: number;
}) {
  const slot = diameter + slotExtra;
  const useScaleHighlight = diameter >= 14;
  return (
    <View style={[styles.beadSlot, { width: slot, height: slot }]}>
      <View
        style={[
          {
            width: diameter,
            height: diameter,
            borderRadius: diameter / 2,
            borderWidth: diameter >= 18 ? 2 : 1.5,
          },
          styles.beadBase,
          state === 'completed' && styles.beadCompleted,
          state === 'current' && styles.beadCurrent,
          state === 'current' && !useScaleHighlight && styles.beadCurrentSmall,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: 10,
    paddingHorizontal: MYSTERY_ROW_PADDING_X,
    paddingVertical: 12,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    maxWidth: '100%',
  },
  rowHail: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'center',
  },
  beadSlot: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  beadBase: {
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  beadCompleted: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderColor: 'rgba(255,255,255,0.95)',
  },
  beadCurrent: {
    backgroundColor: '#e8c547',
    borderColor: '#fff8dc',
    transform: [{ scale: 1.08 }],
  },
  beadCurrentSmall: {
    transform: undefined,
    borderWidth: 2.5,
  },
});
