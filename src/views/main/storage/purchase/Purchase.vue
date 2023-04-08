<template>
  <div class="user">
    <PageSearch
      v-bind="pageSearchConifg"
      :page-name="pageName"
      @search="handleSearch"
      @add="handleNew"
      @page-change="handlePageChange"
    />
    <PageContent
      :content-config="pageContentConfig"
      :page-name="pageName"
      ref="pageContentRef"
    >
    <template #purchaseStatus="{ row }">
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
    <PageModal
      :page-name="pageName"
      :default-info="defaultInfo"
      :page-modal-config="pageModalConfig"
      @page-change="handlePageChange"
      ref="pageModalRef"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRoute } from "vue-router"
import useSystemStore from "@/stores/main/system";

import { PageSearch } from '@/components/content/page-search';
import { PageContent } from "@/components/content/page-content";
import { PageModal } from "@/components/content/page-modal";

import pageSearchConifg from './config/pageSearchConfig';
import pageContentConfig from "./config/pageContentConfig";
import pageModalConfig from "./config/pageModalConfig"

import usePageSearch from "@/hook/usePageSearch";
import usePageContent from "@/hook/usePageContent"
import usePageModal from "@/hook/usePageModal";

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
const [ defaultInfo, pageModalRef, handleNew ] = usePageModal();

const handleStatusChange = async (row: any) => {
  await systemStore.editPageListItemAction(pageName.value, {
    id: row.id,
    drugId: row.drugId,
    count: row.count,
    status: 1
  })
  handlePageChange(0);
}
</script>

<style scoped>

</style>
