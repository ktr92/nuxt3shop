import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient }

let prisma: PrismaClient = globalForPrisma.prisma

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  prisma = globalForPrisma.prisma || new PrismaClient()
}

export default prisma
