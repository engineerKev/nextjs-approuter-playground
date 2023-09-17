import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['en-US', 'es-CO'];

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  console.log('request headers: ', request.headers);
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  
  const langauges = new Negotiator({headers: negotiatorHeaders}).languages();
  const singleLanguage = new Negotiator({headers: negotiatorHeaders}).language();

  const locale = matchLocale(langauges, locales, 'en-US');
  console.log( 'negotiatorHeaders: ', negotiatorHeaders, '\nlangauges: ', langauges, '\nlocale: ', locale, '\nlanguage: ', singleLanguage)
  return locale;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  console.log('pathanme: ', pathname, '\npathnameIsMissingLocale: ', pathnameIsMissingLocale)
  if(pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    )
  }
}
export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|graphql|.*\\..*).*)']
}