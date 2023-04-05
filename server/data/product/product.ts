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

  const products_array = products_id.map((item: IProductId) => item.product_id)

  const products = await prisma.oc_product.findMany({
    select: {
      product_id: true,
      status: true,
      image: true,
      price: true,
      sku: true,
      quantity: true,
      manufacturer_id: true,
      sort_order: true,
      oc_product_description: {
        select: {
          name: true,
        },
      },
    },
    where: {
      AND: [
        {
          product_id: {
            in: [...products_array],
          },
          status: true,
        },
      ],
    },
  })

  return products
}
