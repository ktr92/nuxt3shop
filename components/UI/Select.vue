<template>
  <ul
    class="py-2 text-sm text-gray-700 dark:text-gray-200"
    aria-labelledby="dropdownDefaultButton"
  >
    <li
      v-for="item in items"
      :class="{ active: item.param + item.prop === active }"
    >
      <span
        @click="$emit('dropdownAction', item)"
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
      </span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
const prop = defineProps({
  items: {
    type: Array<ISelect>,
    required: true,
  },
  active: {
    type: String,
    required: false,
  },
})
</script>
<style scoped>
li.active {
  @apply bg-slate-200;
}
</style>
