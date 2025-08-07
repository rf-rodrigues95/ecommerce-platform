import React, { useEffect, useState } from "react";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const PRODUCTS_ENDPOINT = `${API_BASE_URL}/product`;

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJlY29tbWVyY2UtYXBpIiwic3ViIjoicGxhbmV0YXJ5eSIsImV4cCI6MTc1NDUzMTQ0NX0.sYdoh3ucoyQh99taoYrwnCZITriDHVIeyvT6RPYamq4";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(PRODUCTS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
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
  </div>
  );
}
