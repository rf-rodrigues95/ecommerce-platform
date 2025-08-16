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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-900 via-pink-700 to-indigo-800">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <form
        onSubmit={onSubmit}
        className="relative z-10 bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl w-[400px] h-[350px] flex flex-col justify-center items-center gap-4"
      >
        <div className="flex flex-col gap-3 w-[380px] h-[200px]">
          <label className="flex flex-col">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 h-[40px] text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="flex flex-col">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 h-[40px] text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <button
            type="submit"
            onClick={() => setIsRegister(false)}
            className="w-[380px] h-[45px] bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition-colors cursor-pointer"
          >
            Iniciar Sessão
          </button>
        </div>

        <div className="flex items-center gap-2 my-4 w-[380px]">
          <hr className="flex-1 border-gray-300" />
        </div>

        <div className="flex flex-col gap-4 h-[70px]">
          <button
            type="submit"
            onClick={() => setIsRegister(true)}
            className="w-[170px] h-[40px] bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors cursor-pointer"
          >
            Criar Nova Conta
          </button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );


}
