import { Prisma } from "@prisma/client"

export {}

// 1: Define a type that includes the relation to `oc_product_description`
const productWithDescription = Prisma.validator<Prisma.oc_productArgs>()({
  include: { oc_product_description: true },
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
  //

  interface ICategory extends categoryWithDescription {
    category_id: number
    name: string
    description: string
    products: Array<productWithDescription>
  }
}
