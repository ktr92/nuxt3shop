<template>
  <div>
    <div class="header__button relative">
      <div class="searchinput">
        <UIInput
          v-model="query"
          @onEnter="gotoSearch"
          @input="livesearch"
        ></UIInput>
      </div>
      <div class="absolute right-2 top-2 cursor-pointer" @click="gotoSearch">
        <MagnifyingGlassIcon class="w-6 h-6 stroke-slate-500" />
      </div>
      <div
        class="absolute w-full left-0 top-full bg-white p-2 z-50"
        v-if="isSearch"
        v-click-outside="onClickOutside"
      >
        <div v-for="product in productsList" :key="product.product_id">
          <ContentProductCard
            :product="product"
            cardtype="inline"
            @addtocart="addToCart"
          >
          </ContentProductCard>
        </div>
        <UIButton @onclick="gotoSearch" size="lg" :liquid="true">
          Показать больше
        </UIButton>
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
const { getProductsList } = useProducts()

const livesearch = _.debounce(async () => {
  if (query.value.length > 2) {
    try {
      productsList.value = []
      pageConfig.showLive()
      const { products } = await getProductsList("/api/livesearch/", {
        search: keywordQuery.value,
      })
      productsList.value = products
    } catch (error) {
      console.log(error)
    }
  }
}, 500)

const pageConfig = useMain()

const onClickOutside = () => {
  pageConfig.hideLive()
}
const isSearch = computed(() => {
  return Object.keys(productsList.value).length && isShown.value
})
const isShown = computed(() => {
  return pageConfig.getLive
})

const queryString = computed<string[]>(() => {
  return query.value.split(" ").map((item) => " " + item)
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
  pageConfig.hideLive()
  router.push({ path: "/search", query: { keyword } })
}

const useCart = useShoppingCart()
const addToCart = (product: IProducts) => {
  useCart.addToCart(product)
}
</script>
