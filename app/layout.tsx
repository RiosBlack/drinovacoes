import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "DR Inovações — Desenvolvimento de Software",
  description:
    "Empresa de desenvolvimento de software. Sistemas, sites, e-commerce e automações com IA.",
};

const raleway = Raleway({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-raleway",
  display: "optional",
  adjustFontFallback: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bitcount+Single:wght@600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${raleway.variable} antialiased`}>{children}</body>
    </html>
  );
}
