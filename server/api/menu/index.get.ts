import { getMenu } from "~~/server/data/menu/megamenu"

export default defineEventHandler(async (event) => {
  return await getMenu()
})