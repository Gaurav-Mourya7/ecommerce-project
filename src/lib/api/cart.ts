import api from "./axios";
import { Product } from "./products";

export interface CartItem {
  id: number;
  productId: number;
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

export const cartApi = {
  get: async (): Promise<Cart> => {
    const response = await api.get<Cart>("/api/cart");
    return response.data;
  },

  addItem: async (productId: number, quantity: number = 1): Promise<Cart> => {
    const response = await api.post<Cart>("/api/cart/add", { productId, quantity });
    return response.data;
  },

  updateQuantity: async (itemId: number, quantity: number): Promise<Cart> => {
    const response = await api.put<Cart>(`/api/cart/item/${itemId}`, { quantity });
    return response.data;
  },

  removeItem: async (itemId: number): Promise<Cart> => {
    const response = await api.delete<Cart>(`/api/cart/item/${itemId}`);
    return response.data;
  },

  clear: async (): Promise<void> => {
    await api.delete("/api/cart");
  },
};
