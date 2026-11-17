import { useDevToolsEnabled } from '@/features/rosary-prayer/dev/useDevToolsEnabled';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Switch, Text, View } from 'react-native';

export default function MenuModalScreen() {
  const { enabled, setEnabled, isReady, isSaving } = useDevToolsEnabled();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <Text style={styles.subtitle}>Ora et Contempla</Text>

      {__DEV__ ? (
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Modo dev</Text>
              <Text style={styles.rowHint}>
                Na oração, mostra o painel para calibrar zoom lateral das imagens embutidas.
              </Text>
            </View>
            <Switch
              value={enabled}
              disabled={!isReady || isSaving}
              onValueChange={setEnabled}
              accessibilityLabel="Ativar modo dev"
            />
          </View>
        </View>
      ) : (
        <Text style={styles.note}>Em breve: preferências e informações do app.</Text>
      )}

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 32,
    gap: 12,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c2416',
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(44,36,22,0.65)',
    marginBottom: 8,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(44,36,22,0.12)',
    padding: 16,
    backgroundColor: 'rgba(44,36,22,0.04)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowText: {
    flex: 1,
    gap: 4,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c2416',
  },
  rowHint: {
    fontSize: 13,
    lineHeight: 18,
    color: 'rgba(44,36,22,0.65)',
  },
  note: {
    fontSize: 14,
    color: 'rgba(44,36,22,0.55)',
  },
});
