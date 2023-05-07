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
        <div v-for="product in productsList" :key='product.product_id'>
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
const productsList = ref<IProducts[]>([])


const livesearch = async () => {
 if (query.value.length > 2) {
  try {
      productsList.value = []
      const { products } = await getResult()
      productsList.value = products
  } catch (error) {
    console.log(error)
  }
 }
}
const getResult = (): Promise<ICategory> => {
  return new Promise( async (resolve, reject) => {
      try {
        const {data: response} = await useFetch<ICategory>(
        () =>
        `/api/livesearch/?search=${keywordQuery.value}`
      )
      if (response.value) {
         resolve(response.value)
      }
     
    } catch (error) {
      reject(error)
    }
  })
}




const isSearch = computed(() => {
  return Object.keys(productsList.value).length
  
})

const queryString = computed<string[]>(() => {
  return query.value.split(" ").map(item => " " + item)
})

const keywordQuery = computed(() => {
 return JSON.stringify({ ...searchExample.value[0] })
}) 


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
