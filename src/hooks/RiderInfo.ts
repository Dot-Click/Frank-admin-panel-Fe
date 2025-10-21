import { useQuery } from "@tanstack/react-query";
import { api } from "../config/axiso.config";

export interface personalInfo {
    name: string;
    phoneNumber: string;
    email: string;
    city: string;
    address: string
}

export interface documents {
    identification: string | null,
    utilitiesBill: string | null,
    guarantorId: string | null,
    guarantorLetter: string | null,
    verifiedBy: string | null,
    verifiedAt: string | null,
    verificationStatus: "pending" | "under_review" | "verified" | "rejected",
    driversLicense: string | null,
    vehicleRegistration: string | null,
    insuranceCertificate: string | null,
    verificationNotes: string
}

export interface bankDetails {
    accountName: string | null;
    accountNumber: string | null;
    bankName: string | null;
    bankCode: string | null;
}

export interface currentLocation {
    latitude: string | null;
    longitude: string | null;
    address: string | null;
    lastUpdated: string | null;
}

export interface status {
    currentLocation: currentLocation;
    isOnline: false;
    isAvailable: false;
    maxCapacity: number;
    currentOrders: number;
}

export interface performance {
    rating: number;
    totalDeliveries: number;
    onTimeDeliveries: number;
    cancelledDeliveries: number;
    averageDeliveryTime: number;
    totalEarnings: number;
}

export interface wallet {
    balance: number;
    totalEarnings: number;
    pendingWithdrawals: number;
}

export interface workingHours {
    start: string;
    end: string;
}

export interface notificationSettings {
    newOrders: boolean;
    orderUpdates: boolean;
    earnings: boolean;
    promotions: boolean;
}

export interface preferences {
    workingHours: workingHours;
    notificationSettings: notificationSettings;
    maxDeliveryDistance: number
}

export interface adminSettings {
    commissionPercentage: number
    isActive: boolean;
    isApproved: boolean;
    approvedBy: string | null;
    approvedAt: string | null;
    rejectionReason: string;
    rejectionNotes: string;
}

// export interface vehicleInfo {
//     type: string;
//     registrationNumber: string;
//     model: string;
//     year: number;
//     insuranceNumber: string;
//     insuranceExpiry: string;
//     vehiclePhotos: string[];
// }

export interface RiderInfo {
    applicationStatus: "pending" | "under_review" | "approved" | "rejected"
    _id: string;
    userId: string | null;
    personalInfo: personalInfo;
    documents: documents;
    bankDetails: bankDetails;
    currentLocation: currentLocation;
    status: status;
    performance: performance;
    wallet: wallet;
    workingHours: workingHours;
    notificationSettings: notificationSettings;
    preferences: preferences;
    adminSettings: adminSettings;
    // vehicleInfo: vehicleInfo;
    isActive: boolean;
    isVerified: boolean;
    lastActiveAt: string;
    createdAt: string;
    updatedAt: string;
}

interface Pagination {
    page: number,
    limit: number,
    total: number,
    pages: number
}

interface RiderListResponse {
    riders: RiderInfo[];
    pagination: Pagination
}


const fetchRidersInfo = async (page?: number, limit?: number) => {
    const response = await api.get("/api/admin/riders/", {
        params: {
            page,
            limit,
        }
    });
    return response.data.data as RiderListResponse;
};

export function useRiders(page?: number, limit?: number) {
    return useQuery<RiderListResponse>({
        queryKey: ["riderinfo", page, limit],
        queryFn: () => fetchRidersInfo(page, limit)
    });
}
