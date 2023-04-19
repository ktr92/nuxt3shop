<template>
  <div>
    <UIDropdown>
      <template #title>{{ filter.title }} </template>
      <template #current v-if="current?.length">
        <span class="flex bg-slate-400 rounded ml-2 pl-1">
          <span class="flex text-white">{{ current }}</span>
          <span class="flex" @click="$emit('clearFilter', filter.param)"
            ><XMarkIcon class="w-5 h-5 stroke-white"
          /></span>
        </span>
      </template>
      <template #components>
        <UISelect
          :items="filter.items"
          @dropdownAction="$emit('filtering', $event)"
        ></UISelect>
      </template>
    </UIDropdown>
  </div>
</template>
<script lang="ts" setup>
import { XMarkIcon } from "@heroicons/vue/24/outline"
const props = defineProps({
  filter: {
    type: Object,
    required: true,
  },
  current: {
    type: String,
    required: false,
  },
})
</script>
