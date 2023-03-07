import prisma from '../prisma'

export async function getMenu() {
  const db_menu = prisma.nx_menu.findMany({
    orderBy: {
      nx_menu_sort: 'asc',
    },
  })
  return db_menu
}