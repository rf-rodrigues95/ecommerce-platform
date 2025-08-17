"use server";

import { cookies } from "next/headers";
import { serverFetch } from "../lib/api";

export type Product = {
    id: number;
    name: string;
    price: number;
    stock: number
};

export async function getProducts(): Promise<Product[]> {
    const token = (await cookies()).get("token")?.value;
    const res = await serverFetch<Product[]>("product", "GET", undefined, token);
    
    if (res.success && res.data) {
        return res.data;
    }

    return [];
}

export async function deleteProduct(id: number): Promise<void> {
    const token = (await cookies()).get("token")?.value;
    const res = await serverFetch(`product/${id}`, "DELETE", undefined, token);

    if (!res.success) {
        throw new Error(res.error || "Error deleting product");
    }
/* 
    const res = await fetch(`/api/product/${id}`, {method: "DELETE"});
    if(!res.ok)
        throw new Error("Error deleting product"); */
}