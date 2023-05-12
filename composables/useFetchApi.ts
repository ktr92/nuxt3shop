export default <T>(url: string, options = {}) => {
  return $fetch<T>(url, {
    ...options,
  })
}
