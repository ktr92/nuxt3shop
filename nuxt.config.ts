// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '@/assets/scss/main.scss',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/_colors.scss" as *;'
        }
      }
    }
  },
  typescript: {
    shim: false
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon'
  ],
  tailwindcss: {
    viewer: false
  }

})
