import { randomBytes, createHash } from 'node:crypto'

// Opaque high-entropy refresh token. Only the sha256 hash is stored,
// so a DB leak can't be replayed. Rotation happens on every refresh.
export function generateRefreshToken() {
  const token = randomBytes(48).toString('base64url')
  return { token, tokenHash: hashToken(token) }
}

export function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex')
}
