import { useQuery } from "@tanstack/react-query";
import { api } from "../config/axiso.config";

export interface shippingAddress {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export interface orderItems {
    product: {
        _id: string;
        name: string;
        productCode: string;
        images: string[];
    },
    productName: string;
    productCode: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    wholesaleId: string;
    wholesaleName: string;
    _id: string;
}

export interface orderInfo {
    _id: string;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    items: orderItems[];
    subtotal: number;
    shippingCost: number;
    tax: number;
    totalAmount: number;
    status: "Pending" | "Confirmed" | "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Refunded";
    paymentStatus: "pending" | "paid" | "failed" | "refunded";
    paymentMethod: "cash_on_delivery" | "bank_transfer" | "credit_card" | "paypal";
    shippingAddress: shippingAddress;
    createdAt: string;
    updatedAt: string;
}

interface Pagination {
    currentPage: number,
    totalPages: number,
    totalOrders: number,
    itemsPerPage: number
}

interface OrderInfoResponse {
    orders: orderInfo[];
    pagination: Pagination
}




const fetchOrders = async (page?: number, limit?: number) => {
    const response = await api.get("/api/orders/all-orders", {
        params: {
            page,
            limit,
        }
    });
    console.log(response.data.data);
    return response.data.data as OrderInfoResponse;
};

export function useOrders(page?: number, limit?: number) {
    return useQuery<OrderInfoResponse>({
        queryKey: ["orders", page, limit],
        queryFn: () => fetchOrders(page, limit)
    });
}
