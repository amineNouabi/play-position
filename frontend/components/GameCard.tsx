import { View } from "react-native";
import { Card, Separator, Text } from "~/components/ui";
import { GameWithPlayers } from "~/lib/api/games";
import { CircleCheck, CircleEllipsis, CirclePlay, CircleX } from "~/lib/icons";

export const GameCard = ({ game }: { game: GameWithPlayers }) => {
  const datetime = new Date(game.start_time);
  const date = datetime.toLocaleDateString();
  const hours = datetime.getHours();
  const minutes = datetime.getMinutes();

  const time = `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}`;

  let team_a_count = game.pre_taken_spots_team_a || 0;
  let team_b_count = game.pre_taken_spots_team_b || 0;

  console.log("team_a_count", team_a_count);
  console.log("team_b_count", team_b_count);
  console.log("game.players", game.players);

  for (let i = 0; i < game.players.length; i++) {
    if (team_a_count <= team_b_count) team_a_count++;
    else team_b_count++;
  }

  return (
    <Card className="p-2 mb-3 rounded-lg shadow-md flex-row">
      {datetime > new Date() ? (
        <View className="px-4 items-center justify-center">
          {2 * game.players_per_team === team_a_count + team_b_count ? (
            <>
              {/* <Text className="text-sm font-bold text-teal-700">ready</Text> */}
              <CirclePlay size={40} className="text-teal-700" />
            </>
          ) : (
            <>
              {/* <Text className="text-sm font-bold text-blue-800">
                in progress
              </Text> */}
              <CircleEllipsis size={40} className="text-blue-800" />
            </>
          )}
        </View>
      ) : (
        <View className="px-4 items-center justify-center">
          {2 * game.players_per_team === team_a_count + team_b_count ? (
            <>
              {/* <Text className="text-sm font-bold text-green-700">
                successfull
              </Text> */}
              <CircleCheck size={40} className="text-green-700" />
            </>
          ) : (
            <>
              {/* <Text className="text-sm font-bold text-destructive">
                unsuccessfull
              </Text> */}
              <CircleX size={40} className="text-destructive" />
            </>
          )}
        </View>
      )}
      <Separator orientation="vertical" />
      <View className="flex-col flex-1 items-center justify-center">
        <Text className="text-lg font-bold">
          {game.players_per_team} vs {game.players_per_team}
        </Text>
        <View className="flex-row gap-3">
          <Text>
            A: {team_a_count}/{game.players_per_team}
          </Text>
          <Text>
            B: {team_b_count}/{game.players_per_team}
          </Text>
        </View>
      </View>
      <Separator orientation="vertical" />
      <View className="flex-1 items-center justify-around">
        <Text>{date}</Text>
        <Text>{time}</Text>
      </View>
    </Card>
  );
};
