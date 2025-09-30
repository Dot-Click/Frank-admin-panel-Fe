import { useMutation } from "@tanstack/react-query";
import { api } from "../config/axiso.config";

export interface UpdateOrderStatus {
    id: string;
    status: string;
    trackingNumber?: string;
}


const updateOrderStatus = async (data: UpdateOrderStatus) => {
      const { id, status, trackingNumber } = data;
    const response = await api.put(`/api/orders/${id}/status`, {
        status, trackingNumber
    });
    return response.data.data;
};

export function useUpdateOrderStatus() {
    return useMutation({
        mutationFn: updateOrderStatus,
    });
}
