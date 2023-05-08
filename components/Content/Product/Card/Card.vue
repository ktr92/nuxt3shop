<template>
  <div class="h-full" :class="{ flex: isInline }">
    <div
      class="w-full h-full bg-white border border-gray-200 shadow relative"
      :class="[
        {
          'flex items-center py-2': isInline,
          'max-w-sm  pb-16 rounded-lg': !isInline,
        },
      ]"
    >
      <a
        href="#"
        v-if="product.image"
        class="block flex items-center justify-center"
        :class="[
          {
            'min-w-[120px] max-w-[120px] h-[120px]': isInline,
            ' h-60 ': !isInline,
          },
        ]"
      >
        <img
          class="rounded-t-lg"
          :class="[{ 'p-4 ': !isInline }]"
          :src="'/' + product.image"
          :alt="product.name"
        />
      </a>
      <div class="px-5 pb-2" :class="[{ 'w-full': isInline }]">
        <a href="#">
          <h5
            class="font-medium leading-5 tracking-tight text-gray-900 mb-2"
            :class="[{ 'text-sm': isInline, 'text-md': !isInline }]"
          >
            {{ product.name }}
          </h5>
        </a>
        <div
          class="flex items-center justify-between"
          :class="[{ 'text-sm': isInline }]"
        >
          <span class="text-gray-500 pr-5">Производитель</span>
          <span class="text-gray-800">{{ product.manufacturer.name }}</span>
        </div>
        <div
          class="flex items-center justify-between"
          :class="[{ 'text-sm': isInline }]"
        >
          <span class="text-gray-500 pr-5">Артикул</span>
          <span class="text-gray-800">{{ product.sku }}</span>
        </div>
        <div
          class="flex items-center justify-between"
          :class="[{ 'text-sm': isInline }]"
        >
          <span class="text-gray-500 pr-5">Наличие</span>
          <span
            class="text-gray-800"
            :class="{
              'text-red-500': product.quantity < 1,
              'text-green font-semibold': product.quantity > 0,
            }"
            >{{ product.quantity > 0 ? "В наличии" : "Нет в наличии" }}</span
          >
        </div>
        <div
          class="bottom-4 w-full left-0 right-0"
          :class="[{ 'py-1': isInline, 'absolute px-5': !isInline }]"
        >
          <!-- <div class="flex items-center mt-2.5 mb-5"></div> -->
          <div class="flex items-center justify-between w-full">
            <span class="text-xl font-bold text-gray-900"
              >{{ product.price }} ₽</span
            >
            <UIButton
              v-if="product.quantity > 0"
              @onclick=""
              size="sm"
              :liquid="false"
              :rounded="true"
            >
              В корзину
            </UIButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface ICard {
  product: IProducts
  cardtype?: string
}
const props = withDefaults(defineProps<ICard>(), {
  cardtype: "",
})
const isInline = computed(() => {
  return props.cardtype === "inline"
})
</script>
