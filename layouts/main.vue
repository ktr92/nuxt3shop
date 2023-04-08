<template>
  <div class="bg-white dark:bg-dim-900">
    <UILoading v-if="isLoading" />
    <template v-else>
      <Header />
      <div class="pt-2">
        <NuxtPage />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
const isLoading = ref(false)

const pageConfig = useMain()
</script>
