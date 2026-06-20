import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

// Singleton — avoid exhausting connections on dev HMR.
const store = globalThis as unknown as { prisma?: PrismaClient }

// Prisma 7 requires a driver adapter; URL comes from .env (DATABASE_URL).
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })

export const prisma = store.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') store.prisma = prisma
