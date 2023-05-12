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

const pageConfig = useMain()
const productslist = ref<IProductList>()
const { getProductsList } = useProducts()
/* 
watch(
  () => route.fullPath,
  () => getList
)
 */
const getList = async (params: IProductRefreshAPI) => {
  try {
    const list = await getProductsList("/api/search/", {
      search: route.query.keyword,
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
</script>

<style></style>
