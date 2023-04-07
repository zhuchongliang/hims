<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="collapse ? '64px' : '260px'" class="page-aside">
        <NavMenu
          :collapse="collapse"
          @foldAside="handleFoldAside"
          @selectMenuItem="handleSelectMenuItem"
          :activeMenuItem="activeMenuItem"
        ></NavMenu>
      </el-aside>
      <el-container class="page">
        <el-header class="page-header" height="100px">
          <NavHeader
            ref="navHeaderRef"
            @selectTabItem="handleSelectTabItem"
          />

        </el-header>
        <el-main class="page-content">
          <div class="content">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router";

import { NavMenu } from "@/components/content/nav-menu"
import { NavHeader } from "@/components/content/nav-header";

import type { ITabItem } from "@/components/content/nav-header/types/type";

import { getMenuNameByUrl } from '@/service/main/system/index'

const collapse = ref(false);

function handleFoldAside() {
  collapse.value = !collapse.value;
}

const navHeaderRef = ref<InstanceType<typeof NavHeader>>();
function handleSelectMenuItem(item: ITabItem) {
  navHeaderRef.value?.tabAdd(item);
}

const route = useRoute();
const activeMenuItem = ref(route.fullPath);
function handleSelectTabItem(index: string) {
  activeMenuItem.value = index;
}

onMounted(async () => {
  let path = route.fullPath;
  const name = await getMenuNameByUrl(path);
  name && (navHeaderRef.value?.tabAdd({
    label: name.name,
    name: path,
    url: path
  }))
})
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}
.main-content,
.page {
  height: 100%;
}
.page-aside,
.page-content {
  background-color: #fff;
}
.page-aside {
  margin: 16px 0 16px 16px;
  height: calc(100vh - 32px);
  border-radius: 4px;
  box-shadow: 0 0 12px rgba(0, 0, 0, .12);
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
}
.page-header {
  margin: 16px 16px 0;
  padding: 0;
  height: 50px;
}
.page-content {
  padding: 0;
  margin: 16px 16px 0;
}
</style>
