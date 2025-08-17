export type ApiResponse<T = unknown> = {
  success: boolean;
  status: number;
  data?: T;
  error?: string;
};

export type Product = {
    id: number;
    name: string;
    price: number;
    stock: number
};