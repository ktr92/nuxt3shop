import { ProductProperties } from "../../data/enums/product.enums"
export const productTransformer = <T>(
  product: Array<IproductRelIndexable | IproductDescriptionIndexable>
): Array<T> => {
  function isTypeDescription(
    value: IproductDescriptionIndexable | IproductRelIndexable
  ): value is productDescription {
    return value.hasOwnProperty("name")
  }

  function getOwnProperty(
    item: IproductDescriptionIndexable | IproductRelIndexable,
    property: string
  ) {
    return item[property]
      ? item[property]
      : item.oc_product_description[0][property]
  }
  function getRelatedProperty(
    item: IproductDescriptionIndexable | IproductRelIndexable,
    property: string
  ) {
    return (item.product_description as IproductRelIndexable)[property]
      ? (item.product_description as IproductRelIndexable)[property]
      : item[property]
  }

  function getItem(
    item: IproductDescriptionIndexable | IproductRelIndexable,
    property: string
  ) {
    return isTypeDescription(item)
      ? getRelatedProperty(item, property)
      : getOwnProperty(item, property)
  }

  const result = product.map((item): T => {
    /*  return {
      product_id: item.product_id,
      name: getItem(item, ProductProperties.name),
      status: getItem(item, ProductProperties.status),
      image: getItem(item, ProductProperties.image),
      price: getItem(item, ProductProperties.price),
      sku: getItem(item, ProductProperties.sku),
      manufacturer_id: getItem(item, ProductProperties.manufacturer_id),
      manufacturer: getItem(item, ProductProperties.manufacturer),
      quantity: getItem(item, ProductProperties.quantity),
      sort_order: getItem(item, ProductProperties.sort_order),
    } as T */
    return {
      ...(Object.fromEntries(
        Object.values(ProductProperties).map((val) => [
          val,
          getItem(item, ProductProperties[val]),
        ])
      ) as T),
    }
  })
  return result
}
