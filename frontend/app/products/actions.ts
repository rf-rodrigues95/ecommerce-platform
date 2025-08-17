"use server";

import { cookies } from "next/headers";
import { serverFetch } from "../../lib/api";
import { Product } from "../../lib/types";

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
}

export async function addToCart(id: number, quantity: number): Promise<void> {
    const token = (await cookies()).get("token")?.value;
    
    const res = await serverFetch("cart/items", "POST", {productId: id, quantity: quantity}, token);

    if (!res.success) {
        throw new Error(res.error || "Error while adding item");
    }
}