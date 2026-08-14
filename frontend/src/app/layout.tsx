import type { Metadata } from "next";

import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexus Games | Administración",
  description: "Panel administrativo de la tienda de videojuegos Nexus Games.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
