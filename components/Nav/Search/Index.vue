<template>
  <div>
    <div class="header__button pl-4 relative">
      <div class="searchinput">
        <UIInput v-model="query"></UIInput>
      </div>
      <div class="absolute right-2 top-2 cursor-pointer" @click="gotoSearch">
        <MagnifyingGlassIcon class="w-6 h-6 stroke-slate-500" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline"
import _ from "lodash"

const query = ref("")
const router = useRouter()

const queryString = computed<string[]>(() => {
  const queryValue = query.value.split(" ")
  queryValue[0] = " " + queryValue[0]
  return queryValue
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
  const keyword = JSON.stringify({ ...searchExample.value[0] })
  router.push({ path: "search", query: { keyword } })
}
</script>
