import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navigation from "./_components/layouts/Navigation";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

async function getMessages(locale: string) {
  try {
    return (await import(`../../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="sticky top-0 z-30">
            <Navigation />
          </div>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
