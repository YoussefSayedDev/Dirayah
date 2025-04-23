import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";
import { Directions, Languages, Locale } from "@/types/localization";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter, Tajawal } from "next/font/google";
import { notFound } from "next/navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-english" });
const tajawal = Tajawal({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Dirayah",
    template: "%s - Dirayah",
  },
  description: "A learning management system for students",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const dir =
    (locale as Locale) === Languages.Arabic ? Directions.RTL : Directions.LTR;

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${tajawal.variable}`}
      suppressHydrationWarning
    >
      <body
        className={cn(
          "antialiased",
          locale === Languages.Arabic ? "font-arabic" : "font-english",
        )}
      >
        <SessionProvider>
          <NextIntlClientProvider messages={messages}>
            {/* <AuthProvider> */}
            <ThemeProvider>
              <main>{children}</main>
              <Toaster />
            </ThemeProvider>
            {/* </AuthProvider> */}
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
