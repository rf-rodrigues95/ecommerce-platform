import ProductsTable from "../../components/ProductsTable";
import { cookies } from "next/headers";

export default async function ProductsPage() {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product`, 
    { 
      method: "GET",
      cache: "no-store",
      headers: {Authorization: `Bearer ${token}`}
     });
  if (!res.ok) throw new Error("Failed to fetch products");
  const products = await res.json();

  return (
    <div className="p-4">
      <ProductsTable products={products} />
    </div>
  );
}
