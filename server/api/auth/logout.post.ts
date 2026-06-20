export default defineEventHandler(async (event) => {
  const token = getCookie(event, REFRESH_COOKIE)
  if (token) {
    await prisma.refreshToken.updateMany({
      where: { tokenHash: hashToken(token), revokedAt: null },
      data: { revokedAt: new Date() },
    })
  }
  clearAuthCookies(event)
  return { ok: true }
})
