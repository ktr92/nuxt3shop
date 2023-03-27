<template>
  <div class="relative font-sans" n="green6">
    <Header />
    <div class="container max-w-200 mx-auto py-10 px-4">
      <h1>Ошибка {{ error?.statusCode }} 😱</h1>
      <h2>{{ error?.message }}</h2>
      <br>
      <button @click="handleError">
        Перейти на главную
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>
