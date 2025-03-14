import { ThemeProvider } from "@/components/shared/theme-provider";
import { routing } from "@/i18n/routing";
import { Directions, Languages, Locale } from "@/lib/types/localization";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "StudyFlow",
    template: "%s - StudyFlow",
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
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <NextIntlClientProvider messages={messages}>
        <body className={`${inter.className} antialiased`}>
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
