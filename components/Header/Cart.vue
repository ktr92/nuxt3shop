<template>
  <div class="header__button pl-4">
    <NuxtLink to="/checkout/cart" class="relative">
      <ShoppingBagIcon class="w-6 h-6 stroke-slate-600" />
      <span class="buttoncount">{{ count }}</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ShoppingBagIcon } from "@heroicons/vue/24/outline"
const shoppingCart = useShoppingCart()

const count = computed(() => {
  return shoppingCart.getCartCount
})
</script>

<style scoped>
.buttoncount {
  @apply w-4 h-4 flex items-center justify-center bg-green text-white text-[9px] font-bold rounded-full absolute -bottom-1 -right-1;
}
</style>
