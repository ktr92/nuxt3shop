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
        <NavShowmore
          :count="category.products_count._count.product_id"
          :more="more"
          @showMore="showMore"
          @showAll="showAll"
        ></NavShowmore>
        <div class="content description my-8" v-html="description"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { decodeHtmlCharCodes } from "@/utils/htmldecode"

const TAKE_NUMBER = 8

const route = useRoute()

const page = ref(1)
const take = ref(TAKE_NUMBER)
const takegrow = ref(TAKE_NUMBER)
const skip = ref(page.value === 1 ? 0 : (page.value - 1) * take.value)
const {
  data: category,
  pending,
  refresh,
  error,
} = await useFetch<ICategory>(
  () =>
    `/api/category/${route.params.id}?page=${page.value}&take=${take.value}&skip=${skip.value}`
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

const totalCount = computed(() => {
  return category.value ? category.value.products_count._count.product_id : 0
})

const more = computed(() => {
  return category.value
    ? totalCount.value - Object.keys(category.value.products).length
    : 0
})

/* const pageChanged = (p: number) => {
  page.value = p
} */

const showMore = () => {
  page.value = page.value + 1
  take.value = take.value + takegrow.value
  skip.value = 0
}
const showAll = () => {
  page.value = page.value + 1
  take.value = totalCount.value
  skip.value = 0
}
</script>

<style></style>
