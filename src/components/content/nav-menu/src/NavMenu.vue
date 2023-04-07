<template>
    <div class="nav-menu">
      <div class="logo">
        <div class="title" v-show="!props.collapse">
          医疗药品管理系统
        </div>
        <div
          :class="{'expend': collapse, 'fold': !collapse}"
          @click="emit('foldAside')"
        >
          <el-icon class="fold-icon" v-if="props.collapse"><Fold /></el-icon>
          <el-icon class="expand-icon" v-else><Expand /></el-icon>
        </div>
      </div>
      <el-menu
        :default-active="activeMenuItem"
        :collapse="props.collapse"
        class="el-menu-vertical"
      >
        <template v-for="(val, index) in userMenu">
          <el-sub-menu v-if="val.children.length!== 0" :index="val.url">
            <template #title>
              <el-icon class="menu-icon">
                <component :is="(map as any)[val.iconName]"></component>
              </el-icon>
              <span>{{val.name}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(child, i) in val.children"
                :index="child.url"
                @click="handleItemClick(child, child.url)"
              >
                <el-icon class="menu-icon">
                  <component :is="(map as any)[child.iconName]"></component>
                </el-icon>
                <span>{{child.name}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item
            v-else
            :index="val.url"
            @click="handleItemClick(val, val.url)"
          >
            <el-icon class="menu-icon">
                <component :is="(map as any)[val.iconName]"></component>
            </el-icon>
            <span>{{val.name}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
</template>

<script setup lang="ts">
import useUserStore from "@/stores/user"

import { computed } from "vue"

import {
  Fold,
  Expand,
  Files,
  Folder,
  User,
  Menu,
  Avatar,
  Setting,
  UserFilled,
  Odometer,
  List,
  FolderOpened,
  DocumentAdd,
  DocumentRemove,
  Coin
} from '@element-plus/icons-vue'

import type { IMenuTree } from "@/utils/map-menu"
import type { ITabItem } from "../../nav-header/types/type";

interface PropsType {
  collapse: boolean
  activeMenuItem: string
}
const props = withDefaults(defineProps<PropsType>(), {
  collapse: true,
})

const emit = defineEmits<{
  (event: "foldAside"): void
  (event: "selectMenuItem", item: ITabItem): void
}>()

const userStore = useUserStore();
const userMenu = computed(() => {
  return userStore.userMenu;
});

const map = {
  "system": Setting,
  "user": User,
  "role": Avatar,
  "menu": Menu,
  "office": Files,
  "storage": Folder,
  "my": UserFilled,
  "dashboard": Odometer,
  "officeInfo": List,
  "stock": FolderOpened,
  "prescription": DocumentRemove,
  "enter": DocumentAdd,
  "odrug": Coin,
  "sdrug": Coin
}

const handleItemClick = (item: IMenuTree, index: string) => {
  let tabItem = {
    name: index,
    label: item.name,
    url: item.url
  }
  emit("selectMenuItem", tabItem);
}
</script>

<style scoped lang="less">
@import "@/assets/css/theme.less";
.logo {
  position: relative;
  height: 50px;
  padding: 10px;
  text-align: center;
  font-size: 20px;
  line-height: 50px;
  color: @font-color;
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .fold {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translate(0, -50%);
    cursor: pointer;
  }
  .expend {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
}
.el-menu-vertical {
  border-width: 0;
}
.menu-icon {
  color: @font-color;
  font-size: 16px;
}
</style>
