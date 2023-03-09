<template>
  <li class="pl-2">
    <a :href="link" target="_blank">
      <slot></slot>
    </a>
  </li>
</template>

<script setup lang="ts">
const props = defineProps({
  link: String,
})
</script>