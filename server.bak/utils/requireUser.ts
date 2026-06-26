import type { H3Event } from 'h3'

// Reads the access token from the httpOnly cookie and verifies it.
// Throws 401 if missing/invalid. Use as a guard in protected handlers.
export async function requireUser(event: H3Event) {
  const token = getCookie(event, ACCESS_COOKIE)
  if (!token) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  try {
    const claims = await verifyAccessToken(token)
    return { id: claims.sub, role: claims.role }
  } catch {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
}
