import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Users Crud Dashboard",
  description: "A CRUD dashboard for managing users",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: 'en' | 'pt' }
}) {
  const locale = (await params).locale

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
