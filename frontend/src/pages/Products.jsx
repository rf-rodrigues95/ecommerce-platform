import React, { useEffect, useState } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const PRODUCTS_ENDPOINT = `${API_BASE_URL}/product`;

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJlY29tbWVyY2UtYXBpIiwic3ViIjoicGxhbmV0YXJ5eSIsImV4cCI6MTc1NDUzMTQ0NX0.sYdoh3ucoyQh99taoYrwnCZITriDHVIeyvT6RPYamq4";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  // optional loading state
  const [error, setError] = useState(null);      // optional error handling

  useEffect(() => {
    // Replace with your backend API endpoint
    fetch(PRODUCTS_ENDPOINT, {
    headers: {
        Authorization: `Bearer ${token}`
    }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Products List</h1>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan="3">No products available</td>
            </tr>
          )}
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price.toFixed(2)}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
