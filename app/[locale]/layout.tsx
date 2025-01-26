import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/app/_components/ui/theme-provider";
import { ThemeColorProvider } from '@/app/_components/providers/theme-context';
import { Navbar } from "@/app/_components/layout/navbar";
import { Footer } from "@/app/_components/layout/footer";
import { locales } from '@/config/i18n';

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: 'swap',
  variable: '--space-grotesk',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) notFound();

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body className={`${spaceGrotesk.className} ${spaceGrotesk.variable} min-h-screen bg-background dark:bg-[#1B1B1B] font-sans antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ThemeColorProvider>
              <div className="relative flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
            </ThemeColorProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
