interface ICartState {
  stateCart: Array<ICartProducts>
}

export const useShoppingCart = defineStore("cart", {
  state: (): ICartState => ({
    stateCart: [],
  }),
  getters: {
    getCart: (state) => state.stateCart,
    getCartCount: (state) =>
      state.stateCart.reduce((acc, item) => acc + item.count, 0),
  },
  actions: {
    getLocalCart() {
      const storageCart = localStorage.getItem("shoppingCart")
      if (storageCart) {
        this.stateCart = JSON.parse(storageCart)
      }
    },
    setLocalCart(payload: Array<ICartProducts>) {
      localStorage.setItem("shoppingCart", JSON.stringify(payload))
    },
    addToCart(payload: IProducts) {
      //this.getLocalCart()
      const isExist: Array<ICartProducts> = this.stateCart.filter(
        (item: ICartProducts) => item.product.product_id === payload.product_id
      )
      if (isExist.length) {
        isExist[0].count += 1
      } else {
        this.stateCart.push({
          product: payload,
          count: 1,
        })
      }
      this.setLocalCart(this.stateCart)
    },
    clearLocalCart() {
      //this.getLocalCart()
      this.stateCart = []
      this.setLocalCart(this.stateCart)
    },
    deleteLocalCart(payload: number) {
      // this.getLocalCart()
      this.stateCart.filter(
        (item: ICartProducts) => item.product.product_id !== payload
      )
      this.setLocalCart(this.stateCart)
    },
  },
})
