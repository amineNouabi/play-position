import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View } from 'react-native';
import { useColorScheme } from '~/hooks/useColorScheme';
import { ActiveProvider } from '~/types/AuthContext';
import { Avatar, AvatarImage } from './ui/avatar';

type Props = React.ComponentProps<typeof View> & {
  onContinueWith: (provider: ActiveProvider) => void;
  disabled: boolean;
};

export function OAuthButtons({
  onContinueWith,
  disabled,
  ...props
}: Props) {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <View
      {...props}
      className="flex-row w-full items-center justify-around  pl-10 pr-10"
    >
        <Pressable onPress={() => onContinueWith('google')}>
      <Avatar className='size-1' alt="Google Logo">
          <AvatarImage  source={require('~/assets/images/google-logo.png')} />
      </Avatar>
        </Pressable>
      <FontAwesome6
        name="facebook"
        size={50}
        color={isDarkColorScheme ? '#fff' : '#1877F2'}
        onPress={() => onContinueWith('facebook')}
      />
    </View>
  );
}
