import { getProductsByLivesearch } from "~~/server/data/product/product"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const products  =
    await getProductsByLivesearch(
      Number(query.take),
      String(query.sort_field),
      String(query.sort_direction),
      query.filters as string,
      query.search as string
    )

  return products

  return sendError(
    event,
    createError({
      statusCode: 404,
      statusMessage: "Page not found",
      fatal: true,
    })
  )
})
