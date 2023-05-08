<template>
  <button
    @click.prevent="onClick"
    :disabled="props.disabled"
    :class="classes"
    class="
      text-white
      bg-green
      hover:bg-blue-800
      focus:ring-4
      focus:outline-none
      font-medium
      px-5
      py-4
      text-md text-center
      cursor-pointer
      whitespace-nowrap
    "
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "md",
  },
  liquid: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(["onclick"])

enum ButtonSizes {
  "xs" = "px-[10px] py-[6px]",
  "sm" = "px-[15px] py-[10px]",
  "md" = "py-3 px-3",
  "lg" = "px-12 py-3",
}

enum TextSizes {
  "xs" = "text-xs",
  "sm" = "text-sm",
  "md" = "text-md",
  "lg" = "text-lg",
}

const paddingClasses = computed(() => {
  return ButtonSizes[props.size as keyof typeof ButtonSizes]
})

const textClass = computed(() => {
  return TextSizes[props.size as keyof typeof ButtonSizes]
})
const widthClass = computed(() => {
  return props.liquid ? "w-full" : "w-min"
})
const roundedClass = computed(() => {
  return props.rounded ? "rounded-md" : ""
})

const classes = computed(
  () =>
    `${paddingClasses.value} ${textClass.value} ${widthClass.value} ${roundedClass.value}`
)

const onClick = (event: Event) => {
  emits("onclick", event)
}
</script>
