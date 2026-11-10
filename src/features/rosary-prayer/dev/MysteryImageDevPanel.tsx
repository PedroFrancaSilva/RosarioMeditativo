import {
  MYSTERY_IMAGE_DEV_CROP_MAX,
  MYSTERY_IMAGE_DEV_CROP_MIN,
} from '@/features/rosary-prayer/dev/useMysteryImageDevCrop';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  cropPercent: number;
  bakedPercent: number;
  onNudge: (delta: number) => void;
  onReset: () => void;
};

export function MysteryImageDevPanel({ cropPercent, bakedPercent, onNudge, onReset }: Props) {
  const atMin = cropPercent <= MYSTERY_IMAGE_DEV_CROP_MIN;
  const atMax = cropPercent >= MYSTERY_IMAGE_DEV_CROP_MAX;

  return (
    <View style={styles.panel} pointerEvents="box-none">
      <Text style={styles.title}>Dev · zoom lateral</Text>
      <Text style={styles.value}>{cropPercent}% da largura</Text>
      <Text style={styles.hint}>Menos % = mais zoom. Diga esse número para gravar no asset.</Text>
      <View style={styles.row}>
        <Pressable
          style={[styles.button, atMin && styles.buttonDisabled]}
          disabled={atMin}
          onPress={() => onNudge(-1)}>
          <Text style={styles.buttonText}>−</Text>
        </Pressable>
        <Pressable
          style={[styles.button, atMax && styles.buttonDisabled]}
          disabled={atMax}
          onPress={() => onNudge(1)}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
        <Pressable style={styles.resetButton} onPress={onReset}>
          <Text style={styles.resetText}>Baked ({bakedPercent}%)</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    marginHorizontal: 16,
    marginTop: 4,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderWidth: 1,
    borderColor: 'rgba(232,197,71,0.35)',
    gap: 4,
  },
  title: {
    color: '#e8c547',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  value: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  hint: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 11,
    lineHeight: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: { opacity: 0.35 },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },
  resetButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
  },
  resetText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    fontWeight: '600',
  },
});
