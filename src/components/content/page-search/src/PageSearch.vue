<template>
  <div class="page-search">
    <div class="page-search-left">
      <el-button
        v-for="button in buttonList"
        @click="handleButtonClick(button.emitEvent)"
        :icon="(map as any)[button.iconName]"
        :color="button.color"
      >{{button.label}}
      </el-button>
    </div>
    <div class="page-search-right">
      <el-input
        :placeholder="input.placeholder"
        :input-style="input.style"
        v-model="inputValue"
        ></el-input>
      <el-button
        :icon="Search"
        @click="handleButtonClick(`search`)"
      >
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import  { Refresh, Delete, Plus, Search } from "@element-plus/icons-vue";

import { ref } from "vue"

import type { IInput, IButton, EmitEventType } from '../type';

import useSystemStore from "@/stores/main/system"

interface ISearchConfig {
  pageName: string
  input?: IInput,
  buttonList?: IButton[]
}

const props = withDefaults(defineProps<ISearchConfig>(), {
  input() {
    return {
      placeholder: "",
      style: {}
    }
  },
  buttonList() {
    return []
  }
})
const emit = defineEmits<{
  (event: "delete" | "add" ): void,
  (event: "search", queryInfo: string): void
  (event: "pageChange", page?: number): void
}>()

const inputValue = ref("");

const handleButtonClick = (emitEvent: EmitEventType) => {
  switch(emitEvent) {
    case "refresh":
      emit("pageChange");
      break;
    case "search":
      emit(emitEvent, inputValue.value);
      break;
    default:
      emit(emitEvent);
  }
}

const systemStore = useSystemStore();

const map = {
  "Delete": Delete,
  "Plus": Plus,
  "Search": Search,
  "Refresh": Refresh
}
</script>

<style scoped lang="less">
.el-icon {
  margin-right: 10px;
}
.page-search {
  display: flex;
  justify-content: space-between;
  padding: 13px 15px;
  &-left button {
    color: #fff;
  }
  &-right {
    .el-button {
      margin-left: 30px;
    }
  }
}
</style>
