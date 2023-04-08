<template>
  <div>
    <div class="container relative">
      <template v-if="category">
        <div class="flex items-center justify-between">
          <h1 class="my-8">{{ category.name }}</h1>
          <div class="flex">
            <UIDropdown title="Сортировка" :items="sorting" @sorting="sort" />
          </div>
        </div>

        <div v-if="category.products">
          <div class="grid grid-cols-4 gap-3">
            <div v-for="product in category.products">
              <ContentProductCard :product="product"> </ContentProductCard>
            </div>
          </div>
        </div>
        <div v-if="pending">
          <UILoading />
        </div>
        <template v-else>
          <NavShowmore
            :count="category.products_count._count.product_id"
            :more="more"
            @showMore="showMore"
            @showAll="showAll"
          ></NavShowmore>
        </template>
        <div class="content description my-8" v-html="description"></div>
      </template>
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
const sort_field = ref("sort_order")
const sort_direction = ref("asc")
const {
  data: category,
  pending,
  refresh,
  error,
} = await useFetch<ICategory>(
  () =>
    `/api/category/${route.params.id}?page=${page.value}&take=${take.value}&skip=${skip.value}&sort_fiels=${sort_field.value}&sort_direction=${sort_direction.value}`
)

useServerSeoMeta({
  title: category.value ? category.value.meta_title : "",
  ogTitle: category.value ? category.value.meta_title : "",
  description: category.value ? category.value.meta_description : "",
  ogDescription: category.value ? category.value.meta_description : "",
  ogImage: category.value ? category.value.image : "",
})

useSeoMeta({
  title: category.value ? category.value.meta_title : "",
  description: () =>
    `description: ${category.value ? category.value.meta_description : ""}`,
})

const pageConfig = useMain()
pageConfig.setPageInfo(category.value ? category.value.name : "", "#")

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
  take.value = totalCount.value
  skip.value = 0
}

const sort = (field: string, direction: string) => {
  sort_field.value = field
  sort_direction.value = direction
}

const sorting = [
  {
    title: "По умолчанию",
    param: "sort_order",
    prop: "asc",
    icon: "",
  },
  {
    title: "По возрастанию цены",
    param: "price",
    prop: "asc",
    icon: "",
  },
  {
    title: "По убыванию цены",
    param: "price",
    prop: "desc",
    icon: "",
  },
]
</script>

<style></style>
