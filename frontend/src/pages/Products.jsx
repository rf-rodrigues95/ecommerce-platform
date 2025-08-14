import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const PRODUCTS_ENDPOINT = `${API_BASE_URL}/product`;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useAuth();

    useEffect(() => {
    const fetchProducts = async (endpoint, method) => {
      try {
        const response = await fetch(endpoint, {
          method: method,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: Status ${response.status}`);
        }

        const data = await response.json();
        setProducts(data ?? []);
        setError(null);
      } catch (err) {
        setError(err.message || "Unknown error");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(PRODUCTS_ENDPOINT, "GET");
  }, [token]);

  return (
    <div style={{ padding: "1rem" }}>
    {loading && <p>Loading products...</p>}
    {error && <p style={{ color: "red" }}>Error: {error}</p>}
    
    {!loading && !error && (
    <table
      style={{
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
        </tr>
      </thead>
      <tbody>
        {products.length === 0 ? (
          <tr>
            <td colSpan="3" style={{ padding: "1rem", textAlign: "center" }}>
              No products available
            </td>
          </tr>
        ) : (
          products.map((product) => (
            <tr key={product.id}>
              <td style={{ padding: "1rem", fontSize: "1.1rem", fontWeight: "500" }}>{product.name}</td>
              <td style={{ padding: "1rem", textAlign: "right" }}>
                €{product.price.toFixed(2)}
              </td>
              <td style={{ padding: "1rem", textAlign: "right" }}>{product.stock}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
    )}
  </div>
  );
}
