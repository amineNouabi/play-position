import type {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  useTheme,
  type ParamListBase,
  type TabNavigationState,
} from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import { createContext, useContext, useState } from "react";
import { useWindowDimensions, View } from "react-native";

import type { LatLng } from "react-native-maps";

const { Navigator } = createMaterialTopTabNavigator();

const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

type FormContext = {
  gameLocation: LatLng | null;
  setGameLocation: (location: LatLng | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const formContext = createContext<FormContext | null>(null);

export default function CreateGameLayout() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const [gameLocation, setGameLocation] = useState<LatLng | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <View className="flex-1">
      <formContext.Provider
        value={{ gameLocation, setGameLocation, loading, setLoading }}
      >
        <MaterialTopTabs
          initialRouteName="location"
          screenOptions={{
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: "grey",
            tabBarLabelStyle: {
              fontSize: 14,
              textTransform: "capitalize",
              fontWeight: "bold",
            },
            tabBarIndicatorStyle: {
              backgroundColor: colors.primary,
            },
            tabBarScrollEnabled: true,
            tabBarItemStyle: { width: "auto", minWidth: width / 2 },
          }}
        >
          <MaterialTopTabs.Screen
            name="index"
            options={{
              title: "Geo Location",
            }}
          />
          <MaterialTopTabs.Screen
            name="game-data"
            options={{
              title: "Game's data",
            }}
          />
        </MaterialTopTabs>
      </formContext.Provider>
    </View>
  );
}

export const useCreateGameForm = () => {
  const context = useContext(formContext);
  if (!context) {
    throw new Error("useCreateGameForm must be used within a CreateGameLayout");
  }
  return context;
};
