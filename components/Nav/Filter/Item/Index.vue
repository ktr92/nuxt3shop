<template>
  <div>
    <UIDropdown :title="filter.title">
      <template #components>
        <UISelect :items="filter.items"></UISelect>
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
