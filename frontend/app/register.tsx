import { makeRedirectUri } from 'expo-auth-session';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, View } from 'react-native';
import LanguageButtons from '~/components/LanguageButtons';

import { OAuthButtons } from '~/components/OAuthButtons';
import { Button } from '~/components/ui/button';
import { Card, CardFooter, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Separator } from '~/components/ui/separator';
import { Text } from '~/components/ui/text';

import { useAuth } from '~/hooks/useAuth';
import { useToast } from '~/hooks/useToast';
import { ActiveProvider } from '~/types/AuthContext';

const redirectTo = makeRedirectUri();

export default function Register() {
  const toast = useToast();
  const { t } = useTranslation();
  const { session, signUp, performOAuth } = useAuth()!;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);
  useEffect(() => {
    if (session) router.replace('/');
  }, [session]);

  function _onChangeText(field: 'email' | 'password') {
    return (text: string) => {
      switch (field) {
        case 'email':
          setEmail(text);
          break;
        case 'password':
          setPassword(text);
          break;
      }
    };
  }

  async function handleSubmit() {
    setLoading(true);
    const { error } = await signUp(email, password);
    setLoading(false);

    if (error) {
      console.log('Error Signing Up', error.message);
      if (error.status) toast.error(error.message);
      else throw error;
      return;
    }

    toast.success('Logged in successfully!');
  }

  const onContinueWith = async (provider: ActiveProvider) => {
    setLoading(true);
    try {
      await performOAuth(provider, redirectTo);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View className="flex-col flex-1 items-center p-6 justify-center">
      <Card className="p-5 w-full">
        <CardTitle className="mb-5 p-1">{t('Register')} :</CardTitle>
        <Text>{t('Email')} :</Text>
        <Input
          className="mb-3"
          editable={!loading}
          placeholder={t('Email')}
          onChangeText={_onChangeText('email')}
        />
        <Text>{t('Password')} :</Text>
        <Input
          className="mb-6"
          editable={!loading}
          placeholder={t('Password')}
          onChangeText={_onChangeText('password')}
          secureTextEntry
        />
        <Button disabled={loading} onPress={handleSubmit}>
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text>{t('Register')}</Text>
          )}
        </Button>
        <View className="flex-row items-center justify-center mt-4 mb-0 pb-0">
          <Text className="mr-2">{t('Already have an account')}?</Text>

          <Text
            className="text-blue-800 font-bold"
            onPress={() => router.push('/login')}
          >
            {t('Login')}
          </Text>
        </View>
        <Separator className="mt-2" />
        <CardTitle className="p-2 mt-5">{t('Or Continue with')} :</CardTitle>
        <CardFooter className="flex-col m-0 p-0 mt-3 gap-3">
          <OAuthButtons onContinueWith={onContinueWith} disabled={loading} />
        </CardFooter>
      </Card>
      <LanguageButtons />
    </View>
  );
}
