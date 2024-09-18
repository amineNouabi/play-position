import { ConfigContext, ExpoConfig } from "@expo/config";
import * as dotenv from "dotenv";

// initialize dotenv
dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: config.slug || "play-position",
  name: config.name || "Play Position",
  ios: {
    supportsTablet: true,
    bundleIdentifier: config.ios?.bundleIdentifier,
    config: {
      googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY,
    },
  },
  android: {
    package: config.android?.package,
    config: {
      googleMaps: {
        apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY,
      },
    },
  },
});
