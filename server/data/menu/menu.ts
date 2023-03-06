import prisma from '../prisma'

export async function getMenu() {
  const db_menu = prisma.nx_menu.findMany({})
  return db_menu
}