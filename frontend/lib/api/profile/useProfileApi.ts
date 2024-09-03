import { useAxios } from "~/hooks/useAxios";

import { getProfile } from "./profile";

export function useProfileApi() {
  const { axiosInstance } = useAxios();

  return {
    getProfile: async () => getProfile(axiosInstance),
  };
}
