import { getRequestConfig } from 'next-intl/server';
import { locales } from '@/config/i18n';
 
export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) {
    return {
      messages: {},
      timeZone: 'America/Chicago',
      now: new Date(),
      locale,
    };
  }

  return {
    messages: (await import(`@/messages/${locale}.json`)).default,
    timeZone: 'America/Chicago',
    now: new Date(),
    locale,
  };
});
