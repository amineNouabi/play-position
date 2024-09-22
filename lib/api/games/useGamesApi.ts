import { LocationObject } from "expo-location";
import {
  createGame,
  getCreatedGames,
  getJoinableGames,
  getJoinedGames,
  joinGame,
  type CreateGameFields,
} from ".";

import { useAuth } from "~/hooks/useAuth";
import { getBoundingBoxFromPointAndRadius } from "~/lib/geoloc";

export function useGamesApi() {
  const { session } = useAuth();

  if (!session?.user.id) {
    throw new Error("User is not authenticated");
  }

  return {
    createGame: async (data: Omit<CreateGameFields, "owner_id">) =>
      createGame({ ...data, owner_id: session.user.id }),
    getCreatedGames: async () => getCreatedGames(session.user.id),
    getJoinedGames: async () => getJoinedGames(session.user.id),
    getJoinableGames: async (search_radius: number, location: LocationObject) =>
      getJoinableGames({
        ...getBoundingBoxFromPointAndRadius(
          location.coords.latitude,
          location.coords.longitude,
          search_radius,
        ),
        long: location.coords.longitude,
        lat: location.coords.latitude,
      }),
    joinGame: async (game_id: string) => joinGame(game_id, session.user.id),
  };
}
