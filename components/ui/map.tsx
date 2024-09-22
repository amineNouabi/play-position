import { LocationObject } from "expo-location";
import { t } from "i18next";
import React from "react";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";

import { useColorScheme } from "~/hooks/useColorScheme";

type Props = {
  gameLocation: LatLng | null;
  setGameLocation: (location: { latitude: number; longitude: number }) => void;
  userLocation: LocationObject | null;
};

export function Map({ gameLocation, setGameLocation, userLocation }: Props) {
  const { colorScheme } = useColorScheme();
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: userLocation?.coords.latitude!,
        longitude: userLocation?.coords.longitude!,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      style={{ width: "100%", height: "100%" }}
      userInterfaceStyle={colorScheme}
      showsUserLocation
      onPress={(e) => {
        console.log(e.nativeEvent);
        setGameLocation(e.nativeEvent.coordinate);
      }}
    >
      {gameLocation && (
        <Marker
          draggable
          onDrag={(e) => {
            console.log(e.nativeEvent);
          }}
          onDragEnd={(e) => {
            setGameLocation(e.nativeEvent.coordinate);
          }}
          coordinate={{
            latitude: gameLocation.latitude,
            longitude: gameLocation.longitude,
          }}
          title={t("Game Location")}
        />
      )}
    </MapView>
  );
}
