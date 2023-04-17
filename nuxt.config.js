// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/styles/main.scss"],
  typescript: {
    shim: false,
  },

  imports: {
    dirs: ["stores"],
  },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  tailwindcss: {
    viewer: false,
  },
  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate"],
  },
  storybook: {
    // Options
  },
})
