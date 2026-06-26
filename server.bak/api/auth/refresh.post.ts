export default defineEventHandler(async (event) => {
  const token = getCookie(event, REFRESH_COOKIE)
  if (!token) throw createError({ statusCode: 401, statusMessage: 'No refresh token' })

  const stored = await prisma.refreshToken.findUnique({
    where: { tokenHash: hashToken(token) },
    include: { user: true },
  })

  if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
    clearAuthCookies(event)
    throw createError({ statusCode: 401, statusMessage: 'Invalid refresh token' })
  }

  // Rotation: revoke the used token, issue a brand new pair.
  await prisma.refreshToken.update({
    where: { id: stored.id },
    data: { revokedAt: new Date() },
  })
  await issueSession(event, stored.user)

  return { user: publicUser(stored.user) }
})
