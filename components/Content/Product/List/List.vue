<template>
  <div>
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
    <div v-if="!productslist?.products || loading">
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
  </div>
</template>

<script setup lang="ts">
import { decodeHtmlCharCodes } from "@/utils/htmldecode"
import _ from "lodash"
const TAKE_NUMBER = 8

const route = useRoute()

let page = 1
let take = TAKE_NUMBER
let takegrow = TAKE_NUMBER
let skip = page === 1 ? 0 : (page - 1) * take
let sort_field = "sort_order"
let sort_direction = "asc"
let filters = "{}"

const loading = ref(false)

const productslist = ref<IProductList>()

const { getProductsList } = useProducts()

const {
  data: category,
  pending: pendingCategory,
  error: errorCategory,
} = await useFetch<ICategory>(() => `/api/category/${route.params.id}`)

const getList = async () => {
  try {
    loading.value = true
    const params = {
      page: page,
      take: take,
      skip: skip,
      sort_field: sort_field,
      sort_direction: sort_direction,
      filters: filters,
      categoryid: category.value?.category_id,
    }
    const list = await getProductsList(params)
    if (list) {
      productslist.value = list
    }
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

const data = await getList()

if (errorCategory.value) {
  throw createError({
    statusCode: errorCategory.value.data.statusCode,
    statusMessage: errorCategory.value.data.statusMessage,
    message: "Такой страницы нет",
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

/* watch(
  () => filters,
  () => getList()
)
 */
const onSortEmit = async (item: ISelect) => {
  sort_field = item.param
  sort_direction = item.prop as string
  await getList()
}

const onFilterEmit = async (filter: string) => {
  filters = filter

  await getList()
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

const showMore = async () => {
  page = page + 1
  take = take + takegrow
  skip = 0
  await getList()
}
const showAll = async () => {
  take = totalCount.value
  skip = 0
  await getList()
}
</script>

<style></style>
