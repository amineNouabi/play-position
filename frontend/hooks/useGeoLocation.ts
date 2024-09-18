import { useContext } from "react";

import { geoLocationContext } from "~/providers/GeoLocation";

export function useGeoLocation() {
  const context = useContext(geoLocationContext);
  if (!context) {
    throw new Error("useGeoLocation must be used within a GeoLocationProvider");
  }
  return context;
}
