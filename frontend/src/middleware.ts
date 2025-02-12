import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const handleI18nRouting = createMiddleware(routing);
  const token = req.cookies.get("auth_token")?.value;
  const { pathname } = req.nextUrl;
  const [, urlLocale, ...segments] = pathname.split('/');
  const defaultLocale = req.headers.get('x-your-custom-locale') || 'en';
  const locale = urlLocale == 'en' || urlLocale == 'pt' ? urlLocale : defaultLocale;

  if (!token) {
    if (segments[0] === 'login') {
      return handleI18nRouting(req);
    }

    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  if (urlLocale !== 'pt' && urlLocale !== 'en') {
    return NextResponse.redirect(
      new URL(`/${locale}/${[urlLocale, ...segments].join('/')}`, req.url)
    );
  }

  if (segments[0] === 'login') {
    return NextResponse.redirect(new URL(`/${locale}/`, req.url));
  }

  return handleI18nRouting(req);
}

export const config = {
  matcher: ['/', '/(pt|en)/:path*', '/((?!_next/static|_next/image|favicon.ico|api).*)']
};