"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

type Product = { id: number; name: string; price: number; stock: number };

export default function ProductsTable({ products: initialProducts }: { products: Product[] }) {
  const [products, setProducts] = useState(initialProducts);
  const { token } = useAuth();

  const deleteProduct = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <table style={{
        width: "100%",
        borderCollapse: "collapse",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <thead>
        <tr style={{ backgroundColor: "#f6f2f2ff" }}>
          <th style={{ padding: "1rem", textAlign: "left", fontSize: "1.1rem" }}>Name</th>
          <th style={{ padding: "1rem", textAlign: "right" }}>Price</th>
          <th style={{ padding: "1rem", textAlign: "right" }}>Stock</th>
          <th style={{ padding: "1rem", textAlign: "right" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id}>
            <td style={{ padding: "1rem", fontSize: "1.1rem", fontWeight: "500" }}>{p.name}</td>
            <td style={{ padding: "1rem", textAlign: "right" }}>€{p.price.toFixed(2)}</td>
            <td style={{ padding: "1rem", textAlign: "right" }}>{p.stock}</td>
            <td style={{ padding: "1rem", textAlign: "center" }}>
              <button onClick={() => deleteProduct(p.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
