<template>
  <button
    @click.prevent="onClick"
    :disabled="props.disabled"
    :class="classes"
    class="
      text-white
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
  type: {
    type: String,
    default: "primary",
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

enum ButtonTypes {
  "primary" = "bg-green hover:bg-blue-800 text-white",
  "danger" = "bg-red-500 hover:bg-red-600",
}

const paddingClasses = computed(() => {
  return ButtonSizes[props.size as keyof typeof ButtonSizes]
})

const textClass = computed(() => {
  return TextSizes[props.size as keyof typeof ButtonSizes]
})
const typeClass = computed(() => {
  return ButtonTypes[props.type as keyof typeof ButtonTypes]
})
const widthClass = computed(() => {
  return props.liquid ? "w-full" : "w-min"
})
const roundedClass = computed(() => {
  return props.rounded ? "rounded-md" : ""
})

const classes = computed(
  () =>
    `${paddingClasses.value} ${textClass.value} ${widthClass.value} ${roundedClass.value} ${typeClass.value}`
)

const onClick = (event: Event) => {
  emits("onclick", event)
}
</script>
