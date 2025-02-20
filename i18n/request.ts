import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import { locales } from '@/config/i18n';

export default async function request() {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';
  const locale = pathname.split('/')[1] || 'en';

  if (!locales.includes(locale as any)) {
    return {
      messages: {},
      timeZone: 'America/Chicago',
      now: new Date(),
    };
  }

  return getRequestConfig(async ({ requestLocale }) => {
    return {
      defaultLocale: locale,
      messages: (await import(`../messages/${locale}.json`)).default,
      timeZone: 'America/Chicago',
      now: new Date(),
    };
  });
}
