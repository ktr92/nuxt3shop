import { getCategoryPath, getCategoryInfo } from "~~/server/data/category/category"

export default defineEventHandler(async (event) => {
  const path: string = event.context.params?.id as string
  const cat_path = await getCategoryPath(path)
  if (cat_path) {
    const cat_id = parseInt(cat_path.query.replace(/^\D+/g, ''))
    const category = getCategoryInfo(cat_id)
    return category
  }

  return cat_path
})

