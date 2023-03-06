<template>
  <div class="header">
    <div class="header__top flex items-center justify-between py-2">
      <div class="header__contacts flex items-center justify-start">
        <div class="header__phone pr-4">
          <a :href="'tel:' + config?.phone.value">{{ config?.phone.value }}</a>
        </div>
        <div class="header__email pr-4">
          <a :href="'mailto:' + config?.email.value">{{ config?.email.value }}</a>
        </div>
      </div>
    </div>
    <div class="header__main flex items-center justify-between py-2">
      <div class="header__logo flex justify-center"><a href="/"><img :src="config?.logo.value" alt=""></a></div>
      <div class="header__search">
        <div class="headersearch"></div>
        <div class="headertitle text-lg font-semibold">{{ config?.title.value }}</div>
      </div>
      <div class="header__buttons flex items-center">
        <div class="header__button pl-2">
          <a href="">
            <Icon name="material-symbols:favorite-outline" />
          </a>
        </div>
        <div class="header__button pl-2">
          <a href="">
            <Icon name="material-symbols:account-circle" />
          </a>
        </div>
        <div class="header__button pl-2">
          <a href="">
            <Icon name="material-symbols:shopping-cart-outline" />
          </a>
        </div>
      </div>

    </div>
    <div class="header__menu flex items-center justify-between py-2">
      <NavMain />
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: config } = await useFetch('/api/config')
</script>

<style></style>