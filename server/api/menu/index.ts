import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler((event) => {

  const db_menu = prisma.nx_menu.findMany({
    include: {
      nx_submenu: true
    }
  })
  return db_menu

})