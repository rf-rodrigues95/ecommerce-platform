"use client";

import { useEffect, useState } from "react";
import { Product } from "../../lib/types";

interface Actions {
  getProducts: () => Promise<Product[]>;
  deleteProduct: (id: number) => Promise<void>;
}
interface Props {
  actions: Actions;
}

export default function ProductsTable({actions}: Props) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await actions.getProducts();
        setProducts(res ?? []);
        
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await actions.deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Failed to delete product", err);
    }
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
              <button onClick={() => handleDelete(p.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
