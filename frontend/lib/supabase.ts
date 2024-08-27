import { createClient } from '@supabase/supabase-js';
import { AppState, Platform } from 'react-native';
import { LargeSecureStore } from '~/lib/utils';

// import { Database } from '~/types/database';

const isWeb = Platform.OS === 'web';

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL as string,
  process.env.EXPO_PUBLIC_SUPABASE_KEY as string,
  {
    auth: {
      storage: isWeb ? undefined : new LargeSecureStore(),
      autoRefreshToken: true,
      detectSessionInUrl: isWeb,
    },
  },
);

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
if (!isWeb){
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });
}
