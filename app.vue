<template>
  <div :class="{ 'dark': darkMode }">
    <NuxtLayout />
  </div>
</template>

<script setup>
const darkMode = ref(false)
</script>
