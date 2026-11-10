import { StyleSheet, View } from 'react-native';

type Props = {
  /** 0 = Pai-Nosso; 1–10 = Ave-Marias; null oculta contas. */
  activeIndex: number | null;
};

const BEAD_COUNT = 10;

export function DecadeBeads({ activeIndex }: Props) {
  if (activeIndex === null) {
    return null;
  }

  return (
    <View style={styles.row} accessibilityRole="progressbar">
      {Array.from({ length: BEAD_COUNT }, (_, i) => {
        const beadNumber = i + 1;
        const isOurFatherStep = activeIndex === 0;
        const isCompleted = !isOurFatherStep && beadNumber < activeIndex;
        const isCurrent =
          (isOurFatherStep && beadNumber === 1) ||
          (!isOurFatherStep && beadNumber === activeIndex);

        return (
          <View
            key={beadNumber}
            style={[
              styles.bead,
              isCompleted && styles.beadCompleted,
              isCurrent && styles.beadActive,
              isOurFatherStep && beadNumber === 1 && isCurrent && styles.beadOurFather,
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  bead: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.55)',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  beadCompleted: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderColor: 'rgba(255,255,255,0.95)',
  },
  beadActive: {
    backgroundColor: '#e8c547',
    borderColor: '#fff8dc',
    transform: [{ scale: 1.15 }],
  },
  beadOurFather: {
    borderColor: '#fff8dc',
    borderWidth: 3,
  },
});
