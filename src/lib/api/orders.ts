import api from "./axios";
import { CartItem } from "./cart";

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  subtotal: number;
  tax: number;
  shippingCost: number;
  total: number;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderData {
  shippingAddress: ShippingAddress;
  paymentMethod: string;
}

export const ordersApi = {
  getAll: async (): Promise<Order[]> => {
    const response = await api.get<Order[]>("/api/orders");
    return response.data;
  },

  getById: async (id: number): Promise<Order> => {
    const response = await api.get<Order>(`/api/orders/${id}`);
    return response.data;
  },

  create: async (data: CreateOrderData): Promise<Order> => {
    const response = await api.post<Order>("/api/orders", data);
    return response.data;
  },

  cancel: async (id: number): Promise<Order> => {
    const response = await api.put<Order>(`/api/orders/${id}/cancel`);
    return response.data;
  },

  // Seller endpoints
  getSellerOrders: async (): Promise<Order[]> => {
    const response = await api.get<Order[]>("/api/seller/orders");
    return response.data;
  },

  updateStatus: async (id: number, status: Order["status"]): Promise<Order> => {
    const response = await api.put<Order>(`/api/orders/${id}/status`, { status });
    return response.data;
  },
};
