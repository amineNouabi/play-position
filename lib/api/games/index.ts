import { QueryData } from "@supabase/supabase-js";
import { supabase } from "~/lib/supabase";
import { type Database } from "~/types/supabase";

export type CreateGameFields = Database["public"]["Tables"]["games"]["Insert"];

export type GameWithPlayers = QueryData<typeof gamesWithPlayersQuery>[number];

export async function createGame(data: CreateGameFields) {
  const { data: game, error } = await supabase.from("games").insert(data);
  if (error) {
    throw error;
  }

  return game;
}

const gamesWithPlayersQuery = supabase.from("games").select(
  `*,
   players:game_players (player_id)
  `,
);

export async function getCreatedGames(owner_id: string) {
  const { data: games, error } = await gamesWithPlayersQuery
    .eq("owner_id", owner_id)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return games;
}

export async function getJoinedGames(player_id: string) {
  const { data: games_ids, error: error } = await supabase
    .from("games")
    .select("id, players:game_players!inner(player_id)")
    .eq("game_players.player_id", player_id)
    .gt("start_time", new Date().toISOString());
  if (error) {
    throw error;
  }

  const { data: games, error: errorGames } = await supabase
    .from("games")
    .select("*, players:game_players(player_id)")
    .in(
      "id",
      games_ids.map((game) => game.id),
    )
    .gt("start_time", new Date().toISOString())
    .order("created_at", { ascending: false });

  if (errorGames) {
    throw errorGames;
  }

  console.log(games);
  return games;
}

export async function getJoinableGames(
  args: Database["public"]["Functions"]["get_joinable_games"]["Args"],
) {
  const { data: games, error } = await supabase.rpc("get_joinable_games", args);

  if (error) {
    throw error;
  }

  return games;
}

export async function joinGame(game_id: string, player_id: string) {
  const { data: game, error: errorGames } = await supabase
    .from("games")
    .select(
      "pre_taken_spots_team_a,pre_taken_spots_team_b, players_per_team, players:game_players(player_id)",
    )
    .eq("id", game_id)
    .single();

  if (errorGames) {
    throw errorGames;
  }

  if (!game) {
    throw new Error("Game not found");
  }

  if (
    2 * game.players_per_team <=
    game.players.length +
      game.pre_taken_spots_team_a +
      game.pre_taken_spots_team_b
  ) {
    throw new Error("Game is full");
  }

  const { data, error } = await supabase.from("game_players").insert({
    game_id,
    player_id,
  });

  if (error) {
    throw error;
  }

  return data;
}
