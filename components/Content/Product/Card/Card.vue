<template>
  <div class="h-full">
    <div
      class="w-full h-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 pb-16 relative"
    >
      <a
        href="#"
        v-if="product.image"
        class="block h-60 flex items-center justify-center"
      >
        <img
          class="p-4 rounded-t-lg"
          :src="'/' + product.image"
          :alt="product.oc_product_description[0].name"
        />
      </a>
      <div class="px-5 pb-5">
        <a href="#">
          <h5 class="text-md tracking-tight text-gray-900 dark:text-white">
            {{ product.oc_product_description[0].name }}
          </h5>
        </a>
        <div class="absolute bottom-4 w-full left-0 right-0 px-5">
          <div class="flex items-center mt-2.5 mb-5"></div>
          <div class="flex items-center justify-between w-full">
            <span class="text-xl font-bold text-gray-900 dark:text-white"
              >{{ product.price }} ₽</span
            >
            <a
              href="#"
              class="text-white bg-green hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >В корзину</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  product: productWithDescription
}>()
</script>
