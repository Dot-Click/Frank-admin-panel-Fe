import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "../config/axiso.config";

interface AdminLoginInput {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    userType: string;
    isVerified: boolean;
    isActive: boolean;
  };
}

const Login = async (data: AdminLoginInput): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", data);
  return response.data.data;
};

export function useLogin(){
  return useMutation<LoginResponse, AxiosError, AdminLoginInput>({
    mutationFn: Login,
  });
}
