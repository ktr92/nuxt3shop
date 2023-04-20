<template>
  <div>
    <UIDropdown>
      <template #title>{{ filterprop.title }} </template>
      <template #current v-if="currentValues?.length">
        <span
          class="flex bg-slate-400 rounded ml-2 pl-1"
          v-for="current in currentValues"
        >
          <span class="flex text-white">{{ current.title }}</span>
          <span class="flex" @click="$emit('clearFilter', current)"
            ><XMarkIcon class="w-5 h-5 stroke-white"
          /></span>
        </span>
      </template>
      <template #components>
        <UISelect
          :items="filterprop.items"
          @dropdownAction="$emit('filtering', $event)"
        ></UISelect>
      </template>
    </UIDropdown>
  </div>
</template>
<script lang="ts" setup>
import { XMarkIcon } from "@heroicons/vue/24/outline"
const props = defineProps({
  filterprop: {
    type: Object,
    required: true,
  },
  currentprop: {
    type: Array<ISelect>,
    required: false,
  },
})
const currentValues = computed(() => {
  return props.currentprop?.filter(
    (item: any) => item.code === props.filterprop.code
  )
})
</script>
