<template>
  <div>
    <div class="container relative">
      <div v-if="pendingCategory || !category">
        <UILoading />
      </div>
      <template v-else>
        <div class="flex items-center justify-between">
          <h1 class="my-8">{{ category.name }}</h1>
          <NavFilter
            v-if="productslist"
            :products="productslist"
            :category_id="true"
            @sortEmit="onSortEmit"
            @filterEmit="onFilterEmit"
          />
        </div>

        <div v-if="productslist?.products">
          <div class="grid grid-cols-4 gap-3">
            <div v-for="product in productslist.products">
              <ContentProductCard :product="product"> </ContentProductCard>
            </div>
          </div>
        </div>
        <div v-if="pendingProducts || !productslist?.products">
          <UILoading />
        </div>
        <template v-else>
          <NavShowmore
            :count="productslist.products_count._count.product_id"
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
import _ from "lodash"

const TAKE_NUMBER = 8

const route = useRoute()

const page = ref(1)
const take = ref(TAKE_NUMBER)
const takegrow = ref(TAKE_NUMBER)
const skip = ref(page.value === 1 ? 0 : (page.value - 1) * take.value)
const sort_field = ref("sort_order")
const sort_direction = ref("asc")
const filters = ref("{}")

/* const {
  data: category,
  pending,
  refresh,
  error,
} = await useFetch<ICategory>(
  () =>
    `/api/category/${route.params.id}?page=${page.value}&take=${take.value}&skip=${skip.value}&sort_field=${sort_field.value}&sort_direction=${sort_direction.value}&filters=${filters.value}`
) */

/* const [
  { data: category, pending: pendingCategory, error: errorCategory },
  { data: products, pending: pendingProducts, error: errorProducts },
] = await Promise.all([
  useFetch<ICategory>(() => `/api/category/${route.params.id}`),
  useFetch<IProductList>(
    () =>
      `/api/search/?page=${page.value}&take=${take.value}&skip=${skip.value}&sort_field=${sort_field.value}&sort_direction=${sort_direction.value}&filters=${filters.value}&categoryid=${category.value.category_id}`
  ),
]) */
const {
  data: category,
  pending: pendingCategory,
  error: errorCategory,
} = await useFetch<ICategory>(() => `/api/category/${route.params.id}`)

const {
  data: productslist,
  pending: pendingProducts,
  error: errorProducts,
} = await useFetch<IProductList>(
  () =>
    `/api/search/?page=${page.value}&take=${take.value}&skip=${skip.value}&sort_field=${sort_field.value}&sort_direction=${sort_direction.value}&filters=${filters.value}&categoryid=${category.value?.category_id}`
)

if (errorCategory.value) {
  throw createError({
    statusCode: errorCategory.value.data.statusCode,
    statusMessage: errorCategory.value.data.statusMessage,
    message: "Такой страницы нет",
    fatal: false,
  })
}
if (errorProducts.value) {
  throw createError({
    statusCode: errorProducts.value.data.statusCode,
    statusMessage: errorProducts.value.data.statusMessage,
    message: "Ошибка при загрузке каталога",
    fatal: false,
  })
}

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

const onSortEmit = (item: ISelect) => {
  sort_field.value = item.param
  sort_direction.value = item.prop as string
}

const onFilterEmit = (filter: string) => {
  filters.value = filter
}

const pageConfig = useMain()
pageConfig.setPageInfo(category.value ? category.value.name : "", "#")

const description = computed(() => {
  return category.value ? decodeHtmlCharCodes(category.value.description) : ""
})

const totalCount = computed(() => {
  return productslist.value
    ? productslist.value.products_count._count.product_id
    : 0
})

const more = computed(() => {
  return productslist.value
    ? totalCount.value - Object.keys(productslist.value.products).length
    : 0
})

const showMore = () => {
  page.value = page.value + 1
  take.value = take.value + takegrow.value
  skip.value = 0
}
const showAll = () => {
  take.value = totalCount.value
  skip.value = 0
}
</script>

<style></style>
