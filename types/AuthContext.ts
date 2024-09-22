import {
  AuthResponse,
  AuthTokenResponsePassword,
  Session,
} from "@supabase/supabase-js";

export type AuthContext = {
  session: Session | null;
  setSession: (session: Session | null) => void;
  login: (
    email: string,
    password: string,
  ) => Promise<AuthTokenResponsePassword>;
  signUp: (
    email: string,
    password: string,
    fullname: string,
  ) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  performOAuth: (provider: ActiveProvider, redirectTo: string) => Promise<void>;
  createSessionFromUrl: (url: string) => Promise<Session | null>;
};

export type ActiveProvider = "google" | "facebook";
