import { useQuery } from "@tanstack/react-query";
import { api } from "../config/axiso.config";

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  userType: "admin" | "user" | string;
  role: "admin" | "user" | string;
  createdAt: string;
  isActive: boolean;
  provider: string;
  profileImage: string | null;
  isVerified: boolean;
  deviceToken: string | null;
  isNotificationEnabled: boolean;
  lastLogin: string;
  __v: number;
}

const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data.data;
};

export function useMe(){
  return useQuery<User>({
     queryKey: ["Me"],
     queryFn: getMe
  });
}
