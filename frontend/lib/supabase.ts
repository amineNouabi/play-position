import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";
import { LargeSecureStore } from "~/lib/utils";

// import { Database } from '~/types/database';

const isWeb = Platform.OS === "web";

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
