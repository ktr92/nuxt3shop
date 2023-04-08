<template>
  <div
    class="flex items-center justify-center opacity-50 h-20"
    :class="{ 'h-screen': full, 'h-20': !full }"
  >
    <div class="absolute">
      <svg
        class="animate-spin h-10 w-10 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="green"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-100"
          fill="green"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "small",
  },
})
const full = computed(() => {
  return props.type === "full"
})
</script>
