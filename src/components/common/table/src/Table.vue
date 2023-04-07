<template>
  <div class="hims-table">
    <el-table
      :data="listData"
      border
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      />
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        align="center"
        label="序号"
        width="80"
      />
      <template
        v-for="item in propsList"
        :key="item.prop"
      >
        <el-table-column
        v-bind="item"
        align="center"
        show-overflow-tooltip
        >
          <template #default="scope">
            <slot :name="item?.slotName" :row="scope.row">
              {{scope.row[item.prop]}}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="table-pagination" v-if="showPagination">
      <el-pagination
        @size-change="handSizeChange"
        :total="totalCount"
        :page-sizes="[10, 20, 30, 40, 50]"
        layout="sizes,total"
        background
      />
      <el-pagination
        @current-change="handCurrentPageChange"
        :total="totalCount"
        :page-size="page.pageSize"
        :currentPage="page.currentPage"
        layout="prev, pager, next, jumper"
        background
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IChildrenProps, IPageProps } from "../type/index"

interface TablePropsType {
  propsList?: any[]
  listData?: any[]
  childrenProps?: IChildrenProps
  showSelectColumn?: boolean
  showIndexColumn?: boolean
  totalCount?: number
  page?: IPageProps
  showPagination?: boolean
}

const props = withDefaults(defineProps<TablePropsType>(), {
  propsList() {
    return []
  },
  listData() {
    return []
  },
  childrenProps() {
    return {
      rowKey: "id"
    }
  },
  page() {
    return {
      currentPage: 0,
      pageSize: 10
    }
  },
  showSelectColumn: true,
  showIndexColumn: true,
  totalCount: 0,
  showPagination: true
})

const emit = defineEmits<{
  (event: "update:page", page: any): void
  (event: "selectionChange", value: any[]): void
}>()

const handleSelectionChange = (value: any[]) => {
  emit("selectionChange", value);
}

const handSizeChange = (pageSize: number) => {
  emit("update:page", {...props.page, pageSize});
}

const handCurrentPageChange = (currentPage: number) => {
  emit("update:page", {...props.page, currentPage});
}
</script>

<style scoped lang="less">
.table-pagination {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
