<template>
  <a :href="link" target="_blank" class="w-8 mx-1 h-8 flex items-center justify-center ">
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
const props = defineProps({
  link: String,
})
</script>
<style scoped lang="scss">
a {
  >* {
    @apply fill-slate-500;
    @apply stroke-slate-500;
  }
}
</style>