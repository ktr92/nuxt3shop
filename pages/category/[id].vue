<template>
  <div>
    <div class="container relative">
      <template v-if="category">
        <div class="flex items-center justify-between">
          <h1 class="my-8">{{ category.name }}</h1>
          <div class="flex">
            <div class="flex items-center ml-4">
              <div v-for="filter in where" class="mr-4">
                <NavFilterItem
                  :filterprop="filter"
                  :currentprop="filterSet"
                  @filtering="acceptFilter"
                  @clearFilter="clearFilter"
                >
                </NavFilterItem>
              </div>
            </div>
            <div class="flex items-center mr-4">
              <UIDropdown>
                <template #title> Цена </template>
                <template #components>
                  <UIRange :values="prices" :min='Number(prices[0])' :max='Number(prices[1])'  @filtering="changePrice" />
                </template>
              </UIDropdown>
            </div>
            <div class="flex items-center mr-4">
              <UIDropdown>
                <template #title> {{ sort_title }} </template>
                <template #components>
                  <UISelect
                    :items="sorting"
                    :active="sort_active"
                    @dropdownAction="sort"
                  />
                </template>
              </UIDropdown>
            </div>
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
import _ from "lodash"

const TAKE_NUMBER = 8

const route = useRoute()

const page = ref(1)
const take = ref(TAKE_NUMBER)
const takegrow = ref(TAKE_NUMBER)
const skip = ref(page.value === 1 ? 0 : (page.value - 1) * take.value)
const sort_field = ref("sort_order")
const sort_direction = ref("asc")
const sort_title = ref("По умолчанию")
const filters = ref("{}")
const filterSet = ref([] as Array<any>)
const pricesArr = ref([])

const {
  data: category,
  pending,
  refresh,
  error,
} = await useFetch<ICategory>(
  () =>
    `/api/category/${route.params.id}?page=${page.value}&take=${take.value}&skip=${skip.value}&sort_field=${sort_field.value}&sort_direction=${sort_direction.value}&filters=${filters.value}`
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

const sort_active = computed(() => {
  return sort_field.value + sort_direction.value
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

const sort = (item: ISelect) => {
  sort_field.value = item.param
  sort_direction.value = item.prop as string
  sort_title.value = item.title
}

const prices = computed(() => {
  return [category.value?.prices._min.price, category.value?.prices._max.price]
})

const filterSetObj = computed(() => {
  return _.reduce(
    filterSet.value.map((item: any) => item.rule),
    function (memo, current) {
      return _.assign(memo, current)
    },
    {}
  )
})

const addFilter = (array: Array<ISelect>, filter?: ISelect) => {
  array.push({
    code: filter?.code || '',
    title: filter?.title || '',
    rule: filter?.rule || {},
    param: filter?.param || '',
  })
}

const acceptFilter = (filter: ISelect) => {
  const isExist = filterSet.value.filter((item) => item.code === filter.code)
  if (isExist.length === 0) {
    addFilter(filterSet.value, filter)
  } else {
    if (filter.param !== "manufacturer_id") {
      filterSet.value = filterSet.value.filter(
        (item) => item.code !== filter.code
      )
      addFilter(filterSet.value, filter)
    }
  }

  const rule = JSON.stringify({ ...filterSetObj.value })
  filters.value = rule
}

const changePrice = (pricesParam: Array<number>) => {

  filterSet.value = filterSet.value.filter(
    (item) => item.code !== "price"
  )
  addFilter(filterSet.value, {
    code: "price",
    title: '',
    rule: {
      price: {
        lte: Number(pricesParam[1]),     
        gte: Number(pricesParam[0]),
      },
    },
    param: "_max"
  })
 
   
  const rule = JSON.stringify({ ...filterSetObj.value })
  filters.value = rule
}

const clearFilter = (filterprop: ISelect) => {
  const cleaned = filterSet.value.filter(
    (item: ISelect) => item.param !== filterprop.param
  )
  filterSet.value = cleaned
  const rule = JSON.stringify({ ...filterSetObj.value })
  filters.value = rule
}

const priceFildertString = computed(() => {
  const newprices = JSON.stringify({ ...priceFilter })
  return newprices
})

const where = computed(() => [
  {
    code: "quantity",
    title: "Наличие",
    items: [
      {
        title: "Только в наличии",
        param: "instock",
        prop: "",
        sort: 0,
        code: "quantity",
        rule: {
          quantity: {
            gt: 0,
          },
        },
      },

      {
        title: "Все",
        param: "all",
        code: "quantity",
        prop: "",
        sort: -1,
        rule: {},
      },
    ],
  },
  {
    code: "manufacturer_id",
    title: "Производитель",
    items: category.value?.properties.manufacturer,
  },
])

const priceFilter = {
   
    code: "price",
    title: "Цена",
    items: [
      {
        title: "Цена выше чем",
        param: "_min",
        prop: "",
        code: "price_min",
        rule: {
          price: {
            gte: Number(prices.value[0]),
          },
        },
      },
      {
        title: "Цена меньше чем",
        param: "_max",
        prop: "",
        code: "price_max",
        rule: {
          price: {
            lte: Number(prices.value[1]),
          },
        },
      },
    ]
   }


const sorting: Array<ISelect> = [
  {
    title: "По умолчанию",
    param: "sort_order",
    prop: "asc",
  },
  {
    title: "По возрастанию цены",
    param: "price",
    prop: "asc",
  },
  {
    title: "По убыванию цены",
    param: "price",
    prop: "desc",
  },
  {
    title: "По названию",
    param: "name",
    prop: "desc",
  },
]
</script>

<style></style>
