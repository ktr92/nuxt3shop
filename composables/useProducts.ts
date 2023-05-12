export default () => {
  const getProductsList = (
    urlapi: string,
    options: Object
  ): Promise<IProductList> => {
    return new Promise(async (resolve, reject) => {
      const pageConfig = useMain()
      try {
        pageConfig.addLoading()
        const response = await useFetchApi<IProductList>(urlapi, {
          method: "GET",
          params: { ...options },
        })
        if (response) {
          resolve(response)
        }
      } catch (error) {
        reject(error)
      } finally {
        pageConfig.removeLoading()
      }
    })
  }

  return {
    getProductsList,
  }
}
