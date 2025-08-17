"use server";

import { User, UserRole } from "@/lib/types";
import { loginUser, registerUser } from "../../lib/api";

export async function handleLogin(username: string, password: string) {
  const res = await loginUser<User>(username, password);
  if (!res.success || !res.data) return res;

  const user: User = {
    id: res.data.id,
    username: res.data.username,
    role: res.data.role === "admin" ? UserRole.ADMIN : UserRole.USER,
  };

  return { ...res, data: user };
}

export async function handleRegister(username: string, password: string) {
  return registerUser(username, password);
}