import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import NavbarWrapper from "@/components/NavbarWrapper";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
            <NavbarWrapper />            
            <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
