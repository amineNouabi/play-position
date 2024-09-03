import { AxiosInstance } from "axios";

type Profile = {
  id: string;
  email: string;
  full_name: string;
  avatar: string;
};

export const getProfile = async (axiosInstance: AxiosInstance) =>
  (await axiosInstance.get<Profile>("/profile")).data;
