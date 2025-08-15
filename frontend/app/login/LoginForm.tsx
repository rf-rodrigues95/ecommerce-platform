"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext"; 

interface Props {
  loginAction: (username: string, password: string, isRegister:boolean) => Promise<string>;
}

export default function LoginForm({ loginAction }: Props) {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const result = await loginAction(username, password, isRegister);
        if (!isRegister) {
            login(result);
            router.push("/home");
        } else {
            alert("Registration successful! Please login.");
            setIsRegister(false);
        }
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred");
        }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={onSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md flex flex-col gap-4">
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
