<template>
  <div>
    <div class="container">
      <div class="flex items-center justify-between mb-12">
        <h1>Корзина</h1>
        <UIButton @onclick="navigateTo('/checkout/order')" size="lg" rounded>
          Оформить заказ
        </UIButton>
      </div>
      <div v-if="products.length">
        <div v-for="product in products">
          <ContentProductCardCheckout
            :product="product.product"
            :count="product.count"
            @removeitem="removeItem"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const useCart = useShoppingCart()
const products = computed(() => {
  return useCart.getCart
})

const removeItem = (product_id: number) => {
  useCart.removeOne(product_id)
}

const pageConfig = useMain()
pageConfig.setPageInfo("Корзина", "#")
</script>

<style></style>
