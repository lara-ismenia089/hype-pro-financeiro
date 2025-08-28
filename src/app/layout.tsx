import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dashboard Financeiro",
  description:
    "Dashboard financeiro desenvolvido por Israel Frota para facilitar a visualização de informações e apoiar a tomada de decisões.",
  authors: [
    { name: "Lara Ismênia" },
    { name: "Ricardo Martins" },
  ],
  keywords: ["finanças", "dashboard", "gestão financeira", "análise de dados"],
  openGraph: {
    title: "Dashboard Financeiro",
    description:
      "Visualize receitas, despesas e fluxo de caixa em um dashboard financeiro moderno e interativo.",
    type: "website",
    locale: "pt_BR",
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
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
