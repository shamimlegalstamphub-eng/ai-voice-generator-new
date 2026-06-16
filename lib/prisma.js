import { PrismaClient } from '@prisma/client'

// Prevent multiple PrismaClient instances in development due to module
// reloading. See: https://www.prisma.io/docs/guides/nextjs
const globalForPrisma = globalThis

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma
