import prisma from "../prisma"

export async function getManufaturerPath(path: Array<string>) {
  const manufacturers = prisma.oc_url_alias.findMany({
    select: {
      query: true,
      keyword: true,
    },
    where: {
      keyword: {
        in: [...path],
      },
    },
  })
  return manufacturers
}

export async function getManufacturerName(manufacturerId: Array<number>) {
  const manufacturers = await prisma.oc_manufacturer.findMany({
    select: {
      manufacturer_id: true,
      name: true,
    },
    where: {
      manufacturer_id: {
        in: [...manufacturerId],
      },
    },
  })
  return manufacturers
}
