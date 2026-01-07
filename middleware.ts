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
  matcher: ['/((?!_next|favicon.ico|images|locales|.*\\..*).*)'],
};
