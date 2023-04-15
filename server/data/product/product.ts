import prisma from "../prisma"
import { productTransformer } from "~~/server/api/transformers/products"
import { Prisma } from "@prisma/client"

function productsQuery(products: Array<number>) {
  const product_query = {
    where: {
      AND: [
        {
          product_id: {
            in: [...products],
          },
        },
      ],
    },
  }
  return product_query
}

const productSelect = {
  product_id: true,
  status: true,
  image: true,
  price: true,
  sku: true,
  quantity: true,
  manufacturer_id: true,
  sort_order: true,
}

const descriptionSelect = {
  name: true,
  product_id: true,
}

export async function getProductsIdByCategory(categoryId: number) {
  const products_id: Array<IProductId> =
    await prisma.oc_product_to_category.findMany({
      select: {
        product_id: true,
      },
      where: {
        category_id: categoryId,
      },
    })
  const products_array = products_id.map((item: IProductId) => item.product_id)
  return products_array
}

export async function getProductsCountByCategory(
  products_array: Array<number>
) {
  const products_count = await prisma.oc_product.aggregate({
    _count: {
      product_id: true,
    },
    where: {
      ...productsQuery(products_array).where,
      status: true,
    },
  })
  return products_count
}

export async function getProductsDescriptionByCategory(
  productsPager: any,
  products_array: any
) {
  const products = (await prisma.oc_product_description.findMany({
    ...productsPager,
    select: {
      ...descriptionSelect,
      product_description: {
        select: {
          ...productSelect,
        } satisfies Prisma.oc_productSelect,
      },
    },
    orderBy: [
      {
        name: "asc",
      },
    ],
    where: {
      ...productsQuery(products_array).where,
    },
  })) as productDescription[]

  return products
}
export async function getProductsWithDescriptionByCategory(
  productsPager: any,
  products_array: any,
  sort_field: any,
  sort_direction: any
) {
  const products = (await prisma.oc_product.findMany({
    ...productsPager,
    select: {
      ...productSelect,
      oc_product_description: {
        select: {
          ...descriptionSelect,
        },
      },
    },
    where: {
      ...productsQuery(products_array).where,
      status: true,
    },

    orderBy: [
      { [sort_field as string]: sort_direction },
      { product_id: "desc" },
    ],
  })) as productWithDescription[]

  return products
}

export async function getProductsByCategory(
  categoryId: number,
  takes: number,
  sort_field: string,
  sort_direction: string
) {
  const productsPager = {
    take: takes,
    skip: 0,
  }

  const products_array = await getProductsIdByCategory(categoryId)
  const products_count = await getProductsCountByCategory(products_array)

  let products = null

  if (sort_field === "name") {
    products = await getProductsDescriptionByCategory(
      productsPager,
      products_array
    )
  } else {
    products = await getProductsWithDescriptionByCategory(
      productsPager,
      products_array,
      sort_field,
      sort_direction
    )
  }

  return { products: { ...productTransformer(products) }, products_count }
}
