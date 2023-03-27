import prisma from '../prisma'

export async function getConfig() {
  const db_config = prisma.oc_setting.findMany({
    select: {
      setting_id: true,
      value: true,
      key: true
    },
    where: {
      code: 'config'
    }
  })
  return db_config
}

export async function getSocials() {
  const db_config = prisma.nx_socials.findMany({
    select: {
      nx_socials_link: true,
      nx_socials_icon: true,
    }
  })
  return db_config
}