<template>
  <div>
    <div class="container">
      <p>There is {{ category }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">

const route = useRoute()
const { data: category, error } = await useFetch('/api/category/' + route.params.id)
if (error.value) {
  throw createError({
    statusCode: error.value.data.statusCode,
    statusMessage: error.value.data.statusMessage,
    fatal: true
  })
}



</script>

<style></style>