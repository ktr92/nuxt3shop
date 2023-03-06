import { getMenu } from "~~/server/data/menu/menu"

export default defineEventHandler((event) => {
  return getMenu()
})