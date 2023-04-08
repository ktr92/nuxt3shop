import { useMain } from "../stores/main"

export default defineNuxtRouteMiddleware((to, from) => {
  const pageConfig = useMain()
  pageConfig.setPageInfo("", "#")
})
