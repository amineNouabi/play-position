import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ScrollView, View } from "react-native";

import { Text } from "~/components/ui/text";

import { ActivityIndicator } from "~/components/ui/activity-indicator";

import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import { useTranslation } from "react-i18next";
import { JoinGameCard } from "~/components/JoinGameCard";
import { useGeoLocation } from "~/hooks/useGeoLocation";
import { useGamesApi } from "~/lib/api/games/useGamesApi";
import { useProfileApi } from "~/lib/api/profile/useProfileApi";

export default function Index() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { getJoinableGames, joinGame } = useGamesApi();
  const { getProfile } = useProfileApi();
  const { location } = useGeoLocation();

  const {
    data: profile,
    isLoading: isLoadingProfile,
    error: errorProfile,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const {
    data: games,
    isFetching,
    isPending,
    error,
  } = useQuery({
    queryKey: ["joinable-games", profile?.search_radius, location],
    queryFn: () => getJoinableGames(profile?.search_radius!, location!),
    enabled: !!profile && !!location,
  });

  const { mutate: joinGameMutation, isPending: isPendingMutation } =
    useMutation({
      mutationFn: joinGame,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["joined-games"],
        });
        queryClient.invalidateQueries({
          queryKey: ["joinable-games"],
        });

        router.push("/games");
      },
      onError: (error) => {
        console.error("Error joining game:", error);
      },
    });

  if (isFetching || isPending || isLoadingProfile) {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <ActivityIndicator />
      </View>
    );
  }

  if (errorProfile || error || !games) {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <Text>
          {t("Error loading")} + " " + {t("Games")}
        </Text>
      </View>
    );
  }

  if (games.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <Text>{t("No games found")}</Text>
        <Text className="text-center">
          {t("Try increasing the search radius in your")}{" "}
          <Link className="text-primary font-bold underline" href="/profile">
            {t("Profile")}
          </Link>
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 py-3 px-4 mb-3">
      <FlashList
        data={games}
        keyExtractor={(game) => game.id}
        estimatedItemSize={120}
        renderItem={({ item }) => (
          <JoinGameCard
            game={item}
            onJoin={async () => joinGameMutation(item.id)}
            loading={isPendingMutation || isPending || isFetching}
          />
        )}
      />
    </ScrollView>
  );
}
