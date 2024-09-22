import { LocationObject } from "expo-location";
import React from "react";

import GoogleMapReact from "google-map-react";
import { useColorScheme } from "~/hooks/useColorScheme";

type LatLng = {
  latitude: number;
  longitude: number;
};

type Props = {
  gameLocation: LatLng | null;
  setGameLocation: (location: { latitude: number; longitude: number }) => void;
  userLocation: LocationObject | null;
};

export function Map({ gameLocation, setGameLocation, userLocation }: Props) {
  const { colorScheme } = useColorScheme();

  const Marker = ({
    lat,
    lng,
    color,
  }: {
    lat: number;
    lng: number;
    color: string;
  }) => (
    <div
      className="marker"
      style={{
        position: "absolute",
        width: "10px",
        height: "10px",
        backgroundColor: `${color}`,
        borderRadius: "50%",
        top: `${lat}%`,
        left: `${lng}%`,
      }}
    />
  );

  return (
    <div className="w-full h-full">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY || "",
        }}
        defaultCenter={{
          lat: userLocation?.coords.latitude!,
          lng: userLocation?.coords.longitude!,
        }}
        defaultZoom={15}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          map.addListener("click", (e) => {
            setGameLocation({
              latitude: e.latLng.lat(),
              longitude: e.latLng.lng(),
            });
          });
        }}
      >
        {userLocation && (
          <Marker
            lat={userLocation.coords.latitude}
            lng={userLocation.coords.longitude}
            color="blue"
          />
        )}
        {gameLocation && (
          <Marker
            lat={gameLocation.latitude}
            lng={gameLocation.longitude}
            color="red"
          />
        )}
      </GoogleMapReact>
    </div>
  );
}
