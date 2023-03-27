<template>
  <div class="container m-auto flex items-center justify-between pt-2 pb-2 pr-2">
    <div class="flex items-center">
      <div class="pr-4">
        <ContentPhone :number="config?.phone.value" v-if="config?.phone.value" />
      </div>
    </div>

    <div class="header__title md:absolute left-0 right-0 m-auto inline-block w-fit">
      <div class="headertitle text-lg font-semibold">{{ config?.title.value }}</div>
    </div>

    <div class="flex items-center">
      <div class="pl-4">
        <ContentEmail :email="config.email.value" v-if="config.email.value" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  config: Object,
})
</script>