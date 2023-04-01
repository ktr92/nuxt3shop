<template>
  <ul>
    <div :class="['columns-' + item.submenu_columns]">
      <li v-for="subitem in item.submenu">
        <template v-if="subitem.link">
          <NuxtLink v-if="subitem.name" class="bg-white mb-2 hover:text-green block leading-4" :class="{
            'font-semibold text-blue mb-2': subitem.istitle,
            'text-sm text-[#666666]': !subitem.istitle
          }" :to="subitem.link" :target="subitem.new_window ? '_blank' : '_self'">
            {{ subitem.name }}
          </NuxtLink>
        </template>
        <template v-else>
          <div v-if="subitem.content" v-html="decodeHtmlCharCodes(subitem.content)"></div>
          <div v-else class="font-semibold text-blue mb-2">
            {{ subitem.name }}
          </div>
        </template>
        <div v-if="subitem.submenu">
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
  }
})
const { item } = toRefs(props)


</script>

<style scoped>
li {
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;
}
</style>