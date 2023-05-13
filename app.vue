<template>
  <div>
    <NuxtLayout />
  </div>
</template>

<script setup>
const shoppingCart = useShoppingCart()

onMounted(() => {
  if (process.client) {
    shoppingCart.getLocalCart()
  }
})
</script>
