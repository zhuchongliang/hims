<template>
  <div class="nav-header">
    <el-tabs
      v-model="activeTabValue"
      type="card"
      class="header-tabs"
      :closable="tabList.length !== 1"
      @tab-remove="tabRemove"
      @tab-change="tabChange"
    >
      <el-tab-pane
        v-for="item in tabList"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
    <div class="header-menus">
      <HeaderMenu />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import type { ITabList, ITabItem }  from "../types/type"

import HeaderMenu from "./HeaderMenu.vue";

const emit = defineEmits<{
  (event: "selectTabItem", index: string): void
}>()

const tabList = ref<ITabList>([]);

const activeTabValue = ref("0");

const tabAdd = (item: ITabItem) => {
  if (!tabList.value.find(v => v.name === item.name)) {
    tabList.value.push(item);
  }
  activeTabValue.value = item.name;
}

function tabRemove(name: string) {
  let activeName = activeTabValue.value;
  let index = tabList.value.findIndex(v => v.name === name);
  if (activeName === name) {
    activeTabValue.value = (tabList.value[index + 1] || tabList.value[index - 1])?.name;
  }
  tabList.value.splice(index, 1);
}

const router = useRouter();
function tabChange(name: string) {
  let activeTab = tabList.value.find(v => v.name === name);
  emit("selectTabItem", activeTab!.name)
  router.push(activeTab!.url);
}

defineExpose({
  tabAdd
})
</script>

<style lang="less">
.nav-header {
  display: flex;
  justify-content: space-between;
  .header-tabs {
    width: 700px;
    .is-active {
      background-color: #fff;
      border-bottom-color: #e4e7ed!important;
    }
    .el-tabs__header {
      border-bottom-width: 0;
    }
    .el-tabs__item {
      border-bottom: 1px solid #e4e7ed;
    }
  }
  .header-menus {
    background-color: #fff;
    height: 50px;
    width: 300px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
    border-radius: 4px;
  }
}
</style>
