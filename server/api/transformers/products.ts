import { ProductProperties } from "../../data/const/product.const"

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

export const productTransformer = <T>(
  product: Array<IproductRelIndexable | IproductDescriptionIndexable>
): Array<T> => {
  const result = product.map((item): T => {
    /*  return {
      name: getItem(item, ProductProperties.name),
    } */
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
