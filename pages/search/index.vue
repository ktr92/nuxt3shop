<template>
  <div>
    <div class="container relative">
      <!-- <div v-if="pageConfig.isLoading">
        <UILoading />
      </div>
      <template v-else> -->
      <ContentProductList :productslist="productslist" @onupdate="getList">
        <template v-slot:title>
          <h1 class="my-8">Поиск</h1>
        </template>
      </ContentProductList>
      <!--       </template>
 -->
    </div>
  </div>
</template>

<script setup lang="ts">
const TAKE_NUMBER = 8

const route = useRoute()

let page = 1
let take = TAKE_NUMBER
let skip = page === 1 ? 0 : (page - 1) * take
let sort_field = "sort_order"
let sort_direction = "asc"
let filters = "{}"
const pageConfig = useMain()
const productslist = ref<IProductList>()
const { getProductsList } = useProducts()
/* 
watch(
  () => route.fullPath,
  () => getList
)
 */
const getList = async (params: any) => {
  try {
    pageConfig.addLoading()

    const list = await getProductsList("/api/search/", {
      search: route.query.keyword,
      ...params,
    })
    if (list) {
      productslist.value = list
    }
  } catch (error) {
    console.log(error)
  } finally {
    pageConfig.removeLoading()
  }
}

const data = await getList({
  page: page,
  take: take,
  skip: skip,
  sort_field: sort_field,
  sort_direction: sort_direction,
  filters: filters,
})
</script>

<style></style>
