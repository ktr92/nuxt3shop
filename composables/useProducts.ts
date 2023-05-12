export default () => {
  const getProductsLive = (options: Object): Promise<IProductList> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data: response } = await useFetch<IProductList>(
          `/api/livesearch/`,
          {
            params: { ...options },
          }
        )
        if (response.value) {
          resolve(response.value)
        }
      } catch (error) {
        reject(error)
      }
    })
  }
  const getProductsList = (options: Object): Promise<IProductList> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data: response } = await useFetch<IProductList>(
          `/api/search/`,
          {
            params: { ...options },
          }
        )
        if (response.value) {
          resolve(response.value)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    getProductsLive,
    getProductsList,
  }
}
