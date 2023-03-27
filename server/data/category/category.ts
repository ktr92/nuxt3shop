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
  const db_category = prisma.oc_category_description.findFirst({
    select: {
      category_id: true,
      name: true,
      description: true,
      meta_description: true,
      meta_keyword: true,
      meta_title: true,
      meta_h1: true,
      categoryinfo: {
        select: {
          image: true,
          parent_id: true,
          status: true
        }
      }
    },
    where: {
      category_id: id,
      language_id: 1
    }
  })
  return db_category
}