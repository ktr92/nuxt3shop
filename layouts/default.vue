<template>
  <div class="bg-white dark:bg-dim-900">
    <UILoading v-if="isLoading" />
    <template v-else>
      <Header />
      <div class="pt-2">
        <NavBreadcrumbs
          v-if="pageConfig.getPageInfo.title != ''"
          :title="pageConfig.getPageInfo.title"
          :link="pageConfig.getPageInfo.link"
        />
        <NuxtPage />
      </div>
    </template>
  </div>
</template>

<script setup>
const isLoading = ref(false)

const pageConfig = useMain()
</script>
