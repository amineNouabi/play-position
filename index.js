import "@expo/metro-runtime";

import "./global.css";
import "./shims";

import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";

// Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx = require.context("./app");
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);

// import { App } from "expo-router/build/qualified-entry";
// import { renderRootComponent } from "expo-router/build/renderRootComponent";

// renderRootComponent(App);
