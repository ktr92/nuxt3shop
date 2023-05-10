<template>
  <div>
    <div class="container relative">
      <div class="flex items-center justify-between">
        <NavFilter
          v-if="productslist"
          :products="productslist"
          :productslist_id="true"
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
const sort_field = ref("sort_order")
const sort_direction = ref("asc")
const filters = ref("{}")

const {
  data: productslist,
  pending: pendingProducts,
  error: errorProducts,
} = await useFetch<IProductList>(
  () =>
    `/api/search/?page=${page.value}&take=${take.value}&skip=${skip.value}&sort_field=${sort_field.value}&sort_direction=${sort_direction.value}&filters=${filters.value}&search=${route.query.keyword}`
)

if (errorProducts.value) {
  throw createError({
    statusCode: errorProducts.value.data.statusCode,
    statusMessage: errorProducts.value.data.statusMessage,
    message: "Ошибка при загрузке каталога",
    fatal: false,
  })
}

const onSortEmit = (item: ISelect) => {
  sort_field.value = item.param
  sort_direction.value = item.prop as string
}

const onFilterEmit = (filter: string) => {
  filters.value = filter
}

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
