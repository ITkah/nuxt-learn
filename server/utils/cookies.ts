import type { H3Event } from 'h3'

const isProd = process.env.NODE_ENV === 'production'

export const ACCESS_COOKIE = 'access_token'
export const REFRESH_COOKIE = 'refresh_token'

const ACCESS_MAX_AGE = 60 * 15            // 15 min
const REFRESH_MAX_AGE = 60 * 60 * 24 * 7  // 7 days

// Refresh cookie scoped to /api/auth so it's only ever sent to auth routes.
const REFRESH_PATH = '/api/auth'

export function setAuthCookies(event: H3Event, accessToken: string, refreshToken: string) {
  setCookie(event, ACCESS_COOKIE, accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: ACCESS_MAX_AGE,
  })
  setCookie(event, REFRESH_COOKIE, refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: REFRESH_PATH,
    maxAge: REFRESH_MAX_AGE,
  })
}

export function clearAuthCookies(event: H3Event) {
  deleteCookie(event, ACCESS_COOKIE, { path: '/' })
  deleteCookie(event, REFRESH_COOKIE, { path: REFRESH_PATH })
}
