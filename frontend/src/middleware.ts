import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { url } from "inspector";

export default createMiddleware(routing);

export function middleware(req: NextRequest) {
  const handleI18nRouting = createMiddleware(routing);
  const [, urlLocale, ...segments] = req.nextUrl.pathname.split('/');

  if(segments[0] === 'login') {
    return handleI18nRouting(req);
  }

  const locale = urlLocale == 'en' || urlLocale == 'pt' ? urlLocale : routing.defaultLocale;
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    const handleI18nRouting = createMiddleware(routing);
    return handleI18nRouting(req);
  } catch (error) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }
}

export const config = {
  matcher: ['/', '/(pt|en)/:path*']};