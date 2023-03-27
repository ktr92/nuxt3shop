<template>
  <a :href="'tel:' + number">{{ number }}</a>
</template>

<script setup>
const { number } = defineProps({
  number: {
    type: String,
    default: ''
  }
})
</script>