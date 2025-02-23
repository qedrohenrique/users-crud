import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/providers/auth-provider";
import DictionaryProvider from "@/lib/providers/dictionary-provider";
import ReactQueryProvider from "@/lib/providers/react-query-provider";
import ThemeProvider from "@/lib/providers/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getDictionary } from "../../lib/dictionaries";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
    <html lang={locale} className='dark'>
      <body
        className={`${inter.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ReactQueryProvider>
              <DictionaryProvider dictionary={dictionary}>
                <TooltipProvider>
                  {children}
                  <Toaster />
                </TooltipProvider>
              </DictionaryProvider>
            </ReactQueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html >
  );
}
