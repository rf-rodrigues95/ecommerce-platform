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
      setProducts( prev => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full table-fixed text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
                <th scope="col" className="px-6 py-3 w-[700px]">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3 w-[230px]">
                  <div className="flex items-center">
                    Price
                    <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                    </svg></a>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 w-[230px]">
                    <div className="flex items-center">
                      Stock
                      <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                      </svg></a>
                    </div>
                </th>
                <th scope="col" className="px-6 py-3 w-[280px] text-center">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600" key={p.id}>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {p.name}
              </th>
              <td className="px-6 py-4">€{p.price.toFixed(2)}</td>
              <td className="px-6 py-4">{p.stock}</td>
              <td className="px-6 py-4">
                <div className="flex gap-4 justify-center">
                    {/* <a href="#" className="font-medium text-red-400 dark:text-red-500 hover:underline">Delete</a> */}
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-2 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-100 text-red-300 cursor-pointer">
                      Delete
                    </button>
                    <button
                      className="px-2 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-100 text-blue-300 cursor-pointer">
                        Edit
                    </button>
                    <button 
                      className="px-2 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-100 text-green-300 cursor-pointer">
                        Add to Cart
                    </button>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
      </table>
    </div>
  );
}
