import { Link, Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

import { Text } from "~/components/ui/text";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center p-6">
        <Text>This screen doesn't exist.</Text>
        <Link href="/" className="py-4 mt-4">
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
