import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Global initialization logic
const connectionString = process.env.DATABASE_URL || ''
let client: PrismaClient

try {
  // Pass connection string directly to the adapter
  const adapter = new PrismaMariaDb(connectionString)
  client = globalForPrisma.prisma ?? new PrismaClient({ adapter })
} catch {
  client = globalForPrisma.prisma ?? new PrismaClient()
}

export const prisma = client

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
