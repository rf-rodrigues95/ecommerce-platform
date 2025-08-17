"use client";
import { User } from "@/lib/types";
import { createContext, useState, useEffect, useContext, ReactNode } from "react";

interface AuthContextType {
  authenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  user?: User;
  setUser: (user: User) => void; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("auth/status", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setAuthenticated(!!data.authenticated); // or just set authenticated=true if you don't return token
        } else {
          setAuthenticated(false);
        }
      } catch {
        setAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
