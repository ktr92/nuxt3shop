<template>
  <a :href="'mailto:' + email">{{ email }}</a>
</template>

<script setup>
const { email } = defineProps({
  email: {
    type: String,
    default: ''
  }
})
</script>