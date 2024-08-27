import React from 'react';
import { View } from 'react-native';
import { useAuth } from '~/hooks/useAuth';
import { LogOut } from '~/lib/icons';
import { ThemeToggle } from './ThemeToggle';

export function HeaderRight() {
  const { signOut } = useAuth();
  return (
    <View className="flex-row mr-5 items-center gap-1">
      <ThemeToggle />
      <LogOut size={21} onPress={signOut} className="ml-6 text-foreground" />
    </View>
  );
}
