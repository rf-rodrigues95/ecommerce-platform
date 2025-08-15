import Link from "next/link";

export default function Navbar({ token }: { token: string }) {
  if (!token) return null;

  return (
    <nav className="border-b border-gray-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4 text-[17px] font-medium">
        <div className="flex space-x-8">
          <Link href="/" className="no-underline text-gray-800 hover:text-blue-600 transition-colors">Home</Link>
          <Link href="/products" className="no-underline text-gray-800 hover:text-blue-600 transition-colors">Products</Link>
          <Link href="/cart" className="no-underline text-gray-800 hover:text-blue-600 transition-colors">Cart</Link>
          <Link href="/orders" className="no-underline text-gray-800 hover:text-blue-600 transition-colors">Orders</Link>
        </div>
        <div>
          {token && (
            <button className="text-gray-800 hover:text-blue-600">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
