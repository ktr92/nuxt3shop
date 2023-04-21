<template>
  <div class="w-64 h-20 px-6 pt-12">
    <Slider
      v-model="value"
      :min="value[0]"
      :max="value[1]"
      @change="filtering"
    />
  </div>
</template>

<script setup>
import Slider from "@vueform/slider"

const props = defineProps({
  values: {
    type: Array,
    required: true,
  },
})
const value = [...props.values].map((item) => Number(item))
</script>

<style src="@vueform/slider/themes/default.css"></style>

<style>
:root {
  --slider-tooltip-bg: #61bc00;
  --slider-connect-bg: #61bc00;
}
</style>
