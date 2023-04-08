<template>
  <div v-if="more > 0" class="my-16">
    <button
      class="bg-green text-white px-20 py-4 mx-auto block rounded text-lg font-bold"
      @click="$emit('showMore')"
    >
      Показать еще ({{ more }})
    </button>
    <span
      class="text-green block text-center cursor-pointer underline my-8"
      @click="$emit('showAll')"
      >Показать сразу все товары ({{ count }})
    </span>
  </div>
  <span
    v-else
    class="bg-slate-400 text-white px-20 py-4 mx-auto block text-center my-16 rounded text-lg font-bold"
  >
    Показаны все {{ count }} товаров
  </span>
</template>

<script setup>
const props = defineProps({
  more: {
    type: Number,
    default: 0,
  },
  count: {
    type: Number,
    default: 0,
  },
})
</script>
