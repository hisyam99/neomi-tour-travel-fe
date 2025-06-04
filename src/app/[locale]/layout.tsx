import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navigation from "./_components/layouts/Navigation";
import { Geist_Mono, Playfair_Display } from "next/font/google";
import Footer from "./_components/layouts/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
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
    <html data-theme="bumblebee" lang={locale}>
      <body className={`${playfair.variable} ${geistMono.variable} font-playfair antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="sticky top-0 z-30">
            <Navigation />
          </div>
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
