export enum ProductProperties {
  product_id = "product_id",
  name = "name",
  status = "status",
  image = "image",
  price = "price",
  sku = "sku",
  manufacturer_id = "manufacturer_id",
  manufacturer = "manufacturer",
  quantity = "quantity",
  sort_order = "sort_order",
}


export const productSelect = {
  product_id: true,
  status: true,
  image: true,
  price: true,
  sku: true,
  quantity: true,
  manufacturer_id: true,
  sort_order: true,
}

export const manufacturerSelect = {
  name: true,
}

export const descriptionSelect = {
  name: true,
  product_id: true,
}

