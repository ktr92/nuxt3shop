<template>
  <div>
    <template v-if="pending">
      <UILoading />
    </template>
    <div class="container relative" v-else>
      <template v-if="category && isResult">
        <div class="flex items-center justify-between">
          <div></div>
          <NavFilter
            :products="category"
            :category_id="false"
            @sortEmit="onSortEmit"
            @filterEmit="onFilterEmit"
          />
        </div>

        <div class="grid grid-cols-4 gap-3">
          <div v-for="product in category.products">
            <ContentProductCard :product="product"> </ContentProductCard>
          </div>
        </div>
        <NavShowmore
          :count="category.products_count._count.product_id"
          :more="more"
          @showMore="showMore"
          @showAll="showAll"
        ></NavShowmore>
      </template>
      <div v-else>
        <h2>По вашему запросу ничего не найдено</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash"

const TAKE_NUMBER = 8
const route = useRoute()
const page = ref(1)
const take = ref(TAKE_NUMBER)
const takegrow = ref(TAKE_NUMBER)
const skip = ref(page.value === 1 ? 0 : (page.value - 1) * take.value)

// these params are subject to change in the filter
const sort_field = ref("sort_order")
const sort_direction = ref("asc")
const filters = ref("{}")

const onSortEmit = (item: ISelect) => {
  sort_field.value = item.param
  sort_direction.value = item.prop as string
}

const onFilterEmit = (filter: string) => {
  filters.value = filter
}

const {
  data: category,
  pending,
  refresh,
  error,
} = await useFetch<IProductList>(
  () =>
    `/api/search/?page=${page.value}&take=${take.value}&skip=${skip.value}&sort_field=${sort_field.value}&sort_direction=${sort_direction.value}&filters=${filters.value}&search=${route.query.keyword}&category=${undefined}`
)

if (error.value) {
  throw createError({
    statusCode: error.value.data.statusCode,
    statusMessage: error.value.data.statusMessage,
    message: "Здесь ничего нет",
    fatal: false,
  })
}

const isResult = computed(() => {
  return category.value?.products
    ? Object.keys(category.value?.products).length
    : 0
})

useServerSeoMeta({
  title: "Поиск:",
})

useSeoMeta({
  title: "Поиск:",
})

const pageConfig = useMain()
pageConfig.setPageInfo("Поиск", "#")

const totalCount = computed(() => {
  return category.value ? category.value.products_count._count.product_id : 0
})

const more = computed(() => {
  return category.value
    ? totalCount.value - Object.keys(category.value.products).length
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
