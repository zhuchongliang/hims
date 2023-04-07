<template>
  <el-dialog
    :model-value="true"
    width="400px"
    draggable
    class="regis-dialog"
    center
    top="25vh"
    :show-close="false"
    :close-on-press-escape="false"
  >
    <template #header>
      <div class="dialog-title">
        <el-icon class="dialog-title-backfont" @click="handleBack"><ArrowLeftBold /></el-icon>
        注册
      </div>
    </template>
    <regisForm></regisForm>
  </el-dialog>
</template>

<script setup lang="ts">
import regisForm from "./cpns/RegisForm.vue"

import { ArrowLeftBold } from '@element-plus/icons-vue'

import { useRouter } from "vue-router";

const router = useRouter()

const handleBack = () => {
  router.push("/login");
}
</script>

<style scoped lang="less">
@import "@/assets/css/theme.less";
  .regis-dialog {
    .dialog-title {
      position: relative;
      font-size: 16px;
      font-weight: 400;
      color: @font-color;
      &-backfont {
        position: absolute;
        top: 0;
        left: 0;
        cursor: pointer;
      }
    }
  }
</style>
