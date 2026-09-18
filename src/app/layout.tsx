import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NaturalSV | Gestión de bienestar natural",
  description: "Plataforma de ventas, inventario y seguimiento de pedidos de NaturalSV.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" className={`${inter.variable} ${playfair.variable}`}><body><AppProvider>{children}</AppProvider></body></html>;
}

