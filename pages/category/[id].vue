<template>
  <div>
    <div class="container relative">
      <div v-if="!category">
        <UILoading />
      </div>
      <template v-else>
        <ContentProductList :productslist="productslist" @onupdate="getList">
          <template v-slot:title>
            <h1 class="my-8">{{ category.name }}</h1>
          </template>
        </ContentProductList>
        <div class="content description my-8" v-html="description"></div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { decodeHtmlCharCodes } from "@/utils/htmldecode"
import _ from "lodash"

export default defineComponent({
  async setup() {
    const TAKE_NUMBER = 8

    const route = useRoute()

    const pageConfig = useMain()
    const productslist = ref<IProductList>()

    const { getProductsList } = useProducts()

    const {
      data: category,
      pending: pendingCategory,
      error: errorCategory,
    } = await useFetch<ICategory>(() => `/api/category/${route.params.id}`)

    const getList = async (params: IProductRefreshAPI) => {
      try {
        const list = await getProductsList("/api/search/", {
          categoryid: category.value?.category_id,
          ...params,
        })
        if (list) {
          productslist.value = list
        }
      } catch (error) {
        console.log(error)
      }
    }

    const data = await getList({
      page: 1,
      take: TAKE_NUMBER,
      skip: 1,
      sort_field: "sort_order",
      sort_direction: "asc",
      filters: "{}",
    })

    if (errorCategory.value) {
      throw createError({
        statusCode: errorCategory.value.data.statusCode,
        statusMessage: errorCategory.value.data.statusMessage,
        message: "Такой страницы нет",
        fatal: false,
      })
    }

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

    /* watch(
  () => filters,
  () => getList()
)
 */

    pageConfig.setPageInfo(category.value ? category.value.name : "", "#")

    const description = computed(() => {
      return category.value
        ? decodeHtmlCharCodes(category.value.description)
        : ""
    })

    return {
      description,
      category,
      productslist,
      getList,
    }
  },
})
</script>

<style></style>
