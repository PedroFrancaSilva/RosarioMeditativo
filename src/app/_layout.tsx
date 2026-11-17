import 'react-native-gesture-handler';
import {
  CormorantGaramond_400Regular,
  CormorantGaramond_400Regular_Italic,
  CormorantGaramond_500Medium,
} from '@expo-google-fonts/cormorant-garamond';
import { Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modal, Platform } from 'react-native';

import { configureReminderHandler } from '@/features/reminder/dailyReminder';
import { LaunchScreen } from '@/shared/components/LaunchScreen';
import { useColorScheme } from '@/shared/components/useColorScheme';
import { contemplative, contemplativeMotion } from '@/shared/constants/contemplative';
import { AppProviders } from '@/shared/providers/AppProviders';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  anchor: '(tabs)',
};

// Fade nativo só em build com expo-splash-screen nativo; no Expo Go gera aviso e não aplica.
if (Constants.appOwnership !== 'expo') {
  SplashScreen.setOptions({
    duration: contemplativeMotion.screen,
    fade: true,
  });
}

// O lembrete diário também aparece com o app aberto.
if (Platform.OS !== 'web') {
  configureReminderHandler();
}

// Keeps the native splash up until the branded launch screen is on screen.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [baseLoaded, baseError] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [facesLoaded, facesError] = useFonts({
    CormorantGaramond_400Regular,
    CormorantGaramond_400Regular_Italic,
    CormorantGaramond_500Medium,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  // A fonte de sistema continua se a serifada falhar; o app não fica em tela vazia.
  const facesReady = facesLoaded || facesError != null;
  const ready = baseLoaded && facesReady;

  useEffect(() => {
    if (baseError) throw baseError;
  }, [baseError]);

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [showLaunch, setShowLaunch] = useState(true);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: contemplative.background }}>
      <AppProviders>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="prayer"
              options={{
                headerShown: false,
                // SDK 58: animationDuration do fade nativo é só iOS e não vale em modal.
                // A troca visível é a opacidade Reanimated em PrayerScreen (contemplativeMotion.screen).
                presentation: 'transparentModal',
                animation: 'none',
                animationDuration: contemplativeMotion.screen,
                gestureEnabled: false,
                contentStyle: { backgroundColor: 'transparent' },
              }}
            />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
            <Stack.Screen
              name="meditation-coverage"
              options={{
                headerShown: false,
                contentStyle: { backgroundColor: contemplative.background },
              }}
            />
            <Stack.Screen
              name="ajustes"
              options={{
                headerShown: false,
                contentStyle: { backgroundColor: contemplative.background },
              }}
            />
          </Stack>
        </ThemeProvider>
        {showLaunch ? (
          <Modal
            visible
            transparent
            animationType="none"
            statusBarTranslucent
            onRequestClose={() => undefined}>
            <LaunchScreen
              onReady={() => {
                SplashScreen.hideAsync().catch(() => undefined);
              }}
              onFinish={() => setShowLaunch(false)}
            />
          </Modal>
        ) : null}
      </AppProviders>
    </GestureHandlerRootView>
  );
}
