import { Decimal } from "@prisma/client/runtime"

export const productTransformer = (
  product: Array<productWithRelations | productDescription>
): Array<IProducts> => {
  function isTypeDescription(
    value: productWithRelations | productDescription
  ): value is productDescription {
    return value.hasOwnProperty("name")
  }

  function getItemName(
    item: productWithRelations | productDescription
  ): string {
    return isTypeDescription(item)
      ? item.name
      : item.oc_product_description[0].name
  }

  function getItemStatus(
    item: productWithRelations | productDescription
  ): boolean {
    return isTypeDescription(item)
      ? item.product_description.status
      : item.status
  }

  function getItemImage(
    item: productWithRelations | productDescription
  ): string {
    return isTypeDescription(item)
      ? item.product_description.image || ""
      : item.image || ""
  }
  function getItemPrice(
    item: productWithRelations | productDescription
  ): Decimal {
    return isTypeDescription(item) ? item.product_description.price : item.price
  }
  function getItemSKU(item: productWithRelations | productDescription): string {
    return isTypeDescription(item) ? item.product_description.sku : item.sku
  }
  function getItemManufacturer(
    item: productWithRelations | productDescription
  ): number {
    return isTypeDescription(item)
      ? item.product_description.manufacturer_id
      : item.manufacturer_id
  }
  function getItemManufacturerInfo(
    item: productWithRelations | productDescription
  ): string {
    return isTypeDescription(item)
      ? (item.product_description as productWithRelations).manufacturer.name
      : /* ? item.product_description.manufacturer.name */
        item.manufacturer.name
  }

  function getItemQuantity(
    item: productWithRelations | productDescription
  ): number {
    return isTypeDescription(item)
      ? item.product_description.quantity
      : item.quantity
  }
  function getItemSort(
    item: productWithRelations | productDescription
  ): number {
    return isTypeDescription(item)
      ? item.product_description.sort_order
      : item.sort_order
  }

  const result = product.map((item): IProducts => {
    return {
      product_id: item.product_id,
      name: getItemName(item),
      status: getItemStatus(item),
      image: getItemImage(item),
      price: getItemPrice(item),
      sku: getItemSKU(item),
      manufacturer_id: getItemManufacturer(item),
      manufacturer: getItemManufacturerInfo(item),
      quantity: getItemQuantity(item),
      sort_order: getItemSort(item),
    }
  })
  return result
}
