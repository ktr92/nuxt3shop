<template>
  <div>
    <div class="header__button  relative">
      <div class="searchinput">
        <UIInput v-model="query" @onEnter="gotoSearch" @input='livesearch'></UIInput>
      </div>
      <div class="absolute right-2 top-2 cursor-pointer" @click="gotoSearch">
        <MagnifyingGlassIcon class="w-6 h-6 stroke-slate-500" />
      </div>
      <div class='absolute w-full left-0 top-full bg-white p-2 z-50' v-if='isSearch'>
        <div v-for="product in productsList">
          <ContentProductCard :product="product" cardtype='inline'> </ContentProductCard>
        </div>
        <button @click.prevent='gotoSearch'  class="
                text-white
                bg-green
                w-full
                hover:bg-blue-800
                focus:ring-4
                focus:outline-none
                font-medium
                px-5 py-4
                text-md
                text-center
                cursor-pointer
              ">Показать больше</button>

      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline"
import _ from "lodash"

const query = ref("")
const router = useRouter()

const sort_field = ref("sort_order")
const sort_direction = ref("asc")

interface IProductsArray extends Array<IProducts>{}

let productsList: IProductsArray | undefined = reactive([])

/* let timeout: ReturnType<typeof setTimeout> | null = null
 */
const livesearch = _.debounce(async () => {
  console.log(productsList)
 if (query.value.length > 2) {
    productsList = []
    const {
      data: products,
      pending,
      refresh,
      error,
    } = await useFetch<ICategory>('/api/search/', {
        query: {
          page: 1,
          take:3,
          skip:0,
          sort_field: sort_field.value,
          sort_direction: sort_direction.value,
          search: keywordQuery.value,
          filters: JSON.stringify({ quantity: {gt: 0} })
        },
        pick: ['products'],
      }
    )
    productsList = products.value?.products
 }
}, 400)

const querySet = (property: string): Array<Object> => {
  const arrQuery = queryString.value.map((item) => {
    return {
      [property]: {
        contains: item,
      },
    }
  })
  return arrQuery
}

const isSearch = computed(() => {
  return productsList?.length
})

const queryString = computed<string[]>(() => {
  return query.value.split(" ").map(item => " " + item)
})

const keywordQuery = computed(() => {
 return JSON.stringify({ ...searchExample.value[0] })
}) 


const searchExample = computed(() => {
  return [
    {
      OR: [
        {
          AND: [...querySet("sku")],
        },
        {
          AND: [...querySet("model")],
        },
        {
          oc_product_description: {
            some: {
              OR: [
                {
                  AND: [...querySet("name")],
                },
                {
                  AND: [...querySet("meta_keyword")],
                },
              ],
            },
          },
        },
      ],
    },
  ]
})

const gotoSearch = () => {
  const keyword = keywordQuery.value
  router.push({ path: "search", query: { keyword } })
}
</script>
