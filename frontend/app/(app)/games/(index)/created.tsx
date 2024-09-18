import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { ScrollView, View } from "react-native";

import { Text } from "~/components/ui/text";
import { useGamesApi } from "~/lib/api/games/useGamesApi";

import { router } from "expo-router";
import { ActivityIndicator, Button } from "~/components/ui";

import React from "react";

import { GameCard } from "~/components/GameCard";

export default function Index() {
  const { getCreatedGames } = useGamesApi();

  const {
    data: games,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["created-games"],
    queryFn: getCreatedGames,
  });

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  if (error || !games) {
    console.log(error);
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Error fetching games</Text>
      </View>
    );
  }

  if (games.length === 0) {
    return (
      <View className="flex-1 items-center justify-center gap-3">
        <Text>No games created yet!</Text>
        <Button onPress={() => router.push("/games/create")}>
          <Text>Create a Game</Text>
        </Button>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 py-3 px-4 mb-3">
      <FlashList
        data={games}
        estimatedItemSize={120}
        keyExtractor={(game) => game.id}
        renderItem={({ item }) => <GameCard game={item} />}
      />
    </ScrollView>
  );
}
