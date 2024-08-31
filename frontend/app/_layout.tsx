
import { SplashScreen, Stack } from 'expo-router';
import * as React from 'react';
import AppProvider from '~/providers/App';

import { useTranslation } from 'react-i18next';
import { ThemeToggle } from '~/components/ThemeToggle';

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary
} from 'expo-router';

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { t } = useTranslation();
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen
          name="login"
          options={{
            title: t('Authentification'),
            headerRight: () => <ThemeToggle />,
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            title: t('Authentification'),
            headerRight: () => <ThemeToggle />,
            headerTitleAlign: 'center',
          }}
        />
      </Stack>
    </AppProvider>
  );
}
