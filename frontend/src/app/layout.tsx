import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/lib/providers/react-query-provider";
import { AuthProvider } from "@/lib/providers/auth-provider";
import ThemeProvider from "@/lib/providers/theme-provider";
import { getDictionary } from "../lib/dictionaries";
import DictionaryProvider from "@/lib/providers/dictionary-provider";

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
  const dictionary = await getDictionary(locale)

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} antialiased`}
      >
        <AuthProvider>
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <DictionaryProvider dictionary={dictionary}>
                {children}
              </DictionaryProvider>
            </ThemeProvider>
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
