<template>
  <div>
    <ul class="flex items-center relative">
      <!-- <li v-for="item in dataMenu" :class="item.nx_menu_isParent ? 'parent' : ''">
        <a :href="item.nx_menu_href" :target="item.nx_menu_isExternal ? '_blank' : '_self'" class="py-2 px-4">
          {{ item.nx_menu_name }}</a>
        <Icon name="uil:angle-down" v-if="item.nx_menu_children" />
        <div class="menulevel2 children hidden absolute left-0 top-full p-4" v-if="item.nx_menu_children">
          <ul>
            <li v-for="subitem in item.nx_menu_children">
              <a :href="subitem.nx_submenu_href" :target="subitem.nx_submenu_isExternal ? '_blank' : '_self'">{{
                subitem.nx_submenu_name
              }}</a>
            </li>
          </ul>
        </div>
      </li> -->

      <li v-for="item in dataMenu">
        <a :href="item.nx_menu_href" :target="item.nx_menu_isExternal ? '_blank' : '_self'" class="py-2 px-4">
          {{ item.nx_menu_name }}</a>
      </li>

    </ul>
  </div>
</template>

<script setup lang="ts">
const { data: dataMenu } = await useFetch('/api/menu')

/* 
type Ilink = {
  nx_menu_href: string,
  nx_menu_name: string,
  nx_menu_isExternal?: 0 | 1
}
type IMenu = {
  link: Ilink,
  children?: Array<IMenu>
}
 */

/* 
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
] */

</script>

<style lang="scss">
.parent:hover {
  .children {
    display: block;
  }
}
</style>