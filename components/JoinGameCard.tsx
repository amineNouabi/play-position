import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Separator,
  Text,
} from "~/components/ui";
import { sleep } from "~/lib/utils";

import { type Database } from "~/types/supabase";

export const JoinGameCard = ({
  game,
  onJoin,
  loading,
}: {
  game: Database["public"]["Functions"]["get_joinable_games"]["Returns"][number];
  onJoin: () => Promise<void>;
  loading: boolean;
}) => {
  const { t } = useTranslation();
  const datetime = new Date(game.start_time);
  const game_date = datetime.toLocaleDateString();

  const [localLoading, setLocalLoading] = useState(false);

  function formatDistance(meters: number) {
    if (meters < 1000) return `${Math.floor(meters)} m`;
    else return `${(meters / 1000).toFixed(1)} Km`;
  }

  function formatTime(date: Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  }

  async function handleJoin() {
    setLocalLoading(true);
    await sleep(100);
    await onJoin();
    setLocalLoading(false);
  }

  return (
    <Card className="p-2 mb-3 rounded-lg shadow-md flex-row justify-around">
      <View className="items-center justify-center">
        <Text>
          {game.players_per_team} {t("vs")} {game.players_per_team}
        </Text>
        <Text>
          {game.free_spots} {t(`spot${game.free_spots > 1 ? "s" : ""}`)}
        </Text>
      </View>
      <Separator orientation="vertical" />
      <View className="flex-col items-center">
        <Text>{game_date}</Text>
        <Text>{formatTime(datetime)}</Text>
      </View>
      <Separator orientation="vertical" />
      <View className="items-center justify-center">
        <Text>{formatDistance(game.dist_meters)}</Text>
      </View>
      <View className="items-center justify-center">
        <Button
          className="border-primary"
          variant="outline"
          size="sm"
          onPress={handleJoin}
          disabled={loading}
        >
          {localLoading || loading ? (
            <ActivityIndicator size="small" />
          ) : (
            <Text>{t("Join")}</Text>
          )}
        </Button>
      </View>
    </Card>
  );
};
