import { deleteProduct, getProducts } from "./actions";
import ProductsTable from "./ProductsTable";


export default async function ProductsPage() {
  const actions = { getProducts, deleteProduct };
  
  return (
    <div className="p-4">
      <ProductsTable actions={actions} />
    </div>
  );
}
