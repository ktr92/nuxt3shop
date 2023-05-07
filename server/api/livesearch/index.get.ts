import { getProductsByLivesearch } from "~~/server/data/product/product"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const products  =
    await getProductsByLivesearch(
      String(query.search)
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
