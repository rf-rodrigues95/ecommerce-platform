/* "use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation.js";
import { useAuth } from "../context/AuthContext.js";

export default function PrivateRoute({ children } : {children : ReactNode}) {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) router.push("/login");
  }, [token, router]);

  if (!token) return null;

  return <>{children}</>;
}
 */