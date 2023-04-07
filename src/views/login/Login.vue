<template>
  <el-dialog
    :model-value="true"
    width="400px"
    draggable
    class="login-dialog"
    center
    top="25vh"
    :show-close="false"
    :close-on-press-escape="false"
  >
    <template #header>
      <span class="dialog-title">登录</span>
    </template>
    <LoginForm></LoginForm>
  </el-dialog>
</template>

<script setup lang="ts">
import LoginForm from "./cpns/LoginForm.vue"
</script>

<style scoped lang="less">
@import "@/assets/css/theme.less";
  .login-dialog {
    .dialog-title {
      font-size: 16px;
      font-weight: 400;
      color: @font-color;
    }
  }
</style>
