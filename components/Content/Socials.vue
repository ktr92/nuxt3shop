<template>
  <div>
    <div class="header__socials" v-if="socialResult">
      <ul class="flex items-center">
        <template v-for="item in socialResult">
          <UIIconlink :link="item.link">
            <component :is="item.icon"></component>
          </UIIconlink>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nx_socials } from '.prisma/client';
import { defineAsyncComponent } from 'vue'


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