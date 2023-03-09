<template>
  <div class="header">
    <div class="header__top">
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
    </div>
    <div class="header__main relative py-4">
      <div class="container flex items-center justify-between py-2">
        <div class="header__socials">
          <ul class="flex items-center">
            <template v-for="item in socialResult">
              <ContentContactsIconlink :link="item.link">
                <component :is="item.icon"></component>
              </ContentContactsIconlink>
            </template>
          </ul>
        </div>
        <div class="header__logo flex justify-center md:absolute left-0 right-0 m-auto  w-fit">
          <NuxtLink to="/"><img :src="'/' + config?.logo.value" alt=""></NuxtLink>
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
import { nx_socials } from '.prisma/client';
import { ShoppingBagIcon } from '@heroicons/vue/24/outline'
import { defineAsyncComponent } from 'vue'

const { data: config } = await useFetch('/api/config')
const socialResult = await useFetch('/api/config/socials').then(response => {
  const result = (response.data.value as Array<nx_socials>).map(item => {
    return {
      link: item.nx_socials_link,
      icon: defineAsyncComponent(() =>
        import(`@/components/Icons/${item.nx_socials_icon}.vue`)
      )
    }
  })

  return result
})

</script>

<style></style>