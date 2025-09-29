import { useQuery } from "@tanstack/react-query";
import { api } from "../config/axiso.config";

export interface BusinessInfo {
    _id: string;
    name: string;
    email: string;
    phone: string;
    userType: "wholesale" | "retail" | string;
    createdAt: string;
    address: string;
    businessName: string;
    shopNumber?: string;
    plazaName?: string;
    bankName?: string;
    bankAccount?: string;
    isVerified: boolean;
}

interface Pagination {
    currentPage: number;
    totalPages: number;
    totalUsers: number;
    totalRetailer: number;
    totalWholeSaler: number;
    itemsPerPage: number;
}


interface BusinessInfoResponse {
    users: BusinessInfo[];
    pagination: Pagination
}

const BusinessInfo = async (page?: number, limit?: number, userType?: string) => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("No Token Found")

    const response = await api.get("/api/business/users", {
    params: {
            page,
            limit,
            userType
        }
    });
    return response.data.data as BusinessInfoResponse;
};

export function useBusinessInfo(page?: number, limit?: number, userType?: "wholesale" | "retail") {
    return useQuery<BusinessInfoResponse>({
        queryKey: ["BusinessInfo", page, limit, userType],
        queryFn: () => BusinessInfo(page, limit, userType)
    });
}
