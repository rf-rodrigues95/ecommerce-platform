"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const { login, token } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    if (token) router.push("/home");
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/${isRegister ? "register" : "login"}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: username, password, role: isRegister ? "USER" : undefined }),
    });

    if (res.ok) {
      if (!isRegister) {
        const data = await res.json();
        login(data.token);
        router.push("/home");
      } else {
        alert("Registration successful! Please login.");
        setIsRegister(false);
      }
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md flex flex-col gap-4">
        {error && <p className="text-red-500 text-center">{error}</p>}
        <label>
          Username
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
        </label>
        <div className="flex gap-2">
          <button type="submit" onClick={() => setIsRegister(false)} className="btn-blue">Login</button>
          <button type="submit" onClick={() => setIsRegister(true)} className="btn-green">Register</button>
        </div>
      </form>
    </div>
  );
}
