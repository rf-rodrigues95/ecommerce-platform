import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  return proxyRequest(req, params);
}

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  return proxyRequest(req, params);
}

async function proxyRequest(req: NextRequest, params: { path: string[] } | Promise<{ path: string[]}>) {
  const { path } = await params;
  const targetUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${path.join("/")}${req.nextUrl.search}`;

  const token = (await cookies()).get("token")?.value;  

  const res = await fetch(targetUrl, {
    method: req.method,
    headers: {
      "Content-Type": req.headers.get("content-type") || "",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: ["GET", "HEAD"].includes(req.method) ? undefined : await req.text(),
    credentials: "include",
  });

  //BACKEND RESPONSE
  const cloned = res.clone();
  if (path[0] === "auth" && path[1] === "login" && res.ok) {
    try {
        const json = await res.json();
        const response = new NextResponse(JSON.stringify(json), { status: res.status });

        response.cookies.set("token", json.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 2 * 60 * 60, // match JWT expiration
        });
        
        return response;
    } catch {
      console.log("failed");
    }
  }

  if (path[0] === "auth" && path[1] === "logout" && res.ok) {
    const data = await res.text();
    const cookieStore = await cookies();
    cookieStore.set("token", "", { maxAge: 0, path: "/" });
    return new NextResponse(data, { status: res.status });
  }

  return new NextResponse(cloned.body, { status: res.status });
}