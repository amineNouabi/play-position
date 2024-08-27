import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View } from 'react-native';
import { useColorScheme } from '~/hooks/useColorScheme';
import { ActiveProvider } from '~/types/AuthContext';
import { Avatar, AvatarImage } from './ui/avatar';

export function OAuthButtons({
  onContinueWith,
  disabled,
  ...props
}: OAuthButtonsProps) {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <View
      {...props}
      className="flex-row w-full items-center justify-around  pl-10 pr-10"
    >
      <Avatar alt="Google Logo">
        <Pressable onPress={() => onContinueWith('google')}>
          <AvatarImage source={require('~/assets/images/google-logo.png')} />
        </Pressable>
      </Avatar>
      <FontAwesome6
        name="facebook"
        size={40}
        color={isDarkColorScheme ? '#fff' : '#1877F2'}
        onPress={() => onContinueWith('facebook')}
      />
    </View>
  );
}

type OAuthButtonsProps = React.ComponentProps<typeof View> & {
  onContinueWith: (provider: ActiveProvider) => void;
  disabled: boolean;
};
