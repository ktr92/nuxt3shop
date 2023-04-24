<template>
  <div class="w-64 h-20 px-6 pt-12">
    <Slider
      v-model="value"
      :min="min"
      :max="max"
      @update="filtering(value)"
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
  max: {
    type: Number,
    default: 0
  }, 
  min: {
    type: Number,
    default: 99999
  }
})  
const value = ref('')

const emit = defineEmits(['filtering'])

onMounted(() => {
   value.value = [...props.values].map((item) => Number(item))
})


let  timeout = null
const filtering = (value) => {
  if (timeout) {
    clearTimeout(timeout)
  }
  timeout = setTimeout(() => { emit('filtering', value) }, 1000)
}

</script>

<style src="@vueform/slider/themes/default.css"></style>

<style>
:root {
  --slider-tooltip-bg: #61bc00;
  --slider-connect-bg: #61bc00;
}
</style>
