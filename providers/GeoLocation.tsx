import type { LocationObject, LocationSubscription } from "expo-location";
import React, { createContext, useEffect } from "react";
import { useToast } from "~/hooks/useToast";
import {
  getCurrentLocation,
  requestForegroundLocation,
  watchForegroundLocation,
} from "~/lib/geoloc";

export type GeoLocationContextType = {
  location: LocationObject | null;
};

export const geoLocationContext = createContext<
  GeoLocationContextType | undefined
>(undefined);

export function GeoLocationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [location, setLocation] = React.useState<LocationObject | null>(null);

  const toast = useToast();

  useEffect(() => {
    let subscription: LocationSubscription | null = null;

    initGeoSubscription().then((sub) => {
      subscription = sub;
    });

    return () => {
      if (subscription) subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function initGeoSubscription() {
    if (!(await requestForegroundLocation())) {
      toast.error("Foreground location permission not granted");
      return null;
    }
    setLocation(await getCurrentLocation());

    return await watchForegroundLocation(setLocation);
  }

  return (
    <geoLocationContext.Provider value={{ location }}>
      {children}
    </geoLocationContext.Provider>
  );
}
