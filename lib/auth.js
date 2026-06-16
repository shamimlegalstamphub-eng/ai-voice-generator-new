import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { nanoid } from 'nanoid'
import { prisma } from './prisma'

export const AUTH_COOKIE = 'voiceforge_token'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

function getSecretKey() {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set')
  }
  return new TextEncoder().encode(secret)
}

// ---------------------------------------------------------------------------
// Passwords
// ---------------------------------------------------------------------------

export async function hashPassword(password) {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash)
}

// ---------------------------------------------------------------------------
// JWT
// ---------------------------------------------------------------------------

/**
 * Sign a JWT containing the minimal session payload.
 * @param {{ id: string, email: string, role: string }} payload
 */
export async function signAuthToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(getSecretKey())
}

/**
 * Verify a JWT and return its payload, or null if invalid/expired.
 */
export async function verifyAuthToken(token) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey())
    return payload
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Cookies (for use inside Route Handlers / Server Components)
// ---------------------------------------------------------------------------

export function setAuthCookie(token) {
  cookies().set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export function clearAuthCookie() {
  cookies().set(AUTH_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
}

// ---------------------------------------------------------------------------
// Session helpers
// ---------------------------------------------------------------------------

/**
 * Reads the auth cookie, verifies it, and loads the current user from the
 * database (without the password hash). Returns null if not authenticated.
 */
export async function getSessionUser() {
  const token = cookies().get(AUTH_COOKIE)?.value
  if (!token) return null

  const payload = await verifyAuthToken(token)
  if (!payload?.id) return null

  const user = await prisma.user.findUnique({
    where: { id: payload.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      emailVerified: true,
      creditsTotal: true,
      creditsRemaining: true,
      referralCode: true,
      createdAt: true,
      subscription: { select: { plan: true, status: true, currentPeriodEnd: true } },
    },
  })

  return user
}

/**
 * Throws a Response (401) if there is no authenticated user. Use inside
 * Route Handlers: `const user = await requireUser()`.
 */
export async function requireUser() {
  const user = await getSessionUser()
  if (!user) {
    throw json401()
  }
  return user
}

/**
 * Throws a Response (403) if the authenticated user is not an admin.
 */
export async function requireAdmin() {
  const user = await requireUser()
  if (user.role !== 'ADMIN') {
    throw new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  return user
}

function json401() {
  return new Response(JSON.stringify({ error: 'Unauthorized' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  })
}

// ---------------------------------------------------------------------------
// Random tokens (email verification / password reset)
// ---------------------------------------------------------------------------

export function generateToken() {
  return nanoid(40)
}
