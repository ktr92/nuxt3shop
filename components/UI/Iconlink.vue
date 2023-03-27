<template>
  <a :href="link" target="_blank" class="inline-block">
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
const props = defineProps({
  link: String,
})
</script>