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
          <NavPager
            :current-page-prop="1"
            :total-items-prop="category.products_count._count.product_id"
            :per-page-prop="3"
            @pageChanged="pageChanged($event)"
          ></NavPager>
        </div>
        <div class="content description my-8" v-html="description"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { decodeHtmlCharCodes } from "@/utils/htmldecode"

const route = useRoute()

const page = ref(1)
const take = ref(8)
const {
  data: category,
  pending,
  refresh,
  error,
} = await useFetch<ICategory>(
  () => `/api/category/${route.params.id}?page=${page.value}&take=${take.value}`
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

const pageChanged = (p: number) => {
  page.value = p
  refresh()
}
</script>

<style></style>
