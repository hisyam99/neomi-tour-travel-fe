import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navigation from "./_components/layouts/Navigation";
import { Geist_Mono, Playfair_Display } from "next/font/google";
import Footer from "./_components/layouts/Footer";
import AOSProvider from "../_components/common/AOSProvider";
import Script from "next/script";

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
    <html lang={locale}>
      <body
        className={`${playfair.variable} ${geistMono.variable} font-playfair antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AOSProvider>
            <div className="sticky top-0 z-30">
              <Navigation />
            </div>
            {children}
            <div className="container mx-auto">
              <div className="gtranslate_wrapper"></div>
            </div>
            <Script id="gtranslate-settings">
              {`window.gtranslateSettings = {"default_language":"en","languages":["en","id","zh-CN","fr","es","de","ja","ko","th"],"wrapper_selector":".gtranslate_wrapper","position":"bottom_right","switcher_horizontal_position":"right","switcher_vertical_position":"bottom"}`}
            </Script>
            <Script
              src="https://cdn.gtranslate.net/widgets/latest/float.js"
              strategy="afterInteractive"
            />
            <Footer />
          </AOSProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
