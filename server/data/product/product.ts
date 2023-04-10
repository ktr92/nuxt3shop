import prisma from "../prisma"
import { productTransformer } from "~~/server/api/transformers/products"

export async function getProductsByCategory(
  categoryId: number,
  page: number,
  takes: number,
  skip: number,
  sort_field: string,
  sort_direction: string
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

  /*  let sort = null

  if (sort_field === "name") {
    sort = [{ [sort_field as string]: sort_direction }, { product_id: "desc" }]
  } else {
    sort = [
      { oc_product_description: { sort_field: sort_direction } },
      { product_id: "desc" },
    ]
  } */

  /* orderBy: {
      oc_product_description: {
        name: 'desc',
      },
    }, */

  let products = null
  if (sort_field === "name") {
    products = (await prisma.oc_product_description.findMany({
      take: takes,
      skip: 0,
      select: {
        name: true,
        product_id: true,
        product_description: {
          select: {
            product_id: true,
            status: true,
            image: true,
            price: true,
            sku: true,
            quantity: true,
            manufacturer_id: true,
            sort_order: true,
          },
        },
      },
      orderBy: [
        {
          name: "asc",
        },
      ],
      where: {
        AND: [
          {
            product_id: {
              in: [...products_array],
            },
          },
        ],
      },
    })) as productDescription[]
  } else {
    products = (await prisma.oc_product.findMany({
      take: takes,
      skip: 0,

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

      orderBy: [
        { [sort_field as string]: sort_direction },
        { product_id: "desc" },
      ],
    })) as productWithDescription[]
  }

  /* const products1 = await prisma.$queryRawUnsafe(
    `SELECT model FROM oc_product WHERE product_id IN (${[
      ...products_array,
    ]}) ORDER BY ${sort_field} ASC, product_id DESC`
  )
  console.log(products1) */

  return { products: { ...productTransformer(products) }, products_count }
}
