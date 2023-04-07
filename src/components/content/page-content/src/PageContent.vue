<template>
  <div class="page-content">
    <Table
      v-bind="contentConfig"
      :listData="listData"
      :totalCount="totalCount"
      v-model:page="pageInfo"
      @selection-change="handleSelectionChange"
    >
      <template #status="scope">
        <el-button :type="scope.row.enable ? 'success' : 'danger'" size="small" plain>
          {{ $filters.showStatus(scope.row.enable) }}
        </el-button>
      </template>
      <template #createAt="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ $filters.formatTime(scope.row.updateAt) }}
      </template>
      <template #handler="scope">
        <el-button
          v-if="contentConfig.showEditButton"
          :icon="Edit"
          link
          size="small"
          @click="handleEditClick(scope.row)"
        >编辑</el-button>
        <el-button
          v-if="!contentConfig.showDeleteButton"
          link
          :icon="Delete"
          size="small"
          @click="handleDeleteClick(scope.row)"
        >删除</el-button>
      </template>
      <template v-for="item in otherPropSlots" :key="item.prop" #[item.slotName]="scope">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"

import { Table } from "@/components/common/table"

import { Delete, Edit } from "@element-plus/icons-vue"

import type { IContentConfig } from "../type/index"

import useSystemStore from "@/stores/main/system"

interface PageContentPropsType {
  contentConfig: IContentConfig,
  pageName: string
}

const props = defineProps<PageContentPropsType>();

const emit = defineEmits<{
  (event: "editBtnClick", itemInfo: any): void
  (event: "selectionChange", value: any[]): void
}>()

const pageInfo = ref({
  pageSize: 10,
  currentPage: 1
})

const systemStore = useSystemStore();
const searchInfo = ref("");
const getPageList = async () => {
  if (!searchInfo.value) {
    systemStore.getPageItemListAction("/" + props.pageName, {...pageInfo.value});
  } else {
    systemStore.searchPageListAction("/" + props.pageName, searchInfo.value, pageInfo.value);
  }
}
getPageList();

const listData = computed(() => systemStore[`${props.pageName.split("/")[0]}List`]);
const totalCount = computed(() => systemStore[`${props.pageName.split("/")[0]}TotalCount`]);

watch(pageInfo, () => {
  getPageList();
})

const handleSelectionChange = (value: any[]) => {
  emit("selectionChange", value);
}

const handleDeleteClick = async (itemInfo: any) => {
  await systemStore.deleteListItemAction(props.pageName, itemInfo.id);
  pageInfo.value = {
    ...pageInfo.value,
    currentPage: 1
  }
}

const handleEditClick = (itemInfo: any) => {
  emit("editBtnClick", itemInfo);
}

const otherPropSlots = computed(() => {
  return props.contentConfig.propsList?.filter((item: any) => {
    if (item.slotName === 'createAt') return false
    else if (item.slotName === 'updateAt') return false
    else if (item.slotName === 'handler') return false
    else if (item.slotName === "status") return false;
    return true
  })
})


defineExpose({
  pageInfo,
  searchInfo
})
</script>

<style scoped>

</style>
