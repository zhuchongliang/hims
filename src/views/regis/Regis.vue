<template>
  <div class="regis">
    <div class="regis-bg" />
    <div class="regis-dialog">
      <div class="regis-dialog-form">
        <p class="form-title">医疗药品管理系统</p>
        <RegisForm></RegisForm>
      </div>
    </div>
  </div>
  <!-- <el-dialog
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
  </el-dialog> -->
</template>

<script setup lang="ts">
import RegisForm from "./cpns/RegisForm.vue"

// import { ArrowLeftBold } from '@element-plus/icons-vue'

// import { useRouter } from "vue-router";

// const router = useRouter()

// const handleBack = () => {
//   router.push("/login");
// }
</script>

<style scoped lang="less">
@import "@/assets/css/theme.less";
  // .regis-dialog {
  //   .dialog-title {
  //     position: relative;
  //     font-size: 16px;
  //     font-weight: 400;
  //     color: @font-color;
  //     &-backfont {
  //       position: absolute;
  //       top: 0;
  //       left: 0;
  //       cursor: pointer;
  //     }
  //   }
  // }
  .regis {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .regis-dialog {
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
    .regis-bg {
      flex: 1;
      background: url("@/assets/img/regis-bg.png") no-repeat center #F0F0F5;
    }
  }
</style>
