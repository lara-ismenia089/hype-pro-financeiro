import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hype-pro-financeiro.vercel.app'),
  title: "Hype Pro Financeiro",
  description:
    "Aplicação financeiro desenvolvido por Israel Frota para facilitar a visualização de informações e apoiar a tomada de decisões.",
  authors: [
    { name: "Lara Ismênia" },
    { name: "Ricardo Martins" },
  ],
  keywords: ["finanças", "dashboard", "gestão financeira", "análise de dados"],
  openGraph: {
    title: "Hype Pro Financeiro",
    description:
      "Visualize receitas, despesas e fluxo de caixa em um dashboard financeiro moderno e interativo.",
    type: "website",
    locale: "pt_BR",
    images: ["/hype_logo.png"]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
