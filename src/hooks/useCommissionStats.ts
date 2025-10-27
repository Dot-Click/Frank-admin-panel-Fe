import { useQuery } from "@tanstack/react-query";
import { api } from "../config/axiso.config";

export interface CommissionStatistics {
  totalChanges: number;
  totalIncreases: number;
  totalDecreases: number;
  totalInitialSets: number;
  averageChangeAmount: number;
  maxIncrease: number;
  maxDecrease: number;
}

export interface RecentChangeItem {
  id: string;
  rider: { id: string; name: string; email: string };
  changeAmount: number;
  changeType: "increase" | "decrease" | "initial_set";
  newCommission: number;
  admin: { id: string; name: string; email: string };
  createdAt: string;
}

export interface CommissionStatsResponse {
  statistics: CommissionStatistics;
  recentChanges: RecentChangeItem[];
  period: { startDate: string | null; endDate: string | null };
}

function buildQuery(params: Record<string, unknown>) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    q.append(key, String(value));
  });
  const s = q.toString();
  return s ? `?${s}` : "";
}

async function fetchCommissionStats(startDate?: string, endDate?: string) {
  const query = buildQuery({ startDate, endDate });
  const res = await api.get<{ success: boolean; data: CommissionStatsResponse }>(
    `/api/admin/riders/commission-history/statistics${query}`
  );
  return res.data.data;
}

export function useCommissionStats(startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: ["commission-stats", startDate || "", endDate || ""],
    queryFn: () => fetchCommissionStats(startDate, endDate),
  });
}


