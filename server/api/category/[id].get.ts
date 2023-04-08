import {
  getCategoryPath,
  getCategoryInfo,
} from "~~/server/data/category/category"
import { getProductsByCategory } from "~~/server/data/product/product"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  // get PATH
  const path: string = event.context.params?.id as string
  // get item path-url relation from DB through the PATH
  const cat_path = await getCategoryPath(path)
  if (cat_path) {
    // get item ID from DB through the path
    const cat_id = parseInt(cat_path.query.replace(/^\D+/g, ""))
    // get item from DB through the path
    const category = await getCategoryInfo(cat_id)

    const { products, products_count } = await getProductsByCategory(
      cat_id,
      Number(query.page),
      Number(query.take),
      Number(query.skip)
    )

    if ((category as any).categoryinfo.status) {
      return { ...category, products, products_count }
    }
  }

  return sendError(
    event,
    createError({
      statusCode: 404,
      statusMessage: "Page not found",
      fatal: true,
    })
  )
})
