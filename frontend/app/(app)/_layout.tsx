import { Redirect, Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { HeaderRight } from "~/components/HeaderRight";
import { useAuth } from "~/hooks/useAuth";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UserRound } from "~/lib/icons";

export default function RestrictedLayout() {
  const { session } = useAuth();
  const { t } = useTranslation();

  if (!session) return <Redirect href="/login" />;

  return (
    <Tabs
      screenOptions={{
        headerRight: () => <HeaderRight />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("Join"),
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="soccer" {...props} />
          ),
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          title: t("Games"),
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="soccer-field" {...props} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t("Profile"),
          tabBarIcon: (props) => <UserRound {...props} />,
        }}
      />
    </Tabs>
  );
}
