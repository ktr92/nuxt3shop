<template>
  <div>
    <div v-for="filter in where">
      <NavFilterItem :filter="filter"> </NavFilterItem>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  where: {
    type: Object,
    required: true,
  },
})
</script>
