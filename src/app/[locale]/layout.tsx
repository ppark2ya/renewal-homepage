import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import type { Metadata } from "next";
import { ApolloWrapper } from '@/components/providers/apollo-provider';
import { Toaster } from '@/components/ui/sonner';
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton';
import "../globals.css";

export const metadata: Metadata = {
  title: "Dozn Exchange | Best Rate, Faster Exchange",
  description:
    "365 days, 24 hours, the closest unmanned exchange kiosk. Exchange foreign currency quickly and safely anywhere in the country at Dozn Exchange.",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased">
        <ApolloWrapper>
          <NextIntlClientProvider messages={messages}>
            {children}
            <Toaster />
            <ScrollToTopButton />
          </NextIntlClientProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}