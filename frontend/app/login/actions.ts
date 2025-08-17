"use server";

import { loginUser, registerUser } from "../lib/api";

export async function handleLogin(username: string, password: string) {
  return loginUser(username, password);
}

export async function handleRegister(username: string, password: string) {
  return registerUser(username, password);
}