export const useMain = defineStore("main", {
  state: () => ({
    pageInfo: {
      title: "",
      link: "#",
    },
  }),

  getters: {
    getPageInfo: (state) => state.pageInfo,
  },

  actions: {
    setPageInfo(title: string, link: string) {
      this.pageInfo.title = title || ""
      this.pageInfo.link = link || "#"
    },
  },
})

/* if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMain, import.meta.hot))
} */
