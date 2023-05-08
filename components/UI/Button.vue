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
          "
        >
         <slot></slot>
        </button>
</template>

<script setup lang="ts">
import { Events } from "nuxt/dist/app/compat/capi"

  const props = defineProps({
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'md'
    },
    liquid: {
      type: Boolean,
      default: false
    }
  })

  const emits = defineEmits(['onCLick'])

  enum ButtonSizes {
    'sm' = 'px-2 py-3',
    'md' = 'py-3 px-3',
    'lg' = 'px-4 py-3',
  }

  enum TextSizes {
    'sm' = 'text-sm',
    'md' = 'text-md',
    'lg' = 'text-lg',
  }

  const paddingClasses = computed(() => {
    return ButtonSizes[props.size as keyof typeof ButtonSizes]
  })

  const textClass = computed(() => {
    return TextSizes[props.size as keyof typeof ButtonSizes]
  })
  const widthClass = computed(() => {
    return props.liquid ? 'w-full' : 'w-min'
  })

  const classes = computed(() => `${paddingClasses.value} ${textClass.value} ${widthClass}` )

  const onCLick = (event: Event) => {
    emits('onCLick', event)
  }

</script>
