import { getProductsByLivesearch } from "~~/server/data/product/product"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const products  =
    await getProductsByLivesearch(
      String(query.search)
    )

  return products
})
