<template>
  <div class="user">
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

import { PageContent } from "@/components/content/page-content";

import pageContentConfig from "./config/pageContentConfig";

import usePageContent from "@/hook/usePageContent"

const route = useRoute();
const pathArr = route.path.split("/");
const pageName = ref(`${pathArr[pathArr.length - 1]}`);


const [ handleSelectionChange,  pageContentRef ] = usePageContent()

</script>

<style scoped>

</style>
