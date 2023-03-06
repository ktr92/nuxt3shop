import prisma from '../prisma'

export async function getMenu() {
  const db_menu = prisma.nx_menu.findMany({
    include: {
      nx_submenu: true
    }
  })
  return db_menu
}