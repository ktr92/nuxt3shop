export const useMain = defineStore("main", {
  state: () => ({
    pageInfo: {
      title: "",
      link: "#",
    },
    isLive: false,
  }),

  getters: {
    getPageInfo: (state) => state.pageInfo,
    getLive: (state) => state.isLive,
  },

  actions: {
    setPageInfo(title: string, link: string) {
      this.pageInfo.title = title || ""
      this.pageInfo.link = link || "#"
    },
    hideLive() {
      this.isLive = false
    },
    showLive() {
      this.isLive = true
    },
  },
})

/* if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMain, import.meta.hot))
} */
