import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme, ThemeProvider } from "@react-navigation/native";
import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ToastProvider } from "~/components/ui/toast";
import { useAppState } from "~/hooks/useAppState";
import { useColorScheme } from "~/hooks/useColorScheme";
import { useOnlineManager } from "~/hooks/useOnlineManager";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { NAV_THEME } from "~/lib/constants";
import { AuthProvider } from "./Auth";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  // React Query already supports on reconnect auto refetch in web browser
  // So we only need to handle it for native platforms
  useOnlineManager();
  useAppState((status) => {
    if (Platform.OS !== "web") focusManager.setFocused(status === "active");
  });

  React.useEffect(() => {
    loadColorScheme().finally(() => {
      SplashScreen.hideAsync();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadColorScheme() {
    const theme = await AsyncStorage.getItem("theme");
    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }
    if (!theme) {
      AsyncStorage.setItem("theme", colorScheme);
      setIsColorSchemeLoaded(true);
      return;
    }
    const colorTheme = theme === "dark" ? "dark" : "light";
    if (colorTheme !== colorScheme) {
      setColorScheme(colorTheme);
      setAndroidNavigationBar(colorTheme);
    }

    setIsColorSchemeLoaded(true);
  }

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SafeAreaProvider>
          <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
            <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
            {children}
            <ToastProvider />
          </ThemeProvider>
        </SafeAreaProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
