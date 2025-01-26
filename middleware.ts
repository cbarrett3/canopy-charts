import createMiddleware from 'next-intl/middleware';
import { locales } from '@/config/i18n';

export default createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: true
});

// Matcher entries that don't start with '/' are treated as middleware.ts matchers
export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … if they contain a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // Match all pathnames within `/api`, except for
    // - … if they start with `/api/auth` or `/api/webhook`
    // - … if they contain a dot (e.g. `favicon.ico`)
    '/api/((?!auth|webhook|.*\\..*).*)' 
  ]
};
