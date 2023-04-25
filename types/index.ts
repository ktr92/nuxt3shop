import { Prisma, oc_product_description } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime"

export {}

// 1: Define a type that includes the relation to `oc_product_description`
const productWithRelations = Prisma.validator<Prisma.oc_productArgs>()({
  include: { oc_product_description: true, manufacturer: true },
})

const productDescription =
  Prisma.validator<Prisma.oc_product_descriptionArgs>()({
    include: {
      product_description: true,
    },
  })

const categoryWithRelations = Prisma.validator<Prisma.oc_categoryArgs>()({
  include: { oc_category_description: true },
})

declare global {
  interface IProductId {
    product_id: number
  }

  // 3: This type will include a Model and all their Relations
  type productWithRelations = Prisma.oc_productGetPayload<
    typeof productWithRelations
  >

  type categoryWithRelations = Prisma.oc_categoryGetPayload<
    typeof categoryWithRelations
  >
  type productDescription = Prisma.oc_product_descriptionGetPayload<
    typeof productDescription
  >

  //

  interface IproductRelIndexable extends productWithRelations {
    [property: string]: any
  }
  interface IproductDescriptionRelIndexable extends productDescription {
    [property: string]: any
  }
  interface IproductDescriptionIndexable extends oc_product_description {
    [property: string]: any
  }

  interface ICategory extends categoryWithRelations {
    category_id: number
    name: string
    description: string
    meta_title: string
    meta_description: string
    products: Array<IProducts>
    products_count: ICount
    properties: IProperties
    prices: any
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
    manufacturer: any
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

  interface IProperties {
    manufacturer?: Array<ISelect>
  }
}
