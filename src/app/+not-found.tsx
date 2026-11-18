import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { contemplative, contemplativeFonts } from '@/shared/constants/contemplative';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Página não encontrada', headerShown: false }} />
      <View style={styles.container}>
        <Text style={styles.title}>Esta página não existe.</Text>
        <Link href="/" style={styles.link}>
          Voltar ao início
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 18,
    backgroundColor: contemplative.background,
  },
  title: {
    color: contemplative.cream,
    fontFamily: contemplativeFonts.serif,
    fontSize: 28,
    textAlign: 'center',
  },
  link: {
    color: contemplative.gold,
    fontFamily: contemplativeFonts.serifItalic,
    fontSize: 17,
    textDecorationLine: 'underline',
  },
});
