"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { authenticated, setAuthenticated } = useAuth();
  const router = useRouter();
  
  if (!authenticated) return null;

  const handleLogout = async () => {
    await fetch("auth/logout", { 
      method: "POST",
     });
    setAuthenticated(false);
    router.push("/login");
  }

  return (
    <nav className="bg-white/10 backdrop-blur-2xl shadow-lg rounded-lg border border-white/10">
      <div className="flex items-center w-full justify-between px-6 py-1 font-sans">

        <div className="flex items-center gap-4">
          <Link href="/" className="text-black font-medium hover:text-blue-600 transition-colors cursor-pointer">Home</Link>
          <Link href="/products" className="text-black hover:text-blue-600 transition-colors cursor-pointer">Products</Link>
          <Link href="/carts" className="text-black hover:text-blue-600 transition-colors cursor-pointer">Cart</Link>
          <Link href="/orders" className="text-black hover:text-blue-600 transition-colors cursor-pointer">Orders</Link>
        </div>

            <button 
              onClick={handleLogout} 
              className="text-black hover:text-blue-600 cursor-pointer ml-auto">
              Logout
            </button>
      </div>
    </nav>
  );
}
