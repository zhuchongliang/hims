<template>
  <div class="user">
    <PageSearch
      v-bind="pageSearchConifg"
      :page-name="pageName"
      @delete="handleDelete"
      @search="handleSearch"
      @page-change="handlePageChange"
    />
    <PageContent
      :content-config="pageContentConfig"
      :page-name="pageName"
      @selection-change="handleSelectionChange"
      ref="pageContentRef"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRoute } from "vue-router"

import { PageSearch } from '@/components/content/page-search';
import { PageContent } from "@/components/content/page-content";

import pageSearchConifg from './config/pageSearchConfig';
import pageContentConfig from "./config/pageContentConfig";

import usePageSearch from "@/hook/usePageSearch";
import usePageContent from "@/hook/usePageContent"

const route = useRoute();
const pathArr = route.path.split("/");
const pageName = ref(`${pathArr[pathArr.length - 1]}`);

const [ selections, handleDelete, handleSearch ] = usePageSearch(
  pageName.value,
  () => {
    handlePageChange()
  },
  (searchInfo) => {
    if (!pageContentRef.value) return;
    pageContentRef.value.searchInfo = searchInfo;
    handlePageChange()
  }
);
const [ handleSelectionChange, handlePageChange, pageContentRef ] = usePageContent(
  (checked: any[]) => {
    selections.value = checked;
  }
)

</script>

<style scoped>

</style>
