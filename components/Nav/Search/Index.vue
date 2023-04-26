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
const query = ref("")
const router = useRouter()

const gotoSearch = () => {
  router.push({ path: "search", query: { keyword: query.value } })
}
</script>
