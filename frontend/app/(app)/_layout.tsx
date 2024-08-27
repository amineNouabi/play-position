import { Redirect, Stack } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { HeaderRight } from '~/components/HeaderRight';
import { useAuth } from '~/hooks/useAuth';

export default function RestrictedLayout() {
  const { session } = useAuth();
  const { t } = useTranslation();

  if (!session) return <Redirect href="/login" />;

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: t('Play Position!'),
          headerRight: () => <HeaderRight />,
        }}
      />
    </Stack>
  );
}
