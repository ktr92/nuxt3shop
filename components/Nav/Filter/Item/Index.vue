<template>
  <div>
    <UIDropdown>
      <template #title>{{ filter.title }} </template>
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
const props = defineProps({
  filter: {
    type: Object,
    required: true,
  },
})
</script>
