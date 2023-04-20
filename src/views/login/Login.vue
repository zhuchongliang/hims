<template>
  <div class="login">
    <div class="login-bg" />
    <div class="login-dialog">
      <div class="login-dialog-form">
        <p class="form-title">医疗药品管理系统</p>
        <LoginForm></LoginForm>
      </div>
    </div>
    <!-- <el-dialog
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
  </el-dialog> -->
  </div>
</template>

<script setup lang="ts">
import LoginForm from "./cpns/LoginForm.vue"
</script>

<style scoped lang="less">
@import "@/assets/css/theme.less";
  // .login-dialog {
  //   .dialog-title {
  //     font-size: 16px;
  //     font-weight: 400;
  //     color: @font-color;
  //   }
  // }
  .login {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .login-dialog {
      box-sizing: border-box;
      width: 35%;
      padding: 144px 160px;
      background: linear-gradient(#c9edf9,#f2fbfe);
      &-form {
        .form-title {
          font-size: 30px;
          font-weight: 500;
          text-align: center;
          margin-bottom: 60px;
        }
      }
    }
    .login-bg {
      flex: 1;
      background: url("@/assets/img/login-bg.png") no-repeat center #F0F0F5;
    }
  }
</style>
