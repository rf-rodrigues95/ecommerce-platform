"use server";
export async function authenticateUser(username: string, password: string, isRegister: boolean): Promise<string> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/${isRegister ? "register" : "login"}`;
        
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: username, password, role: isRegister ? "USER" : undefined }),
    });

    if (!res.ok)
        throw new Error('Invalid username or password');

    if (!isRegister) {
        const data: { token: string } = await res.json();
        return data.token; // only for login
    } else return "";
}
