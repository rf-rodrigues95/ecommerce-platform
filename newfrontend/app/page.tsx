import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function RootPage() {
  const token = (await cookies()).get("token")?.value;

  if (token)
    redirect("/home");
  else
    redirect("/login");
}
