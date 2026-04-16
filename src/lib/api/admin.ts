import api from "./axios";
import { User } from "./auth";
import { Product } from "./products";
import { Order } from "./orders";

export interface AdminStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  recentOrders: Order[];
}

export const adminApi = {
  getStats: async (): Promise<AdminStats> => {
    const response = await api.get<AdminStats>("/api/admin/stats");
    return response.data;
  },

  // Users
  getUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>("/api/admin/users");
    return response.data;
  },

  updateUser: async (id: number, data: Partial<User>): Promise<User> => {
    const response = await api.put<User>(`/api/admin/users/${id}`, data);
    return response.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/api/admin/users/${id}`);
  },

  // Products
  getAllProducts: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>("/api/admin/products");
    return response.data;
  },

  deleteProduct: async (id: number): Promise<void> => {
    await api.delete(`/api/admin/products/${id}`);
  },

  // Orders
  getAllOrders: async (): Promise<Order[]> => {
    const response = await api.get<Order[]>("/api/admin/orders");
    return response.data;
  },

  updateOrderStatus: async (id: number, status: Order["status"]): Promise<Order> => {
    const response = await api.put<Order>(`/api/admin/orders/${id}/status`, { status });
    return response.data;
  },
};
