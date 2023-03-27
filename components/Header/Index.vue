<template>
  <div class="header">

    <div class="header__main relative py-2">
      <div class="container flex items-center justify-between py-8">
        <div class="header__contacts -mx-2 flex items-center">
          <div class="px-2">
            <UIIconlink :link="'tel:' + config?.phone.value">
              <PhoneArrowUpRightIcon />
            </UIIconlink>
          </div>
          <div class="px-2">
            <UIIconlink :link="'mailto:' + config?.email.value">
              <EnvelopeIcon />
            </UIIconlink>
          </div>
          <div class="px-2">
            <ContentSocials />
          </div>
        </div>
        <div class="header__logo flex justify-center md:absolute left-0 right-0 m-auto  w-40">
          <NuxtLink to="/"><img :src="'/' + config?.logo.value" alt=""></NuxtLink>
        </div>

        <div class="header__buttons flex items-center">
          <div class="header__button pl-3">
            <a href="">
            </a>
          </div>
          <div class="header__button pl-3">
            <a href="">
              <UserIcon class="w-6 h-6 stroke-slate-600" />
            </a>
          </div>
          <div class="header__button pl-3">
            <a href="">
              <ShoppingBagIcon class="w-6 h-6 stroke-slate-600" />
            </a>
          </div>
        </div>

      </div>
    </div>
    <div class="header__menu">
      <div class="container flex items-center justify-between border-b-2 border-slate-200">
        <NavMainMenu />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShoppingBagIcon, UserIcon, PhoneArrowUpRightIcon, EnvelopeIcon } from '@heroicons/vue/24/outline'

const { data: config } = await useFetch('/api/config')



</script>

<style></style>