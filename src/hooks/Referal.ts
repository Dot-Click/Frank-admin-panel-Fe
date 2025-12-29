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

const Referal = async () => {
    const response = await api.get("/api/admin/riders/referrals/activity");
    return response.data.data;
};

export function useReferal() {
    return useQuery({
        queryKey: ["Referal"],
        queryFn: () => Referal(),
    });
}
