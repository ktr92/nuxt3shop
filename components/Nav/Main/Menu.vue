<template>
  <div class="border-b-2 border-slate-200">
    <div class="container flex items-center justify-between ">

      <div class="w-full ">
        <ul class="flex items-center justify-between w-full  relative ">
          <template v-for="item in dataMenu">
            <li :class="item.submenu.length ? 'parent' : ''" v-if="!item.parent_id"
              class="flex items-center pt-1 pb-2 first:pl-0 last:pr-0 px-4 ">
              <NuxtLink v-if="item.link" :to="item.link" :target="item.new_window ? '_blank' : '_self'"
                class=" text-md  hover:text-blue whitespace-nowrap">
                {{ item.name }}</NuxtLink>
              <ChevronDownIcon name="uil:angle-down" v-if="item.submenu.length" class="w-4 h-4 ml-1" />
              <div
                class="menulevel2 bg-white children hidden absolute left-0 top-full py-4 z-9 w-full shadow-md	 rounded-b-md shadow-slate-200 px-6"
                v-if="item.submenu.length">
                <NavMainSubmenu :item="item" />
              </div>
            </li>
          </template>


        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/20/solid';


const { data: dataMenu } = await useFetch('/api/menu')

</script>

<style lang="scss">
.parent:hover {
  .children {
    display: block;
  }
}
</style>