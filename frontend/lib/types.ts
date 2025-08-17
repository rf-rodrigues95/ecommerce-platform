export type ApiResponse<T = unknown> = {
  success: boolean;
  status: number;
  data?: T;
  error?: string;
};

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export type Product = {
  id: number;
  name: string;
  price: number;
  stock: number
};

export type User = {
  id: number;
  username: string;
  role: UserRole
}