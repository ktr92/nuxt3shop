<template>
  <ul
    class="py-2 text-sm text-gray-700 dark:text-gray-200"
    aria-labelledby="dropdownDefaultButton"
  >
    <li v-for="item in items">
      <span
        @click="$emit('dropdownAction', item.param, item.prop)"
        class="
          flex
          justify-between
          items-center
          px-4
          py-2
          hover:bg-gray-100
          dark:hover:bg-gray-600
          dark:hover:text-white
          cursor-pointer
        "
      >
        <span>
          {{ item.title }}
        </span>
        <span v-if="item.icon">
          {{ item.icon }}
        </span>
      </span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
const prop = defineProps({
  items: {
    type: Object,
    reqired: true,
  },
})
</script>
