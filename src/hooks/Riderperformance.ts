import { useQuery } from "@tanstack/react-query";
import { api } from "../config/axiso.config";

// export interface BusinessInfo {
//     _id: string;
//     name: string;
//     email: string;
//     phone: string;
//     userType: "wholesale" | "retail" | string;
//     createdAt: string;
//     address: string;
//     businessName: string;
//     shopNumber?: string;
//     plazaName?: string;
//     bankName?: string;
//     bankAccount?: string;
//     bankAccountName?: string;
//     isActive: boolean;
// }

// interface Pagination {
//     currentPage: number;
//     totalPages: number;
//     totalUsers: number;
//     totalRetailer: number;
//     totalWholeSaler: number;
//     itemsPerPage: number;
// }


// interface BusinessInfoResponse {
//     users: BusinessInfo[];
//     pagination: Pagination
// }

const RiderPerformance = async (id: string) => {
    const response = await api.get(`/api/admin/riders/${id}/performance`);
    return response.data.data;
};

export function useRiderPerformance(id: string) {
    return useQuery({
        queryKey: ["RiderPerformance", id],
        queryFn: () => RiderPerformance(id),
        enabled: Boolean(id),
        staleTime: 1000 * 60 * 1,
    });
}
