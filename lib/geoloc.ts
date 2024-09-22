import * as Location from "expo-location";
import { getBoundsOfDistance } from "geolib";

// const LOCATION_TASK_NAME = 'background-location-task';

export type LocationTaskData = {
  locations: Location.LocationObject[];
};

export const requestForegroundLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === "granted";
};

export const getCurrentLocation = async () => {
  if (!(await requestForegroundLocation())) return null;

  return await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Highest,
  });
};

export const watchForegroundLocation = async (
  onLocationChange: (new_location: Location.LocationObject) => void,
) => {
  return await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 1000 * 60 * 15, // 15 minutes
      distanceInterval: 50, // 50 meters
    },
    (location) => {
      console.log("New location: ", location);
      onLocationChange(location);
    },
  );
};
// export const startBackgroundLocation = async () => {
//   const { status: foregroundStatus } =
//     await Location.requestForegroundPermissionsAsync();
//   console.log('Foreground status: ', foregroundStatus);

//   if (foregroundStatus === 'granted') {
//     const { status: backgroundStatus } =
//       await Location.requestBackgroundPermissionsAsync();
//     console.log('Background status: ', backgroundStatus);

//     if (backgroundStatus === 'granted') {
//       const isTaskDefined =
//         await TaskManager.isTaskRegisteredAsync(LOCATION_TASK_NAME);
//       console.log('Is task defined: ', isTaskDefined);

//       await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
//         accuracy: Location.Accuracy.Highest,
//         timeInterval: 5000,
//         distanceInterval: 0,
//         showsBackgroundLocationIndicator: true, // Show indicator for background location updates
//       });

//       const hasStarted =
//         await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
//       console.log('Has started location updates: ', hasStarted);
//     } else {
//       console.log('Background location permission not granted');
//     }
//   } else {
//     console.log('Foreground location permission not granted');
//   }
// };

// export const stopBackgroundLocation = async () => {
//   try {
//     await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
//     const hasStarted =
//       await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
//     console.log('Has stoped Location tracking: ', !hasStarted);
//     const isTaskDefined =
//       await TaskManager.isTaskRegisteredAsync(LOCATION_TASK_NAME);
//     console.log('Taks Removed: ', !isTaskDefined);
//   } catch (error) {
//     console.log('Error stoping location updates: ');
//     console.error(error);
//   }
// };

// TaskManager.defineTask<LocationTaskData>(
//   LOCATION_TASK_NAME,
//   ({ data, error }) => {
//     if (error) {
//       console.log(error);
//       return;
//     }
//     if (data) {
//       const { locations } = data;
//       const { coords } = locations[0];
//       const { latitude, longitude } = coords;
//       console.log(`New location: ${latitude}, ${longitude}`);
//     }
//   },
// );

export function getBoundingBoxFromPointAndRadius(
  latitude: number,
  longitude: number,
  radiusKm: number,
) {
  const distanceMeters = radiusKm * 1000;
  const bounds = getBoundsOfDistance({ latitude, longitude }, distanceMeters);

  if (!bounds[0] || !bounds[1])
    throw new Error("Error calculating bounds for the given point and radius");

  const min_lat = bounds[0].latitude;
  const max_lat = bounds[1].latitude;
  const min_long = bounds[0].longitude;
  const max_long = bounds[1].longitude;

  return { min_lat, max_lat, min_long, max_long };
}

export default {
  //   startBackgroundLocation,
  //   stopBackgroundLocation,
  getBoundingBoxFromPointAndRadius,
  requestForegroundLocation,
  getCurrentLocation,
  watchForegroundLocation,
};
