import React from 'react';
import { Pressable, View } from 'react-native';
import { useAuth } from '~/hooks/useAuth';
import { LogOut } from '~/lib/icons';
import { ThemeToggle } from './ThemeToggle';

export function HeaderRight() {
  const { signOut } = useAuth();
  return (
    <View className="flex-row mr-5 items-center gap-1">
      <ThemeToggle />
      <Pressable onPress={signOut}>
        <LogOut size={21} className="ml-5 text-foreground" />
      </Pressable>
    </View>
  );
}
