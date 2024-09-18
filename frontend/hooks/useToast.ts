import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export function useToast() {
  const insets = useSafeAreaInsets();
  const common = {
    topOffset: insets.top === 0 ? 12 : insets.top + 10,
    visibilityTime: 4000,
  };

  return {
    error: (message: string) =>
      Toast.show({
        type: "error",
        text1: "Error",
        text2: message,
        ...common,
      }),
    success: (message: string) =>
      Toast.show({
        type: "success",
        text1: "Success",
        text2: message,
        ...common,
      }),
    info: (message: string) =>
      Toast.show({
        type: "base",
        text1: "Info",
        text2: message,
        ...common,
      }),
  };
}
