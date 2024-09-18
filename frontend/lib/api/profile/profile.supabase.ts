import { supabase } from "~/lib/supabase";
import { type Database } from "~/types/supabase";

export const getProfile = async (user_id: string) =>
  (
    await supabase
      .from("profiles")
      .select()
      .eq("id", user_id)
      .throwOnError()
      .single()
  ).data;

export type UpdateProfileFields =
  Database["public"]["Tables"]["profiles"]["Update"];

export const updateProfile = async (
  user_id: string,
  data: UpdateProfileFields,
) =>
  (
    await supabase
      .from("profiles")
      .update({ ...data })
      .eq("id", user_id)
      .throwOnError()
  ).data;
