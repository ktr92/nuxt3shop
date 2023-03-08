<template>
  <div class="header">
    <div class="header__top">
      <div class="container m-auto flex items-center justify-between pt-2 pb-2 pr-2">
        <div class="header__contacts flex items-center justify-start">
          <div class="header__phone pr-4">
            <a :href="'tel:' + config?.phone.value">{{ config?.phone.value }}</a>
          </div>

        </div>
        <div class="header__socials">
          <ul class="flex items-center">
            <li class="pl-2">
              <a href="https://vk.com/zatochkaideal" target="_blank">

              </a>
            </li>
            <li class="pl-2">
              <a href="https://www.instagram.com/zatochka_ideal/" target="_blank">
              </a>
            </li>
            <li class="pl-2">
              <a href="https://www.facebook.com/pg/%D0%A1%D1%82%D1%83%D0%B4%D0%B8%D1%8F-%D0%B7%D0%B0%D1%82%D0%BE%D1%87%D0%BA%D0%B8-%D0%98%D0%B4%D0%B5%D0%B0%D0%BB-114672622564002/posts/"
                target="_blank">

              </a>
            </li>
            <li class="pl-2">
              <a href="https://ok.ru/profile/562028868294" target="_blank">
              </a>
            </li>
          </ul>
        </div>
        <div class="header__contacts flex items-center justify-start">

          <div class="header__email pl-4">
            <a :href="'mailto:' + config?.email.value">{{ config?.email.value }}</a>
          </div>
        </div>
      </div>
    </div>
    <div class="header__main relative">
      <div class="container flex items-center justify-between py-2">
        <div class="header__logo flex justify-center">
          <NuxtLink to="/"><img :src="'/' + config?.logo.value" alt=""></NuxtLink>
        </div>
        <div class="header__search md:absolute left-0 right-0 m-auto inline-block w-fit">

          <div class="headertitle text-lg font-semibold text-reddish">{{ config?.title.value }}</div>
        </div>
        <div class="header__buttons flex items-center">
          <div class="header__button pl-2">
            <a href="">
            </a>
          </div>
          <div class="header__button pl-2">
            <a href="">
            </a>
          </div>
          <div class="header__button pl-2">
            <a href="">
              <ShoppingBagIcon class="w-6 h-6" />

            </a>
          </div>
        </div>

      </div>
    </div>
    <div class="header__menu">
      <div class="container flex items-center justify-between border-b-4 border-[#636363]">
        <NavMain />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShoppingBagIcon } from '@heroicons/vue/24/outline'

const { data: config } = await useFetch('/api/config')
</script>

<style></style>