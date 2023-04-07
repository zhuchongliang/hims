<template>
  <div class="user">
    <PageSearch
      v-bind="pageSearchConifg"
      :page-name="pageName"
      @search="handleSearch"
      @page-change="handlePageChange"
    />
    <PageContent
      :content-config="pageContentConfig"
      :page-name="pageName"
      ref="pageContentRef"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRoute } from "vue-router"
import useUserStore from "@/stores/user";

import { PageSearch } from '@/components/content/page-search';
import { PageContent } from "@/components/content/page-content";

import pageSearchConifg from './config/pageSearchConfig';
import pageContentConfig from "./config/pageContentConfig";

import usePageSearch from "@/hook/usePageSearch";
import usePageContent from "@/hook/usePageContent"

const route = useRoute();
const pathArr = route.path.split("/");
const pageName = ref(`${pathArr[pathArr.length - 1]}`);

const [ , , handleSearch ] = usePageSearch(
  pageName.value,
  undefined,
  (searchInfo) => {
    if (!pageContentRef.value) return;
    pageContentRef.value.searchInfo = searchInfo;
    handlePageChange()
  }
);
const [ , handlePageChange, pageContentRef ] = usePageContent()

</script>

<style scoped>

</style>
