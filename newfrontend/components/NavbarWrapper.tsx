import Navbar from "./Navbar";
import { cookies } from "next/headers";

export default async function NavbarWrapper() {
  const token = (await cookies()).get("token")?.value || "";
  
  return <Navbar token={token} />;
}
