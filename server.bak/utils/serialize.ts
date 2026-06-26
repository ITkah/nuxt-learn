import type { User } from '../generated/prisma/client'

// Never leak passwordHash to the client.
export function publicUser(u: User) {
  return {
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role,
    createdAt: u.createdAt,
  }
}
