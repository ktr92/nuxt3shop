// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/styles/main.scss"],
  typescript: {
    shim: false
  },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  tailwindcss: {
    viewer: false
  }

})
