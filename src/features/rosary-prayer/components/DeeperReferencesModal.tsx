import type { DeeperReference } from '@/domain/mystery';
import { contemplative, contemplativeFonts } from '@/shared/constants/contemplative';
import * as WebBrowser from 'expo-web-browser';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

type Props = {
  visible: boolean;
  references: DeeperReference[];
  onClose: () => void;
};

export function DeeperReferencesModal({ visible, references, onClose }: Props) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Text style={styles.title}>Quero me aprofundar</Text>
          <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
            {references.map((ref) => (
              <Pressable
                key={ref.id}
                style={styles.item}
                onPress={() => {
                  if (ref.urlOrReference?.startsWith('http')) {
                    void WebBrowser.openBrowserAsync(ref.urlOrReference);
                  }
                }}
                accessibilityRole="button">
                <Text style={styles.itemTitle}>{ref.title}</Text>
                {ref.description ? <Text style={styles.itemDesc}>{ref.description}</Text> : null}
                {ref.urlOrReference && !ref.urlOrReference.startsWith('http') ? (
                  <Text style={styles.itemRef}>{ref.urlOrReference}</Text>
                ) : null}
              </Pressable>
            ))}
          </ScrollView>
          <Pressable style={styles.closeButton} onPress={onClose} accessibilityRole="button">
            <Text style={styles.closeText}>Fechar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'flex-end',
  },
  sheet: {
    maxHeight: '70%',
    backgroundColor: contemplative.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    gap: 12,
  },
  title: {
    color: contemplative.gold,
    fontFamily: contemplativeFonts.serif,
    fontSize: 22,
  },
  list: {
    flexGrow: 0,
  },
  listContent: {
    gap: 10,
    paddingBottom: 8,
  },
  item: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.06)',
    gap: 4,
  },
  itemTitle: {
    color: contemplative.cream,
    fontFamily: contemplativeFonts.serif,
    fontSize: 16,
  },
  itemDesc: {
    color: contemplative.muted,
    fontSize: 13,
    lineHeight: 18,
  },
  itemRef: {
    color: contemplative.gold,
    fontSize: 12,
  },
  closeButton: {
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  closeText: {
    color: contemplative.cream,
    fontFamily: contemplativeFonts.sansSemi,
  },
});
