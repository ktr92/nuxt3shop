import prisma from "../prisma"

export async function getProductsByCategory(categoryId: number) {
  const products_id = await prisma.oc_product_to_category.findMany({
    select: {
      product_id: true,
    },
    where: {
      category_id: categoryId,
    },
  })

  /* const products = await prisma.oc_product.findMany({
    where: {
      product_id: {
        in: [...products_id]
      }
    }
  }) */

  return products_id
}
