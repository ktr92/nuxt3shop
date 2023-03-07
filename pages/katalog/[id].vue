<template>
  <div>
    <div class="container">
      <p>There is {{ category }}</p> 
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: category } = await useFetch('/api/category/' + route.params.id)

</script>

<style></style>