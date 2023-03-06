import { getMenu } from "~~/server/data/menu"

export default defineEventHandler((event) => {
  return getMenu()
})