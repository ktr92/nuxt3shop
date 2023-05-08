import { getProductsByFilter } from "~~/server/data/product/product"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const { products, products_count, properties, prices } =
    await getProductsByFilter({
      takes: Number(query.take),
      sort_field: String(query.sort_field),
      sort_direction: String(query.sort_direction),
      filters: query.filters as string,
      categoryId: query.categoryid ? Number(query.categoryid) : undefined,
      keyword: query.search ? (query.search as string) : undefined,
    })

  return { products, products_count, properties, prices }

  return sendError(
    event,
    createError({
      statusCode: 404,
      statusMessage: "Page not found",
      fatal: true,
    })
  )
})
