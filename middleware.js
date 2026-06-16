import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const AUTH_COOKIE = 'voiceforge_token'

function getSecretKey() {
  return new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-change-me')
}

// Routes that require a logged-in user.
const PROTECTED_PREFIXES = ['/dashboard', '/profile', '/history', '/favorites', '/checkout']
// Routes that additionally require role === 'ADMIN'.
const ADMIN_PREFIXES = ['/admin']

export async function middleware(request) {
  const { pathname } = request.nextUrl
  const isAdminRoute = ADMIN_PREFIXES.some((p) => pathname.startsWith(p))
  const isProtectedRoute = isAdminRoute || PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  const token = request.cookies.get(AUTH_COOKIE)?.value

  if (!token) {
    return redirectToLogin(request)
  }

  try {
    const { payload } = await jwtVerify(token, getSecretKey())

    if (isAdminRoute && payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
  } catch {
    return redirectToLogin(request)
  }
}

function redirectToLogin(request) {
  const loginUrl = new URL('/login', request.url)
  loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/profile/:path*',
    '/history/:path*',
    '/favorites/:path*',
    '/checkout/:path*',
  ],
}
