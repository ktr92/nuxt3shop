import prisma from '../prisma'

export async function getConfig() {
  const db_config = prisma.oc_setting.findMany({
    select: {
      setting_id: true,
      value: true,
      key: true
    },
    where: {
      group: 'config'
    }
  })
  return db_config
}