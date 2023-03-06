<template>
  <div>
    <ul class="flex items-center relative">
      <template v-for="item in dataMenu">
        <li :class="item.nx_menu_isParent ? 'parent' : ''" v-if="!item.nx_parent_id">
          <a :href="item.nx_menu_href" :target="item.nx_menu_isExternal ? '_blank' : '_self'" class="py-2 px-4">
            {{ item.nx_menu_name }}</a>
          <Icon name="uil:angle-down" v-if="item.nx_menu_isParent" />
          <div class="menulevel2 children hidden absolute left-0 top-full p-4" v-if="item.nx_menu_isParent">
            <ul>
              <li v-for="subitem in dataMenu">
                <a v-if="subitem.nx_parent_id === item.nx_menu_id" :href="subitem.nx_menu_href"
                  :target="subitem.nx_menu_isExternal ? '_blank' : '_self'">{{
                    subitem.nx_menu_name
                  }}</a>
              </li>
            </ul>
          </div>
        </li>
      </template>


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