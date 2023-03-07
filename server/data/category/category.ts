import prisma from '../prisma'

export async function getCategoryPath(path: string) {
  const db_category = prisma.oc_url_alias.findFirst({
    select: {
      query: true,
      keyword: true
    },
    where: {
      keyword: path
    }
  })
  return db_category
}

export async function getCategoryInfo(id: number) {
  const db_category = prisma.oc_category_description.findMany({

    include: {
      category: true
    }
  })
  return db_category
}