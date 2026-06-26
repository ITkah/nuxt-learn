import { SignJWT, jwtVerify } from 'jose'

const secret = () => new TextEncoder().encode(useRuntimeConfig().jwtAccessSecret)

export interface AccessClaims {
  sub: string
  role: string
}

// Short-lived stateless access token (verified without a DB hit).
export async function signAccessToken(claims: AccessClaims) {
  const { accessTokenTtl } = useRuntimeConfig()
  return new SignJWT({ role: claims.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(claims.sub)
    .setIssuedAt()
    .setExpirationTime(accessTokenTtl)
    .sign(secret())
}

export async function verifyAccessToken(token: string): Promise<AccessClaims> {
  const { payload } = await jwtVerify(token, secret())
  return { sub: payload.sub as string, role: payload.role as string }
}
