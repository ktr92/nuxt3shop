import { getMenu } from "~~/server/data/menu/megamenu"

export default defineEventHandler((event) => {
  return getMenu()
})