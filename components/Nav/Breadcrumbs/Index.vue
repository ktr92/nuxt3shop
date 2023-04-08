<template>
  <nav id="breadcrumbs" aria-label="Breadcrumb" class="container my-8">
    <ul class="flex">
      <li class="pr-4">
        <NuxtLink to="/">Главная</NuxtLink>
      </li>
      <li
        v-for="(breadcrumb, index) in getBreadcrumbs()"
        :key="index"
        class="pr-4 mr-4"
      >
        <span v-if="breadcrumb.name.length > 0" class="pr-2 mr-2">/</span>
        <NuxtLink
          v-if="breadcrumb.path && breadcrumb.path != '#'"
          :to="breadcrumb.path"
          class="opacity-60"
        >
          {{ breadcrumb.name }}
        </NuxtLink>
        <span v-else>
          {{ breadcrumb.name }}
        </span>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
  },
  link: {
    type: String,
  },
})

const getBreadcrumbs = () => {
  const breadcrumbs: any = []
  breadcrumbs.push({
    name: props.title,
    path: props.link,
  })

  return breadcrumbs
}
</script>
