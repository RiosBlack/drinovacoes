import type { Metadata } from "next";
import "./globals.css";
import { Comfortaa } from "next/font/google";

export const metadata: Metadata = {
  title: "DR Inovações",
  description: "Transformando ideias em tecnologia",
};

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-comfortaa",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${comfortaa.variable} dark antialiased`}>
        {children}
      </body>
    </html>
  );
}
