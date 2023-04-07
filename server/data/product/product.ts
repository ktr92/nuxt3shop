import { oc_product } from "@prisma/client"
import prisma from "../prisma"

export async function getProductsByCategory(
  categoryId: number,
  page: number,
  takes: number
) {
  const products_id = await prisma.oc_product_to_category.findMany({
    select: {
      product_id: true,
    },
    where: {
      category_id: categoryId,
    },
  })

  const products_array = products_id.map((item: IProductId) => item.product_id)

  const products_count = await prisma.oc_product.aggregate({
    _count: {
      product_id: true,
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

  const products = await prisma.oc_product.findMany({
    take: takes,
    skip: page === 1 ? 0 : (page - 1) * takes,

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
    orderBy: [{ sort_order: "asc" }, { product_id: "asc" }],
  })
  return { products: { ...products }, products_count }
}
