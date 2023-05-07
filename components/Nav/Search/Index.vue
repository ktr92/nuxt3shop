<template>
  <div>
    <div class="header__button pl-4 relative">
      <div class="searchinput">
        <UIInput v-model="query" @onEnter="gotoSearch" @input='livesearch'></UIInput>
      </div>
      <div class="absolute right-2 top-2 cursor-pointer" @click="gotoSearch">
        <MagnifyingGlassIcon class="w-6 h-6 stroke-slate-500" />
      </div>
      <div class='absolute w-full left-0 top-full bg-white p-2' v-if='productsList'>
        <div class="grid grid-cols-4 gap-3">
            <div v-for="product in productsList">
              <ContentProductCard :product="product" cardtype='list'> </ContentProductCard>
            </div>
          </div>
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

let productsList: IProducts[] | undefined = reactive([])

/* let timeout: ReturnType<typeof setTimeout> | null = null
 */
const livesearch = async () => {
 if (query.value.length > 2) {
  try {
      productsList = []
      const { products } = await livesearch_v2()
      productsList = products
  } catch (error) {
    console.log(error)
  }
    
 }
}

const livesearch_v2 = (): Promise<ICategory> => {
  return new Promise(async (resolve, reject) => {
      try {
        const {data: response} = await useFetch<ICategory>(
        () =>
        `/api/search/?page=1&take=3&skip=0&sort_field=${sort_field.value}&sort_direction=${sort_direction.value}&search=${keywordQuery.value}`
      )
      resolve(response.value as ICategory)
    } catch (error) {
      reject(error)
    }
  }) 
}



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
