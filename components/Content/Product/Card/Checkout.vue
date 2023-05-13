<template>
  <div class="flex items-center justify-between w-full">
    <span class="text-xl font-bold text-gray-900">{{ product.price }} ₽</span>
    <UIButton
      @onclick="removeItem(product.product_id)"
      size="sm"
      rounded
      type="danger"
    >
      <XMarkIcon class="stroke-white w-6 h-6" />
    </UIButton>
  </div>
</template>

<script lang="ts" setup>
import { XMarkIcon } from "@heroicons/vue/24/outline"

interface ICard {
  product: IProducts
  count: number
}

const emits = defineEmits(["removeitem"])
const props = defineProps<ICard>()

const removeItem = (product_id: number) => {
  emits("removeitem", product_id)
}
</script>
