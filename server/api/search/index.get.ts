import { getProductsByFilter } from "~~/server/data/product/product"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const { products, products_count, properties, prices } =
    await getProductsByFilter(
      Number(query.take),
      String(query.sort_field),
      String(query.sort_direction),
      query.filters as string,
      undefined,
      query.search as string
    )

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
