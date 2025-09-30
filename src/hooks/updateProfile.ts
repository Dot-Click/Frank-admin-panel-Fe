import { useMutation } from "@tanstack/react-query";
import { api } from "../config/axiso.config";

export interface AdminUpdate {
    name: string;
    email: string;
    password?: string;
}


const updateProfile = async (data: AdminUpdate) => {
    const response = await api.put("/auth/updateAdminProfile", data);
    return response.data.data;
};

export function useUpdateProfile() {
    return useMutation({
        mutationFn: updateProfile,
    });
}
