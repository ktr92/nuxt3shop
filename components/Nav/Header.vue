<template>
  <div>
    <ul class="flex items-center relative">
      <li v-for="item in menu" :class="item.children ? 'parent' : ''">
        <a :href="item.link.href" :target="item.link.isExternal ? '_blank' : '_self'" class="py-2 px-4">
          {{ item.link.name }}</a>
        <Icon name="uil:angle-down" v-if="item.children" />
        <div class="menulevel2 children hidden absolute left-0 top-full p-4" v-if="item.children">
          <ul>
            <li v-for="subitem in item.children">
              <a :href="subitem.link.href" :target="subitem.link.isExternal ? '_blank' : '_self'">{{ subitem.link.name
              }}</a>
            </li>
          </ul>
        </div>
      </li>

    </ul>
  </div>
</template>

<script setup lang="ts">
type Ilink = {
  href: string,
  name: string,
  isExternal?: 0 | 1
}
type IMenu = {
  link: Ilink,
  children?: Array<IMenu>
}



const menu: IMenu[] = [
  {
    link: {
      href: '/katalog/',
      name: 'Каталог'
    },
    children: [
      {
        link: {
          href: '/katalog/kusachki/',
          name: 'Кусачки',
        },

      },
      {
        link: {
          href: '/katalog/nozhnicy/',
          name: 'Ножницы',
        },

      },
      {
        link: {
          href: '/katalog/pincety/',
          name: 'Пинцеты',
        },

      },
      {
        link: {
          href: '/katalog/frezy/',
          name: 'Фрезы',
        },

      },
      {
        link: {
          href: '/katalog/shabery/',
          name: 'Шаберы, пушеры, кюретки',
        },

      },
      {
        link: {
          href: '/katalog/others/',
          name: 'Для ухода за инструментом',
        },

      },
    ]
  },
  {
    link: {
      href: '/dostavka/',
      name: 'Доставка и оплата',
    },

  },
  {
    link: {
      href: '/contacts/',
      name: 'Контакты',
    },
  },
  {
    link: {
      href: '/about/',
      name: 'Где купить'
    },
  },
  {
    link: {
      href: 'http://zatochka7.ru/',
      name: 'Заточка инструмента',
      isExternal: 1
    },
  }
]

</script>

<style lang="scss">
.parent:hover {
  .children {
    display: block;
  }
}
</style>