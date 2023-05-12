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
          <ContentProductCard :product="product"> </ContentProductCard>
        </div>
      </div>
    </div>
    <div v-if="!productslist?.products">
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
let page = ref(1)
let take = ref(TAKE_NUMBER)
let takegrow = ref(TAKE_NUMBER)
let skip = ref(page.value === 1 ? 0 : (page.value - 1) * take.value)
let sort_field = ref("sort_order")
let sort_direction = ref("asc")
let filters = ref("{}")

const emits = defineEmits(["onupdate"])

/* watch(
  () => filters,
  () => emits("onupdate", updatetParams.value)
) */

const updatetParams = computed(() => {
  return {
    page: page,
    take: take,
    skip: skip,
    sort_field: sort_field,
    sort_direction: sort_direction,
    filters: filters,
  }
})

const onSortEmit = async (item: ISelect) => {
  sort_field.value = item.param
  sort_direction.value = item.prop as string
  emits("onupdate", updatetParams.value)
}

const onFilterEmit = async (filter: string) => {
  filters.value = filter
  emits("onupdate", updatetParams.value)
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
  page.value = page.value + 1
  take.value = take.value + takegrow.value
  skip.value = 0
  emits("onupdate", updatetParams.value)
}
const showAll = async () => {
  take.value = totalCount.value
  skip.value = 0
  emits("onupdate", updatetParams.value)
}
</script>

<style></style>
