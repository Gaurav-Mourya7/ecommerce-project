import api from "./axios";

export interface User {
  id: number;
  email: string;
  name: string;
  role: "USER" | "SELLER" | "ADMIN";
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: "USER" | "SELLER";
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/api/auth/login", credentials);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/api/auth/register", data);
    return response.data;
  },

  verify: async (): Promise<User> => {
    const response = await api.get<User>("/api/auth/verify");
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/api/auth/logout");
  },
};
