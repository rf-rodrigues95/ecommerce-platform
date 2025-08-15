"use client";

import {createContext, useState, useContext, useEffect, ReactNode } from 'react';

type AuthContextType = {
  token: string | null;
  login: (newToken: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: ReactNode}) {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const match = document.cookie.match(/(^| )token=([^;]+)/);
        return match ? setToken(match[2]) : setToken(null);
    }, []);

    const login = (newToken: string) => {
        document.cookie = `token=${newToken}; path=/`;
        setToken(newToken);
    };

    const logout = () => {
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1945 00:00:00 GMT";
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};