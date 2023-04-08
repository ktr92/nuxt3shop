<template>
  <div class="relative w-64">
    <button
      id="dropdownDefaultButton"
      data-dropdown-toggle="dropdown"
      class="w-full relative bg-slate-100 hover:bg-slate-300 shadow-none focus:shadow-none font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all flex justify-between"
      type="button"
      @click="showDropdown"
    >
      <span>{{ title }}</span>
      <svg
        class="w-4 h-4 ml-2"
        aria-hidden="true"
        fill="none"
        stroke="#64748b"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </button>
    <!-- Dropdown menu -->
    <div
      v-if="isShown"
      id="dropdown"
      class="w-full absolute top-full right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
    >
      <ul
        class="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefaultButton"
      >
        <li v-for="item in items">
          <span
            @click="$emit('sorting', item.param, item.prop)"
            class="flex justify-between items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
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
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
  },
  items: {
    type: Array<{ title: string; param: string; prop: string; icon: string }>,
  },
})
defineEmits(["sorting"])
const isShown = ref(false)
const showDropdown = () => {
  isShown.value = !isShown.value
}
</script>
