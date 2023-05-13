<template>
  <div>
    <div class="flex items-center justify-between">
      <slot name="title"></slot>
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
          <ContentProductCard :product="product" @addtocart="addToCart">
          </ContentProductCard>
        </div>
      </div>
    </div>
    <div v-if="!productslist?.products || pageConfig.getLoading">
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
    <slot name="description"></slot>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash"

const props = defineProps({
  productslist: Object as PropType<IProductList>,
})

const TAKE_NUMBER = 8
let page = 1
let take = TAKE_NUMBER
let takegrow = TAKE_NUMBER
let skip = page === 1 ? 0 : (page - 1) * take
let sort_field = "sort_order"
let sort_direction = "asc"
let filters = "{}"

const pageConfig = useMain()

const emits = defineEmits(["onupdate"])

/* watch(
  () => filters,
  () => emits("onupdate", updatetParams.value)
) */

const route = useRoute()
watch(
  () => route.fullPath,
  () => emits("onupdate", updatetParams())
)
const updatetParams = (): IProductRefreshAPI => {
  return {
    page: page,
    take: take,
    skip: skip,
    sort_field: sort_field,
    sort_direction: sort_direction,
    filters: filters,
  }
}

const onSortEmit = async (item: ISelect) => {
  sort_field = item.param
  sort_direction = item.prop as string
  emits("onupdate", updatetParams())
}

const onFilterEmit = async (filter: string) => {
  filters = filter
  emits("onupdate", updatetParams())
}

const totalCount = computed(() => {
  return props.productslist
    ? props.productslist.products_count._count.product_id
    : 0
})

const more = computed(() => {
  return props.productslist
    ? totalCount.value - Object.keys(props.productslist.products).length
    : 0
})

const showMore = async () => {
  page = page + 1
  take = take + takegrow
  skip = 0
  emits("onupdate", updatetParams())
}
const showAll = async () => {
  take = totalCount.value
  skip = 0
  emits("onupdate", updatetParams())
}
const useCart = useShoppingCart()
const addToCart = (product: IProducts) => {
  useCart.addToCart(product)
}
</script>

<style></style>
