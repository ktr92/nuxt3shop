import { Decimal } from "@prisma/client/runtime"

export const productTransformer = (
  product: Array<productWithRelations | productDescription>
): Array<IProducts> => {
  function isTypeDescription(
    value: IproductDescription | IproductWithRelations
  ): value is IproductDescription {
    return value.hasOwnProperty("name")
  }

  function getItem(
    item: IproductDescription | IproductWithRelations,
    property: string
  ) {
    return isTypeDescription(item)
      ? (item.product_description as IproductWithRelations)[property]
      : item[property]
  }

  const result = product.map((item): IProducts => {
    return {
      product_id: item.product_id,
      name: getItem(item, "name"),
      status: getItem(item, "status"),
      image: getItem(item, "image"),
      price: getItem(item, "price"),
      sku: getItem(item, "sku"),
      manufacturer_id: getItem(item, "manufacturer_id"),
      manufacturer: getItem(item, "manufacturer"),
      quantity: getItem(item, "quantity"),
      sort_order: getItem(item, "sort_order"),
    }
  })
  return result
}
