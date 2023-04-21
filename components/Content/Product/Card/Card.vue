<template>
  <div class="h-full">
    <div
      class="
        w-full
        h-full
        max-w-sm
        bg-white
        border border-gray-200
        rounded-lg
        shadow
        pb-16
        relative
      "
    >
      <a
        href="#"
        v-if="product.image"
        class="block h-60 flex items-center justify-center"
      >
        <img
          class="p-4 rounded-t-lg"
          :src="'/' + product.image"
          :alt="product.name"
        />
      </a>
      <div class="px-5 pb-2">
        <a href="#">
          <h5
            class="
              text-md
              font-medium
              leading-5
              tracking-tight
              text-gray-900
              mb-2
            "
          >
            {{ product.name }}
          </h5>
        </a>
        <div class="flex items-center justify-between">
          <span class="text-gray-500 pr-5">Производитель</span>
          <span class="text-gray-800">{{ product.manufacturer }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-gray-500 pr-5">Артикул</span>
          <span class="text-gray-800">{{ product.sku }}</span>
        </div>
        <div class="absolute bottom-4 w-full left-0 right-0 px-5">
          <div class="flex items-center mt-2.5 mb-5"></div>
          <div class="flex items-center justify-between w-full">
            <span class="text-xl font-bold text-gray-900"
              >{{ product.price }} ₽</span
            >
            <a
              href="#"
              class="
                text-white
                bg-green
                hover:bg-blue-800
                focus:ring-4
                focus:outline-none
                font-medium
                rounded-lg
                text-sm
                px-5
                py-2.5
                text-center
              "
              >В корзину</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props =
  defineProps<{
    product: IProducts
  }>()
</script>
