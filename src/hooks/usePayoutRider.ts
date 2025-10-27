import { useMutation } from "@tanstack/react-query";
import { api } from "../config/axiso.config";

export interface PayoutPayload {
  riderId: string;
  amount: number;
  paymentMethod?: "bank_transfer" | "cash" | string;
  bankDetails?: {
    accountNumber?: string;
    bankName?: string;
    accountName?: string;
    bankCode?: string;
  };
  reference?: string;
}

export interface PayoutResponse {
  message: string;
  transaction: {
    id: string;
    amount: number;
    status: string;
    reference?: string;
    processedAt: string;
  };
  wallet: {
    balance: number;
    totalEarnings?: number;
    pendingWithdrawals?: number;
  };
}

async function payoutRiderRequest(payload: PayoutPayload) {
  const { riderId, amount, paymentMethod = "bank_transfer", bankDetails = {}, reference } = payload;

  const res = await api.post(`/api/admin/riders/${riderId}/payout`, {
    amount,
    paymentMethod,
    bankDetails,
    reference,
  });

  return res.data;
}

export function usePayoutRider() {
  return useMutation({
    mutationKey: ["admin-payout-rider"],
    mutationFn: payoutRiderRequest,
  });
}
