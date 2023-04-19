<template>
  <div>
    <div class="container relative">
      <template v-if="category">
        <div class="flex items-center justify-between">
          <h1 class="my-8">{{ category.name }}</h1>
          <div class="flex">
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

        <div class="flex items-center mb-4">
          <div v-for="filter in where">
            <NavFilterItem
              :filter="filter"
              :current="currentFilters"
              @filtering="acceptFilter"
              @clearFilter="clearFilter"
            >
            </NavFilterItem>
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
const currentFilters = ref("")
const filterSet = ref([] as Array<any>)

const filterFormat = computed(() => {
  return Object.fromEntries(
    Object.entries(
      JSON.parse(
        "{{%22manufacturer_id%22:{%22equals%22:48}},{%22quantity%22:{%22gt%22:0}}}"
      )
    ).map(([k, v]) => [`${"filters[properties]["}${k}]`, `${v}`])
  )
})

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
  sort_direction.value = item.prop
  sort_title.value = item.title
}

const filterSetObj = computed(() => {
  return _.reduce(
    filterSet.value.map((item: any) => item.rule),
    function (memo, current) {
      return _.assign(memo, current)
    },
    {}
  )
})

const addFilter = (filter: ISelect) => {
  filterSet.value.push({
    code: filter.code,
    current: filter.title,
    rule: filter.rule,
  })
}

const acceptFilter = (filter: ISelect) => {
  const isExist = filterSet.value.filter((item) => item.code === filter.code)
  if (isExist.length === 0) {
    addFilter(filter)
  } else {
    filterSet.value = filterSet.value.filter(
      (item) => item.code !== filter.code
    )
    addFilter(filter)
  }

  const rule = JSON.stringify({ ...filterSetObj.value })
  filters.value = rule
  currentFilters.value = filter.title
  /*  const rule = JSON.stringify({ ...filter.rule })
  filters.value = rule
  currentFilters.value = filter.title */
}

const clearFilter = (filter: ISelect) => {
  /*  const fvalue = JSON.stringify(
    JSON.parse(filters.value).filter(
      (item: ISelect) => item.param !== filter.param
    )
  ) */

  filters.value = "{}"
  currentFilters.value = ""
}

/* const filterSet = [
  {
    code: "quantity",
    current: "Только в наличии",
    rule: {
      quantity: {
        gt: 0,
      },
    },
  },
  {
    code: "manufacturer_id",
    current: "Now Foods",
    rule: {
      manufacturer_id: {
        equals: 48,
      },
    },
  },
] */

const where = [
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
    items: [
      {
        title: "Now Foods",
        param: "nowfoods",
        code: "manufacturer_id",
        prop: "",
        sort: 0,
        rule: {
          manufacturer_id: {
            equals: 48,
          },
        },
      },

      {
        title: "Все",
        param: "all",
        code: "manufacturer_id",
        prop: "",
        sort: -1,
        rule: {},
      },
    ],
  },
]

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
