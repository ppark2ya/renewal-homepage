import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /_vercel (Vercel internals)
  // - Static files (images, fonts, etc.)
  // IMPORTANT: When adding new locales to routing.ts, also update this pattern
  // Current locales: en, ko, jp, cn
  matcher: ['/', '/(en|ko|jp|cn)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
