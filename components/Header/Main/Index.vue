<template>
  <div class="container flex items-center justify-between pt-2 pb-2">
    <div
      class="header__logo mr-8 flex justify-center left-0 right-0 m-auto w-70"
    >
      <NuxtLink to="/"><img :src="'/' + config?.logo.value" alt="" /></NuxtLink>
    </div>

    <div class="w-full mx-8">
      <NavSearch />
    </div>

    <div class="header__contacts flex items-center mx-8">
      <div>
        <UIIconlink :link="'tel:' + config?.phone.value">
          <PhoneArrowUpRightIcon class="stroke-slate-600 w-6 h-6" />
        </UIIconlink>
      </div>
      <div>
        <UIIconlink :link="'mailto:' + config?.email.value">
          <EnvelopeIcon class="stroke-slate-600 w-6 h-6" />
        </UIIconlink>
      </div>
      <div>
        <ContentSocials />
      </div>
    </div>

    <div class="header__buttons flex items-center ml-8">
      <div class="header__button">
        <NuxtLink to="/" class="relative">
          <UserIcon class="w-6 h-6 stroke-slate-600" />
        </NuxtLink>
      </div>
      <!-- <div class="header__button pl-4">
        <NuxtLink to="/" class="relative">
          <HeartIcon class="w-6 h-6 stroke-slate-600" />
          <span class="buttoncount">0</span>

        </NuxtLink>
      </div> -->

      <HeaderCart />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  UserIcon,
  PhoneArrowUpRightIcon,
  EnvelopeIcon,
} from "@heroicons/vue/24/outline"

const { data: config } = await useFetch("/api/config")
</script>
