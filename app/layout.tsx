import type { Metadata } from "next";
import { Nunito, Raleway } from "next/font/google";
import WhatsAppFloat from "./_components/WhatsAppFloat";
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

/** Sans arredondada e pesada — mais próxima do “dr” do logo-mark */
const nunito = Nunito({
  subsets: ["latin", "latin-ext"],
  weight: ["800", "900"],
  variable: "--font-nunito",
  display: "swap",
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
      <body className={`${raleway.variable} ${nunito.variable} antialiased`}>
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
