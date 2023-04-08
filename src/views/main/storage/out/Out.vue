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
    >
      <template #outStatus="{ row }">
        <el-button
          :type="row['status'] ? 'success' : 'danger'"
          size="small"
          :disabled="!!row['status']"
          @click="handleStatusChange(row)"
        >
          {{row["status"] ? "审核完成": "正在审核"}}
        </el-button>
      </template>
    </PageContent>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRoute } from "vue-router"
import useSystemStore from "@/stores/main/system";

import { PageSearch } from '@/components/content/page-search';
import { PageContent } from "@/components/content/page-content";

import pageSearchConifg from './config/pageSearchConfig';
import pageContentConfig from "./config/pageContentConfig";

import usePageSearch from "@/hook/usePageSearch";
import usePageContent from "@/hook/usePageContent"

const route = useRoute();
const pathArr = route.path.split("/");
const pageName = ref(`${pathArr[pathArr.length - 1]}`);
const systemStore = useSystemStore();

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

const handleStatusChange = async (row: any) => {
  await systemStore.editPageListItemAction(pageName.value, {
    id: row.id,
    officeId: row.officeId,
    drugId: row.drugId,
    count: row.count,
    status: 1
  })
  handlePageChange(0);
}
</script>

<style scoped>

</style>
