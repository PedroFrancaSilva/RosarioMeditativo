import * as WebBrowser from 'expo-web-browser';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppIcon } from '@/shared/components/AppIcon';
import { contemplative, contemplativeFonts } from '@/shared/constants/contemplative';

export type SourceSheetContent = {
  /** Rótulo pequeno em dourado: “Obra”, “Evangelho”, “Comentário”. */
  kicker: string;
  title: string;
  subtitle?: string;
  /** Notas longas (descrição da obra, nota de tradução da citação). */
  notes?: string;
  link?: { url: string; label: string; kind?: 'source' | 'search' };
};

type Props = {
  content: SourceSheetContent | null;
  onClose: () => void;
};

/** Ficha de referência: de onde vem a obra ou a citação, e onde lê-la inteira. */
export function SourceSheet({ content, onClose }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={content != null} animationType="fade" transparent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Fechar ficha">
        {content ? (
          <Pressable
            style={[styles.sheet, { paddingBottom: insets.bottom + 20 }]}
            onPress={() => undefined}
            accessibilityRole="none">
            <View style={styles.handle} />
            <View style={styles.headerRow}>
              <View style={styles.kickerRow}>
                <View style={styles.kickerRule} />
                <Text style={styles.kicker}>{content.kicker}</Text>
              </View>
              <Pressable
                onPress={onClose}
                hitSlop={10}
                style={styles.close}
                accessibilityRole="button"
                accessibilityLabel="Fechar">
                <AppIcon name="close" size={18} color={contemplative.muted} />
              </Pressable>
            </View>
            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
              <Text style={styles.title}>{content.title}</Text>
              {content.subtitle ? <Text style={styles.subtitle}>{content.subtitle}</Text> : null}
              {content.notes ? <Text style={styles.notes}>{content.notes}</Text> : null}
            </ScrollView>
            {content.link ? (
              <Pressable
                style={styles.linkButton}
                onPress={() => {
                  void WebBrowser.openBrowserAsync(content.link!.url);
                }}
                accessibilityRole="link"
                accessibilityLabel={content.link.label}>
                <AppIcon
                  name={content.link.kind === 'search' ? 'search' : 'open_in_new'}
                  size={18}
                  color={contemplative.gold}
                />
                <Text style={styles.linkText}>{content.link.label}</Text>
              </Pressable>
            ) : null}
          </Pressable>
        ) : null}
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  sheet: {
    maxHeight: '75%',
    backgroundColor: '#15110e',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: contemplative.panelBorder,
    paddingHorizontal: 24,
    paddingTop: 10,
    gap: 14,
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
  },
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(242,234,219,0.18)',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  kickerRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  kickerRule: { width: 18, height: 1, backgroundColor: contemplative.gold },
  kicker: {
    color: contemplative.gold,
    fontFamily: contemplativeFonts.sansSemi,
    fontSize: 10,
    letterSpacing: 1.9,
    textTransform: 'uppercase',
  },
  close: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  scroll: { flexGrow: 0 },
  scrollContent: { gap: 8 },
  title: {
    color: contemplative.cream,
    fontFamily: contemplativeFonts.serif,
    fontSize: 26,
    lineHeight: 30,
  },
  subtitle: {
    color: contemplative.cream,
    fontFamily: contemplativeFonts.serifItalic,
    fontSize: 17,
    lineHeight: 22,
    opacity: 0.85,
  },
  notes: {
    marginTop: 4,
    color: contemplative.muted,
    fontFamily: contemplativeFonts.sans,
    fontSize: 13,
    lineHeight: 19,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: contemplative.goldFaint,
  },
  linkText: {
    flexShrink: 1,
    color: contemplative.gold,
    fontFamily: contemplativeFonts.sansSemi,
    fontSize: 13,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
});
