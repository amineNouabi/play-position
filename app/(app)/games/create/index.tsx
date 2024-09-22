import { View } from "react-native";

import React from "react";
import { useTranslation } from "react-i18next";
import { Map } from "~/components/ui/map";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

import { router } from "expo-router";
import { useGeoLocation } from "~/hooks/useGeoLocation";
import { useCreateGameForm } from "./_layout";

export default function GameLocation() {
  const { t } = useTranslation();
  const { location } = useGeoLocation();

  const { gameLocation, setGameLocation } = useCreateGameForm();

  return (
    <View className="flex-1">
      <View className="py-2 px-3 relative">
        <Text className="text-lg font-bold">{t("Choose game location:")}</Text>
        <Text className="text-base text-center">
          {t("Press on the map to set the game location")}
        </Text>
      </View>
      <Map
        gameLocation={gameLocation}
        setGameLocation={setGameLocation}
        userLocation={location}
      />
      {gameLocation && (
        <Button
          size="lg"
          className="absolute bottom-10 self-center"
          onPress={() => router.push("/games/create/game-data")}
        >
          <Text>{t("Next")}</Text>
        </Button>
      )}
    </View>
  );
}
