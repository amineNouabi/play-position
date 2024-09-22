// import { getProfile } from "./profile";
import { useAuth } from "~/hooks/useAuth";
import {
  getProfile,
  updateProfile,
  type UpdateProfileFields,
} from "./profile.supabase";

export function useProfileApi() {
  //   const { axiosInstance } = useAxios();
  const { session } = useAuth();

  if (!session?.user.id)
    throw new Error("useProfileApi: User ID not found in session");

  return {
    getProfile: async () => getProfile(session.user.id),
    updateProfile: async (data: UpdateProfileFields) =>
      updateProfile(session.user.id, data),
  };
}
