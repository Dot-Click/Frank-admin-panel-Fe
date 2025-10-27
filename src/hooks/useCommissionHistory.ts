import { useQuery } from "@tanstack/react-query";
import { api } from "../config/axiso.config";

export type CommissionChangeType = "increase" | "decrease" | "initial_set";
export type CommissionStatus = "active" | "reverted";

export interface CommissionRecordAdmin {
  id: string;
  name: string;
  email: string;
}

export interface CommissionRecordRider {
  id: string;
  name: string;
  email: string;
}

export interface CommissionRecord {
  id: string;
  rider: CommissionRecordRider;
  previousCommission: number;
  newCommission: number;
  changeAmount: number;
  changeType: CommissionChangeType;
  reason: string;
  admin: CommissionRecordAdmin;
  effectiveDate?: string;
  status: CommissionStatus;
  revertedBy?: CommissionRecordAdmin | null;
  revertedAt?: string | null;
  revertReason?: string | null;
  metadata?: Record<string, unknown> | null;
  createdAt: string;
}

export interface CommissionHistoryFilters {
  riderId?: string;
  adminId?: string;
  changeType?: CommissionChangeType;
  status?: CommissionStatus;
  startDate?: string;
  endDate?: string;  
  page?: number;
  limit?: number;
}

interface CommissionHistoryApiResponse {
  success: boolean;
  data: {
    commissionHistory: CommissionRecord[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
    filters: Record<string, unknown>;
  };
}

function buildQuery(params: Record<string, unknown>) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    q.append(key, String(value));
  });
  const queryString = q.toString();
  return queryString ? `?${queryString}` : "";
}

async function fetchCommissionHistory(page: number, limit: number) {
  const query = buildQuery({
    page,
    limit,
  });

  const res = await api.get<CommissionHistoryApiResponse>(
    `/api/admin/riders/commission-history/all${query}`
  );

  return res.data.data;
}

export function useCommissionHistory(page: number, limit: number) {
  return useQuery({
    queryKey: [
      "commission-history",
      page, limit,
      limit,
    ],
    queryFn: () => fetchCommissionHistory(page, limit),
  });
}


