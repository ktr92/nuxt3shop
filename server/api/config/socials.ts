import { getSocials } from "~~/server/data/config/config"

export default defineEventHandler(async (event) => {
  const socials = getSocials()

  return socials
})