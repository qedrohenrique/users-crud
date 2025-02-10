import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLocale } from "next-intl/server";

export default createMiddleware(routing);

export function middleware(req: NextRequest) {
  const handleI18nRouting = createMiddleware(routing);
  const token = req.cookies.get("auth_token")?.value;
  const [, urlLocale, ...segments] = req.nextUrl.pathname.split('/');
  const selectedLocale = getLocale();
  const locale = urlLocale == 'en' || urlLocale == 'pt' ? urlLocale : selectedLocale;

  if (!token) {
    if (segments[0] === 'login') {
      return handleI18nRouting(req);
    }

    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  if(urlLocale !== 'pt' && urlLocale !== 'en') {
    return NextResponse.redirect(
      new URL(`/${selectedLocale}/${[urlLocale, ...segments].join('/')}`, req.url)
    );
  }

  if (segments[0] === 'login') {
    return NextResponse.redirect(new URL(`/${locale}/`, req.url));
  }

  return handleI18nRouting(req);
}

export const config = {
  matcher: ['/', '/(pt|en)/:path*', '/((?!_next/static|_next/image|favicon.ico|api).*)']};