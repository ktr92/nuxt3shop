<template>
  <div>
    <div class="container">
      <div v-if="category">
        <h1 class="my-8">{{ category.name }}</h1>
        <div v-if="category.products">
          <div class="grid grid-cols-4 gap-3">
            <div v-for="product in category.products">
              <ContentProductCard :product="product"> </ContentProductCard>
            </div>
          </div>
        </div>
        <div class="content description my-8" v-html="description"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { decodeHtmlCharCodes } from "@/utils/htmldecode"

const route = useRoute()
const { data: category, error } = await useFetch<ICategory>(
  "/api/category/" + route.params.id
)

if (error.value) {
  throw createError({
    statusCode: error.value.data.statusCode,
    statusMessage: error.value.data.statusMessage,
    message: "Такой страницы нет",
    fatal: false,
  })
}

const description = computed(() => {
  return category.value ? decodeHtmlCharCodes(category.value.description) : ""
})
</script>

<style></style>
