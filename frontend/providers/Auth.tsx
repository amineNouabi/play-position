import { Session } from "@supabase/supabase-js";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";
import { createContext, ReactNode, useEffect, useState } from "react";

import { signInWithEmail, signUpWithEmail } from "~/lib/api/auth";
import { supabase } from "~/lib/supabase";

import { useAppState } from "~/hooks/useAppState";
import { useToast } from "~/hooks/useToast";
import { ActiveProvider, type AuthContext } from "~/types/AuthContext";

export const authContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const toast = useToast();
  const [session, setSession] = useState<Session | null>(null);

  // Tells Supabase Auth to continuously refresh the session automatically
  // if the app is in the foreground. When this is added, you will continue
  // to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
  // `SIGNED_OUT` event if the user's session is terminated. This should
  // only be registered once.
  useAppState((status) => {
    if (status === "active") supabase.auth.startAutoRefresh();
    else supabase.auth.stopAutoRefresh();
  });

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (session) setSession(session);
      })
      .catch((error) => {
        console.log("Error getting session", error.message);
      });

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth State Change event: ", _event);
      setSession(session);
    });
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error Signing Out", error.message);
      if (error.status) {
        toast.error(error.message);
      } else throw error;
    }
  };

  const performOAuth = async (provider: ActiveProvider, redirectTo: string) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    });

    if (error) throw error;
    const res = await WebBrowser.openAuthSessionAsync(
      data?.url ?? "",
      redirectTo,
    );

    if (res.type === "success") {
      const { url } = res;
      await createSessionFromUrl(url);
    }
  };

  const createSessionFromUrl = async (url: string) => {
    const { params, errorCode } = QueryParams.getQueryParams(url);

    if (errorCode) throw new Error(errorCode);
    const { access_token, refresh_token } = params;

    if (!access_token) return null;

    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    if (error) throw error;
    return data.session;
  };

  return (
    <authContext.Provider
      value={{
        session,
        setSession,
        login: signInWithEmail,
        signUp: signUpWithEmail,
        signOut,
        performOAuth,
        createSessionFromUrl,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
