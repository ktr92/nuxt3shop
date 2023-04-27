<template>
  <div class="w-full">
    <input
      type="text"
      :model-value="props.modelValue"
      @input="(event) => onChange(event)"
      @keyup.enter="$emit('onEnter')"
      class="
        w-full
        px-4
        border-slate-400
        hover:border-slate-500
        focus:border-slate-600
        transition-all
        border-2
        rounded-md
        h-10
      "
    />
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits(["update:modelValue"])
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})
const onChange = (event: Event) => {
  emits("update:modelValue", (<HTMLTextAreaElement>event.target).value)
}
</script>
