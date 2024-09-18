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
import { router, withLayoutContext } from "expo-router";
import { t } from "i18next";
import { Pressable, useWindowDimensions, View } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { CircleFadingPlus } from "~/lib/icons";

import { Text } from "~/components/ui/text";

const { Navigator } = createMaterialTopTabNavigator();

const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function MaterialTopTabsLayout() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  return (
    <View className="flex-1">
      <Pressable
        onPress={() => router.navigate("/games/create")}
        className="flex-row w-full items-center justify-between border-y-hairline border-border py-5 px-6"
      >
        <Text className="text-primary">{t("Create a new game")}</Text>
        <CircleFadingPlus size={30} color={NAV_THEME.dark.primary} />
      </Pressable>
      <MaterialTopTabs
        initialRouteName="index"
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
            title: "Joined Games",
          }}
        />
        <MaterialTopTabs.Screen
          name="created"
          options={{
            title: "Created Games",
          }}
        />
      </MaterialTopTabs>
    </View>
  );
}
