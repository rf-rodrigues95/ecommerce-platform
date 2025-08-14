import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4 text-[17px] font-medium">
        <div className="flex space-x-8">
          <Link
            to="/"
            className="no-underline text-gray-800 hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="no-underline text-gray-800 hover:text-blue-600 transition-colors"
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="no-underline text-gray-800 hover:text-blue-600 transition-colors"
          >
            Cart
          </Link>
          <Link
            to="/orders"
            className="no-underline text-gray-800 hover:text-blue-600 transition-colors"
          >
            Order History
          </Link>
        </div>
        <div>
          <Link
            to="/login"
            className="no-underline text-gray-800 hover:text-blue-600 transition-colors"
          >
            Logout(not implemented)
          </Link>
        </div>
      </div>
    </nav>
  );
}
