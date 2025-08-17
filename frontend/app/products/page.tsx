import { deleteProduct, getProducts } from "./actions";
import ProductsTable from "./ProductsTable";

export default function ProductsPage() {
  const actions = { getProducts, deleteProduct };

  return (
    <div className="p-4">
      <ProductsTable actions={actions} />
    </div>
  );
}
