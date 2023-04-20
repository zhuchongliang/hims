<template>
  <div class="role">
    <PageSearch
      v-bind="pageSearchConifg"
      :page-name="pageName"
      @delete="handleDelete"
      @search="handleSearch"
      @add="handleNew"
      @page-change="handlePageChange"
    />
    <PageContent
      :content-config="pageContentConfig"
      :page-name="pageName"
      @selection-change="handleSelectionChange"
      @edit-btn-click="handleEdit"
      ref="pageContentRef"
    />
    <PageModal
      :page-name="pageName"
      :default-info="defaultInfo"
      :page-modal-config="pageModalConfig"
      @page-change="handlePageChange"
      :other-info="otherInfo"
      ref="pageModalRef"
    >
      <div class="tree">
        <label class="tree-label">权限菜单</label>
        <el-tree
          default-expand-all
          class="menu-tree"
          ref="elTreeRef"
          :data="menuList"
          show-checkbox
          node-key="id"
          @check="handleMenuCheckChange"
          :props="{ label: 'name', children: 'children' }"
        />
      </div>
    </PageModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from "vue"

import { useRoute } from "vue-router"
import useUserStore from "@/stores/user";
import  { ElTree } from "element-plus"
import { deleteEmptyChildren } from "@/utils/map-menu"

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
const userStore = useUserStore();
const elTreeRef = ref<InstanceType<typeof ElTree>>()

const menuList = computed(() => userStore.userMenu ? deleteEmptyChildren([...userStore.userMenu], []) : []);

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

const [ defaultInfo, pageModalRef, handleNew, handleEdit ] = usePageModal(undefined, (item) => {
  nextTick(() => {
    elTreeRef.value?.setCheckedKeys(item.menuList, false);
  })
});

const otherInfo = ref({})
const handleMenuCheckChange = (data1: any, data2: any) => {
  const checkedKeys = data2.checkedKeys
  const halfCheckedKeys = data2.halfCheckedKeys
  const menuList = [...checkedKeys, ...halfCheckedKeys]
  otherInfo.value = { menuList }
}
</script>

<style lang="less">
.role {
  .tree {
    display: flex;
    .tree-label {
      height: 32px;
      width: 68px;
      text-align: right;
      padding: 0 12px 0 0;
      line-height: 32px;
    }
    .el-tree {
      .is-leaf {
        display: none;
      }
    }
  }
}
</style>

