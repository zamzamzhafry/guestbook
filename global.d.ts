import { PrismaClient } from '@prisma/client'

declare global {
    // This prevents TypeScript from complaining about `global.prisma`
    var prisma: PrismaClient | undefined
}
