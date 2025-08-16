"use client";

export type Product = {
    id: number;
    name: string;
    price: number;
    stock: number
};

const baseUrl = process.env.FRONTEND_URL;

export async function getProducts(): Promise<Product[]> {
    
    const res = await fetch(`api/product`, {method: "GET"});
    if (!res.ok) 
        throw new Error("Failed to fetch products");

    const products = await res.json();
    return products;
}

export async function deleteProduct(id: number): Promise<void> {
    const res = await fetch(`${baseUrl}/api/product/${id}`, {method: "DELETE"});
    if(!res.ok)
        throw new Error("Error deleting product");


}