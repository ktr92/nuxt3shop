import prisma from "../prisma"
import { productTransformer } from "~~/server/api/transformers/products"
import { Prisma } from "@prisma/client"

import {productSelect, manufacturerSelect, descriptionSelect} from '../const/product.const'


function productsById(products: Array<number>) {
  const product_query = {
    product_id: {
      in: [...products],
    },
  }
  return product_query
}

function productsByFilter(filters: string) {
  const product_query = 
     {...JSON.parse(filters ? filters : '{}')}
  return product_query
}
function productsByKeywords(keyword: any) {
  const product_query = 
     {...JSON.parse(keyword)}
  return product_query
}

async function getProductsIdByFilter(filter: any, keyword?: any) {
  const products_id: Array<IProductId> =
    await prisma.oc_product.findMany({
      select: {
        product_id: true,
      },
      where: {
        AND: [
          {
            ...productsByFilter(filter),
          },
          keyword ? {...productsByKeywords(keyword)} : {}
        ]
      }
    })
  const products_array = products_id.map((item: IProductId) => item.product_id)
  return products_array
}

async function getProductsIdByCategory(categoryId: number) {
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
async function getManufacturersById(products_array: any, filters?:string, ) {
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
        AND: [
          { ...productsById(products_array) },
          filters ? { ...productsByFilter(filters) } : {}
        ],
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

async function getPricesById(
  products_array: any,
  filters?: string,

) {
  const prices = await prisma.oc_product.aggregate({
    where: {
      AND: [
        { ...productsById(products_array) },
        filters ? { ...productsByFilter(filters) } : {}
      ],
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


const getProductsCountById = async function (
  filters: string,
  products_array: Array<number>
) {
  const products_count = await prisma.oc_product.aggregate({
    _count: {
      product_id: true,
    },
    where: {
      AND: [
        { ...productsById(products_array) } ,
        { ...productsByFilter(filters) }
      ],
      status: true,
    },
  })
  return products_count
}


const getProductsDescriptionById = async function(
  productsPager: any,
  filters: string,
  products_array: Array<number>,
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
        AND: [
          { ...productsById(products_array) },
          { ...productsByFilter(filters) }
        ],
        status: true
      }
    },
    distinct: ['product_id'],
  })) as productDescription[]

  return products
}
async function getProductsWithDescriptionById(
  productsPager: any,
  sort_field: any,
  sort_direction: any,
  filters: string,
  products_array?: any,

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
      AND: [
        products_array ? { ...productsById(products_array) } : {},
        { ...productsByFilter(filters) }
      ],
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


export async function getProductsByFilter(
  params: IProductAPI
) {
  const productsPager = {
    take: params.takes,
    skip: 0,
  }

  let products_array: number[] = []
  if ( params.categoryId !== undefined ) {
     products_array = await getProductsIdByCategory(params.categoryId)
  } else {
    if (params.keyword !== undefined ) {
       products_array = await getProductsIdByFilter(params.filters, params.keyword)
    }
  }

  const prices = await getPricesById(products_array, params.filters)
  const properties = await getManufacturersById(products_array, params.filters)

  const products_count = await getProductsCountById( params.filters, products_array)
  
  let products = null

  if ( params.sort_field === "name") {
    products = await getProductsDescriptionById(
      productsPager,
      params.filters,
      products_array
    )
  } else {
    products = await getProductsWithDescriptionById(
      productsPager,
      params.sort_field,
      params.sort_direction,
      params.filters,
      products_array
    )
  } 
  return { products: { ...productTransformer<IProducts>(products) }, products_count, properties, prices }
}


export async function getProductsByLivesearch(keyword: string) {
 
  const productsPager = {
    take: 3,
    skip: 0,
  }
  const products = await getProductsWithDescriptionById(
    productsPager,
    "sort_order",
    "asc",
    keyword
  )

  return { products: { ...productTransformer<IProducts>(products) } }
}