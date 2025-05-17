import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import Navigation from "./_components/layouts/Navigation";

async function getMessages(locale: Locale) {
  try {
    return (await import(`../../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages(locale);

  return (
    <div>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <div className="sticky top-0 z-30">
          <Navigation />
        </div>
        {children}
      </NextIntlClientProvider>
    </div>
  );
}
