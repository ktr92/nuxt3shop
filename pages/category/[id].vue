<template>
  <div>
    <div class="container">
      <div v-if="category">
        <h1>{{ category.name }}</h1>
        <div class="description" v-html="description"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { decodeHtmlCharCodes } from '@/utils/htmldecode'

interface ICategory {
  category_id: number,
  name: string,
  description: string,
  meta_description: string,
  meta_keyword: string,
  meta_title: string,
  meta_h1: string,
  categoryinfo: {
    image: string,
    parent_id: number,
    status: Boolean
  }
}

const route = useRoute()
const { data: category, error } = await useFetch<ICategory>('/api/category/' + route.params.id)

if (error.value) {
  throw createError({
    statusCode: error.value.data.statusCode,
    statusMessage: error.value.data.statusMessage,
    message: "Такой страницы нет",
    fatal: false
  })
}

const description = computed(() => {
  return category.value ? decodeHtmlCharCodes(category.value.description) : ''
})


</script>

<style></style>