import { contemplative, contemplativeFonts } from '@/shared/constants/contemplative';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  description: string | null;
  onContinue: () => void;
  onStartNew: () => void;
  onDismiss: () => void;
};

export function ResumePrayerDialog({ description, onContinue, onStartNew, onDismiss }: Props) {
  return (
    <Modal
      visible={description != null}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
      statusBarTranslucent>
      <Pressable style={styles.backdrop} onPress={onDismiss} accessibilityLabel="Fechar">
        <Pressable
          style={styles.card}
          onPress={() => undefined}
          accessibilityRole="alert"
          accessibilityLabel="Oração em andamento">
          <View style={styles.eyebrowRow}>
            <View style={styles.eyebrowRule} />
            <Text style={styles.eyebrow}>Em andamento</Text>
          </View>
          <Text style={styles.title}>Continuar a oração?</Text>
          <Text style={styles.body}>
            Você deixou {description} no meio do caminho. Pode retomar de onde parou ou começar de novo.
          </Text>
          <Pressable
            style={styles.primary}
            onPress={onContinue}
            accessibilityRole="button"
            accessibilityLabel="Continuar a oração">
            <Text style={styles.primaryText}>Continuar</Text>
          </Pressable>
          <Pressable
            style={styles.secondary}
            onPress={onStartNew}
            accessibilityRole="button"
            accessibilityLabel="Iniciar uma nova oração">
            <Text style={styles.secondaryText}>Iniciar uma nova</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(13,11,10,0.72)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: contemplative.panelBorder,
    backgroundColor: '#15110e',
  },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
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
    marginTop: 14,
    color: contemplative.cream,
    fontFamily: contemplativeFonts.serif,
    fontSize: 28,
    lineHeight: 32,
  },
  body: {
    marginTop: 10,
    color: contemplative.muted,
    fontFamily: contemplativeFonts.serifItalic,
    fontSize: 16,
    lineHeight: 22,
  },
  primary: {
    marginTop: 22,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: contemplative.goldFaint,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  primaryText: {
    color: contemplative.cream,
    fontFamily: contemplativeFonts.serif,
    fontSize: 20,
    lineHeight: 24,
  },
  secondary: {
    marginTop: 14,
    alignItems: 'center',
    paddingVertical: 8,
  },
  secondaryText: {
    color: contemplative.gold,
    fontFamily: contemplativeFonts.serifItalic,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
