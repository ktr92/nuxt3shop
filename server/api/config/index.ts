import { getConfig } from "~~/server/data/config/config"

export default defineEventHandler((event) => {
  const config = getConfig()
  const header = config.then(response => {
    return {
      logo: response.filter(item => item.key === 'config_logo')[0],
      title: response.filter(item => item.key === 'config_name')[0],
      phone: response.filter(item => item.key === 'config_telephone')[0],
      email: response.filter(item => item.key === 'config_email')[0]
    }
  })


  return header
})