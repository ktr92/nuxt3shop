<template>
  <div class="container m-auto flex items-center justify-between pt-2 pb-2 pr-2">
    <div class="header__contacts flex items-center justify-start">
      <div class="header__phone pr-4">
        <a :href="'tel:' + config?.phone.value">{{ config?.phone.value }}</a>
      </div>

    </div>

    <div class="header__title md:absolute left-0 right-0 m-auto inline-block w-fit">

      <div class="headertitle text-lg font-semibold text-reddish">{{ config?.title.value }}</div>
    </div>

    <div class="header__contacts flex items-center justify-start">

      <div class="header__email pl-4">
        <a :href="'mailto:' + config?.email.value">{{ config?.email.value }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  config: Object,
})
</script>