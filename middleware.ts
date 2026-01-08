// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const locales = ['en', 'id'];
const defaultLocale = 'id';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip file publik & API
  if (
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Kalau sudah ada prefix locale
  if (locales.some((locale) => pathname.startsWith(`/${locale}`))) {
    return NextResponse.next();
  }

  // Redirect ke default locale
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     * - locales (translation files)
     * - files with extensions (like .png, .jpg, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|locales|.*\\..*).*)',
  ],
};
