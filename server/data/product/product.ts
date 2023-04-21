import prisma from "../prisma"
import { productTransformer } from "~~/server/api/transformers/products"
import { Prisma } from "@prisma/client"

function productsQuery(products: Array<number>, filters?: string) {
  const product_query = {
    where: {
      AND: [
        {
          product_id: {
            in: [...products],
          },
        },
        {...JSON.parse(filters ? filters : '{}')}
       
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

const manufacturerSelect = {
  name: true,
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
        category_id: {
          equals: categoryId
        },
      },
    })
  const products_array = products_id.map((item: IProductId) => item.product_id)
  return products_array
}
export async function getManufacturersByCategory(products_array: any) {
  const manufacturers = await prisma.oc_product.findMany({
      select: {
        manufacturer_id: true,
        manufacturer: {
          select: {
            ...manufacturerSelect
          },
         
        }
      },
      where: {
        ...productsQuery(products_array).where,
        status:true
      },
      distinct: ['manufacturer_id'],
    })
  
    const properties: IProperties = {
      manufacturer: manufacturers.map(item => {
        const obj: ISelect = {
          title: item.manufacturer.name,
          param: String(item.manufacturer_id),
          code: "manufacturer_id",
          prop: "",
          rule: {
            manufacturer_id: {
              equals: item.manufacturer_id
            }
          }
        }
        return obj
      })
    }
    
  return properties
}

export async function getPricesByCategory(
  products_array: any,
  filters: string
) {
  const prices = await prisma.oc_product.aggregate({
    where: {
      ...productsQuery(products_array, filters).where,
      status:true
    },
    _max: {
      price: true
    },
    _min: {
      price: true
    }
  })
  return prices
}


export async function getProductsCountByCategory(
  products_array: Array<number>,
  filters: string
) {
  const products_count = await prisma.oc_product.aggregate({
    _count: {
      product_id: true,
    },
    where: {
      ...productsQuery(products_array, filters).where,
      status: true,
    },
  })
  return products_count
}

export async function getProductsDescriptionByCategory(
  productsPager: any,
  products_array: any,
  filters: string
) {
  const products = (await prisma.oc_product_description.findMany({
    ...productsPager,
    select: {
      ...descriptionSelect,
      product_description: {
        select: {
          ...productSelect,
          manufacturer: {
            select: {
              ...manufacturerSelect
            }
          }
        } satisfies Prisma.oc_productSelect,
      } 
    },
    orderBy: [
      {
        name: "asc",
      },
    ],
    where: {
      product_description: {
        ...productsQuery(products_array, filters).where,
        status: true
      }
    },
    distinct: ['product_id'],
  })) as productDescription[]

  return products
}
export async function getProductsWithDescriptionByCategory(
  productsPager: any,
  products_array: any,
  sort_field: any,
  sort_direction: any,
  filters: string
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
      manufacturer: {
        select: {
          ...manufacturerSelect
        }
      }
    },
    where: {
      ...productsQuery(products_array, filters).where,
      status: true,
    },
    distinct: ['product_id'],

    orderBy: [
      { [sort_field as string]: sort_direction },
      { product_id: "desc" },
    ],
  })) as productWithRelations[]

  return products
}

export async function getProductsByCategory(
  categoryId: number,
  takes: number,
  sort_field: string,
  sort_direction: string,
  filters: string
) {
  const productsPager = {
    take: takes,
    skip: 0,
  }

  const products_array = await getProductsIdByCategory(categoryId)
  const products_count = await getProductsCountByCategory(products_array, filters)

  let products = null

  if (sort_field === "name") {
    products = await getProductsDescriptionByCategory(
      productsPager,
      products_array,
      filters
    )
  } else {
    products = await getProductsWithDescriptionByCategory(
      productsPager,
      products_array,
      sort_field,
      sort_direction,
      filters
    )
  }

  const properties = await getManufacturersByCategory(products_array)
  const prices = await getPricesByCategory(products_array, filters)

  return { products: { ...productTransformer(products) }, products_count, properties, prices }
}
