<template>
  <div class="header">
    <div class="header__top" v-if="config">
      <HeaderTop :config="config" />
    </div>
    <div class="header__main relative py-8">
      <div class="container flex items-center justify-between py-2">
        <div class="header__socials" v-if="socialResult">
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
          <div class="header__button pl-3">
            <a href="">
            </a>
          </div>
          <div class="header__button pl-3">
            <a href="">
              <UserIcon class="w-6 h-6" />
            </a>
          </div>
          <div class="header__button pl-3">
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
import { ShoppingBagIcon, UserIcon } from '@heroicons/vue/24/outline'
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