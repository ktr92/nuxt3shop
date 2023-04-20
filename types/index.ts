import { Prisma } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime"

export {}

// 1: Define a type that includes the relation to `oc_product_description`
const productWithDescription = Prisma.validator<Prisma.oc_productArgs>()({
  include: { oc_product_description: true },
})
const productDescription =
  Prisma.validator<Prisma.oc_product_descriptionArgs>()({
    include: { product_description: true },
  })

const categoryWithDescription = Prisma.validator<Prisma.oc_categoryArgs>()({
  include: { oc_category_description: true },
})

declare global {
  interface IProductId {
    product_id: number
  }

  // 3: This type will include a Model and all their Relations
  type productWithDescription = Prisma.oc_productGetPayload<
    typeof productWithDescription
  >

  type categoryWithDescription = Prisma.oc_categoryGetPayload<
    typeof categoryWithDescription
  >
  type productDescription = Prisma.oc_product_descriptionGetPayload<
    typeof productDescription
  >

  //

  interface ICategory extends categoryWithDescription {
    category_id: number
    name: string
    description: string
    meta_title: string
    meta_description: string
    products: Array<IProducts>
    products_count: ICount
  }

  interface IProducts extends IProductId {
    name: string
    status: boolean
    image: string
    price: Decimal
    sku: string
    quantity: number
    manufacturer_id: number
    sort_order: number
  }

  interface ICount {
    _count: IProductId
  }

  interface ISelect {
    param: string
    prop?: string
    title: string
    rule?: object
    code?: string
  }
}
