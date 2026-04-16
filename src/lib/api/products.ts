import api from "./axios";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  stock: number;
  sellerId: number;
  sellerName?: string;
  createdAt: string;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: "price" | "rating" | "newest";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
}

export const productsApi = {
  getAll: async (filters?: ProductFilters): Promise<ProductsResponse> => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, String(value));
        }
      });
    }
    const response = await api.get<ProductsResponse>(`/api/products?${params.toString()}`);
    return response.data;
  },

  getById: async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`/api/products/${id}`);
    return response.data;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await api.get<string[]>("/api/products/categories");
    return response.data;
  },

  // Seller endpoints
  create: async (data: CreateProductData): Promise<Product> => {
    const response = await api.post<Product>("/api/products", data);
    return response.data;
  },

  update: async (id: number, data: Partial<CreateProductData>): Promise<Product> => {
    const response = await api.put<Product>(`/api/products/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/products/${id}`);
  },

  getSellerProducts: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>("/api/seller/products");
    return response.data;
  },
};
