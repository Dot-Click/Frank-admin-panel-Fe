import { useMutation } from "@tanstack/react-query";
import { api } from "../config/axiso.config";

interface ForgotPassword {
    email: string;
}


const ForgotPasswordFrom = async (data: ForgotPassword) => {
console.log(data);
await api.post("/auth/forgotPassword", data);
};

export function useForgotPasswordFrom() {
    return useMutation({
        mutationFn: ForgotPasswordFrom,
    });
}
