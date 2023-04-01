import prisma from '../prisma'
import { oc_mega_menu } from '.prisma/client';

export async function getMenu() {
  const db_menu = prisma.oc_mega_menu.findMany({
    select: {
      id: true,
      name: true,
      parent_id: true,
      link: true,
      new_window: true,
      submenu_columns: true,

      submenu: {
        select: {
          id: true,
          parent_id: true,
          content: true,
          new_window: true,
          link: true,
          name: true,
          submenu_columns: true,
          istitle: true,
          submenu: {
            select: {
              id: true,
              parent_id: true,
              content: true,
              new_window: true,
              link: true,
              name: true,
              submenu_columns: true,
              istitle: true,
            },
            where: {
              status: 1
            },
            orderBy: [
              {
                rang: 'asc'
              },
              {
                name: 'asc'
              }
            ]

          },
        },

        where: {
          status: 1
        },
        orderBy: [
          {
            rang: 'asc'
          },
          {
            name: 'asc'
          }
        ]
      },
    },
    where: {
      module_id: 0,
      status: 1
    },
    orderBy: {
      rang: 'asc'
    }
  })
  return db_menu
}

export async function createMenu(menuData: oc_mega_menu) {
  return prisma.oc_mega_menu.create({
    data: menuData
  })
}
export async function deleteMenu(menuId: number) {
  return prisma.oc_mega_menu.update({
    where: {
      id: menuId
    },
    data: {
      status: -1
    }
  })
}
export async function updateMenu(menuId: number, menuData: oc_mega_menu) {
  return prisma.oc_mega_menu.update({
    where: {
      id: menuId
    },
    data: {
      ...menuData
    }
  })
}