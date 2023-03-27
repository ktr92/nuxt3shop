import prisma from '../prisma'

export async function getMenu() {
  const db_menu = prisma.oc_mega_menu.findMany({
    select: {
      id: true,
      name: true,
      parent_id: true,
      link: true,
      new_window: true,
      submenu: {
        select: {
          id: true,
          parent_id: true,
          content: true,
          new_window: true,
          link: true,
          name: true,
          submenu: {
            select: {
              id: true,
              parent_id: true,
              content: true,
              new_window: true,
              link: true,
              name: true
            }
          },
        }
      },


    },
    where: {
      module_id: 0
    },
    orderBy: {
      rang: 'asc'
    }
  })
  return db_menu
}