import { cookies } from "next/headers";
import { ApiResponse } from "../types/api";

type Method = "GET" | "POST" | "PUT" | "DELETE";

export async function serverFetch<T>(path: string, method: Method="GET", body?:unknown, token?: string):
Promise<ApiResponse<T>> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: ["GET", "HEAD", "DELETE"].includes(method) ? undefined : JSON.stringify(body),
        credentials: "include",
        cache: "no-store"
    });

    const contentType = res.headers.get("content-type") || "";
    let data: T | undefined = undefined;
    if (res.status !== 204 && contentType.includes("application/json")) {
      data = await res.json();
    }

    if(!res.ok) {
      const errorMsg = data && typeof data === "object" && "error" in data
        ? (data as { error?: string }).error
        : res.statusText;

      return { success: false, status: res.status, error: errorMsg };
    }

    return { success: true, status: res.status, data: data }; 
}

export async function registerUser<T>(username: string, password: string) : Promise<ApiResponse<T>> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({login: username, password, role: "USER"}),
        credentials: "include"
  });

  if (!res.ok) {
    return { success: false, status: res.status, error: "Invalid Register" };
  }

  return { success: true, status: res.status};
}

export async function loginUser<T>(username: string, password: string) : Promise<ApiResponse<T>>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({login: username, password}),
        credentials: "include"
  });

  if (!res.ok) {
    return { success: false, status: res.status, error: "Invalid Login" };
  }  

  const data = await res.json();
  (await cookies()).set("token", data.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 2 * 60 * 60
    });

  return { success: true, status: res.status};
}