<template>
  <div v-if="totalItems > perPage">
    <nav class="pager">
      <a
        href="#"
        class="pagerArrow"
        :class="{
          'cursor-not-allowed bg-gray-200 hover:bg-gray-300': isFirstPage,
        }"
        @click.prevent="changePage(currentPage - 1)"
      >
        <ArrowLeftIcon class="w-6 h-4 stroke-slate-400" />
      </a>
      <a
        v-if="hasFirst"
        href="#"
        aria-current="page"
        class="pagerNumber"
        @click.prevent="changePage(1)"
        >1</a
      >
      <span v-if="hasFirst" class="pagerNumber">...</span>
      <a
        v-for="(page, index) in calculatedPages"
        :key="index"
        href="#"
        aria-current="page"
        class="pagerNumber"
        :class="{
          'z-10 text-white bg-green  border-green': currentPage == page,
          'bg-white-500 text-gray-500 border-gray-200': currentPage !== page,
        }"
        @click.prevent="changePage(page)"
        >{{ page }}</a
      >
      <span v-if="hasLast" class="pagerNumber">...</span>
      <a
        v-if="hasLast"
        href="#"
        aria-current="page"
        class="pagerNumber text-gray-500"
        @click.prevent="changePage(totalPages)"
        >{{ totalPages }}</a
      >
      <a
        href="#"
        class="pagerArrow"
        :class="{
          'cursor-not-allowed bg-gray-200 hover:bg-gray-300': isLastPage,
        }"
        @click.prevent="changePage(currentPage + 1)"
      >
        <ArrowRightIcon class="w-6 h-4 stroke-slate-400" />
      </a>
    </nav>
  </div>
</template>

<script setup>
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/vue/24/solid"
</script>
<script>
export default {
  props: {
    currentPageProp: {
      type: Number,
      required: true,
    },
    totalItemsProp: {
      type: Number,
      required: true,
    },
    perPageProp: {
      type: Number,
      required: true,
    },
    pageRangeProp: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      totalItems: this.totalItemsProp,
      currentPage: this.currentPageProp,
      perPage: this.perPageProp,
      pageRange: this.pageRangeProp,
    }
  },
  watch: {
    currentPageProp() {
      this.currentPage = this.currentPageProp
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.perPage)
    },
    paginationFrom() {
      return (this.currentPage - 1) * this.perPage + 1
    },
    paginationEnd() {
      return this.currentPage * this.perPage
    },
    paginationTo() {
      return this.totalItems < this.paginationEnd
        ? this.totalItems
        : this.paginationEnd
    },
    isFirstPage() {
      return this.currentPage === 1
    },
    isLastPage() {
      return this.currentPage >= this.totalPages
    },
    calculatedPages() {
      const pages = []
      for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
        pages.push(i)
      }
      return pages
    },
    rangetoEnd() {
      return this.currentPage + this.pageRange
    },
    rangetoStart() {
      return this.currentPage - this.pageRange
    },
    rangeStart() {
      return this.rangetoStart > 0 ? this.rangetoStart : 1
    },
    rangeEnd() {
      return this.rangetoEnd < this.totalPages
        ? this.rangetoEnd
        : this.totalPages
    },
    hasFirst() {
      return this.rangeStart !== 1
    },
    hasLast() {
      return this.rangeEnd < this.totalPages
    },
  },
  methods: {
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.$emit("pageChanged", page)
        this.currentPage = page
      }
    },
  },
}
</script>

<style scoped>
.pager {
  @apply my-16 relative z-0 inline-flex rounded-md -space-x-px mx-auto w-full justify-center;
}
.pagerArrow {
  @apply relative inline-flex items-center px-2 py-2 border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50;
}
.pagerNumber {
  @apply border relative inline-flex items-center px-4 py-2 text-lg font-medium;
}
</style>
