<template>
  <div class="menus-content">
    <div class="full-screen" @click="setFullscreen">
      <el-icon>
        <FullScreen />
      </el-icon>
    </div>
    <div class="user-info">
      <el-popover placement="top" :width="260" trigger="click">
        <template #reference>
          <div class="user-info-base">
            <div class="avatar">
              <el-avatar :size="24" :src="avatarUrl" />
            </div>
            <div class="name">{{ userInfo?.name}}</div>
          </div>
        </template>
        <template #default>
          <div class="user-info-popper">
            <div class="user-info-popper-top">
              <span class="user-avatar">
                <el-avatar :size="60" :src="avatarUrl"></el-avatar>
              </span>
              <span class="user-name">{{ userInfo?.name }}</span>
              <span class="user-create-time">
                {{ $filters.formatTime(userInfo?.createAt || "") }}
              </span>
            </div>
            <div class="user-info-popper-bottom">
              <el-button type="primary" @click="">个人资料</el-button>
              <el-button type="danger" @click="userStore.loginOut">注销</el-button>
            </div>
          </div>
        </template>
      </el-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';

import { FullScreen } from '@element-plus/icons-vue';
import  useFullscreen from '../hooks/useFullScreen';

import useUserStore from "@/stores/user"

const [, setFullscreen] = useFullscreen();

const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
const avatarUrl = computed(() => userInfo.value?.avatar_url || circleUrl);

const userStore = useUserStore();
onMounted(() => {
  userStore.getUserInfo();
})
const userInfo = computed(() => userStore.userEntireInfo);
</script>
<style scoped lang="less">
.menus-content {
  display: flex;
  justify-content: space-around;
  height: 100%;
  line-height: 50px;
  cursor: pointer;
  .full-screen {
    height: 100%;
    width: 40px;
    text-align: center;
    .el-icon {
        font-size: 16px;
    }
    &:hover {
        background-color: #f5f5f5;
        .el-icon {
          animation: icon-hover 0.3s linear;
        }
    }
  }
  .user-info-base {
    display: flex;
    height: 100%;
    align-items: center;
    padding: 0 10px;
    &:hover {
      background-color: #f5f5f5;
    }
    .name {
      height: 100%;
      font-size: 14px;
      margin-left: 5px;
    }
    .avatar {
      height: 100%;
      .el-avatar {
        vertical-align: middle;
      }
    }
  }
}
.user-info-popper {
  text-align: center;
  &-top {
    display: flex;
    flex-direction: column;
  }
  &-bottom {
    margin-top: 20px;
  }
}
@keyframes icon-hover {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
