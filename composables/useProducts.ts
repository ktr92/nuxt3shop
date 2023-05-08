export default () => {
  const getProductsLive = (options: Object): Promise<ICategory> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data: response } = await useFetch<ICategory>(
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

  return {
    getProductsLive,
  }
}
