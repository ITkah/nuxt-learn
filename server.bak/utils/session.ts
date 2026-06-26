import type { H3Event } from 'h3'

// Issues a fresh access token + a new (rotated) refresh token row,
// then sets both as httpOnly cookies.
export async function issueSession(event: H3Event, user: { id: string; role: string }) {
  const accessToken = await signAccessToken({ sub: user.id, role: user.role })

  const { token, tokenHash } = generateRefreshToken()
  const { refreshTokenTtlDays } = useRuntimeConfig()
  const expiresAt = new Date(Date.now() + refreshTokenTtlDays * 86_400_000)

  await prisma.refreshToken.create({ data: { userId: user.id, tokenHash, expiresAt } })
  setAuthCookies(event, accessToken, token)
}
