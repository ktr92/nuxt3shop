<template>
  <ul class="columns-1">
    <div :class="[isMasonry ? 'columns-2 md:columns-3 lg:columns-4 p-4' : 'columns-1']">
      <li v-for="subitem in item.submenu" class="columns-1">
        <template v-if="subitem.link">
          <NuxtLink v-if="subitem.name" class="bg-white  hover:text-green block mb-1 px-2  text-[#666666]"
            :to="subitem.link" :target="subitem.new_window ? '_blank' : '_self'">
            {{ subitem.name }}
          </NuxtLink>
        </template>
        <template v-else>
          <div v-if="subitem.content" v-html="decodeHtmlCharCodes(subitem.content)"></div>
          <div v-else class="font-semibold text-blue">
            {{ subitem.name }}
          </div>
        </template>
        <div v-if="item.submenu.length">
          <NavMainSubmenu :item="subitem" />
        </div>
      </li>
    </div>
  </ul>
</template>
<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => { }
  },
  level: {
    type: Number,
    default: 3
  }
})
const { item } = toRefs(props)
const isMasonry = computed(() => props.level === 2)
</script>

<style scoped>
li {
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;
}
</style>