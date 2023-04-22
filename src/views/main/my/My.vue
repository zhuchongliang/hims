<template>
  <div class="my">
    <div class="userInfo">
      <el-upload
      class="avatar-uploader"
      action="/api/upload/avatar"
      :headers="{ 'Authorization': `Bearer ${cache.get('token')}`}"
      :auto-upload="false"
      :disabled="!isChanging"
      :limit="1"
      :on-exceed="handleExceed"
      ref="uploadRef"
      :on-remove="handleRemove"
      :on-change="handlePictureSelect"
      :show-file-list="false"
    >
      <div class="preview" v-if="previewUrl">
          <img w-full :src="previewUrl" alt="Preview Image" />
          <div class="modal" @click="handleModalClick">
            <span
              class="bigger"
              @click="handlePictureCardPreview"
            >
              <el-icon><zoom-in /></el-icon>
            </span>
            <span
              class="delete"
              @click="handleRemove"
            >
              <el-icon><Delete /></el-icon>
            </span>
          </div>
      </div>
      <img v-else-if="userInfo.avatar_url" :src="userInfo.avatar_url" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <el-form
      label-width="70"
    >
      <el-form-item label="用户名 :">
        <span v-if="!isChanging">{{userInfo.name}}</span>
        <el-input v-model="userInfo.name" v-else></el-input>
      </el-form-item>
      <el-form-item label="性别 :">
        <span v-if="!isChanging">{{userInfo.gender}}</span>
        <template v-else>
          <el-radio-group v-model="userInfo.gender">
            <el-radio border label="男" />
            <el-radio border label="女" />
          </el-radio-group>
        </template>
      </el-form-item>
      <el-form-item label="地址 :">
        <span v-if="!isChanging">{{userInfo.address}}</span>
        <el-input v-model="userInfo.address" v-else></el-input>
      </el-form-item>
      <el-form-item label="邮箱 :">
        <span v-if="!isChanging">{{userInfo.emall}}</span>
        <el-input v-model="userInfo.emall" v-else></el-input>
      </el-form-item>
      <el-form-item label="手机号 :">
        <span v-if="!isChanging">{{userInfo.phone}}</span>
        <el-input v-model="userInfo.phone" v-else></el-input>
      </el-form-item>
      <el-form-item label="角色id :">
        <span>{{userInfo.roleId}}</span>
      </el-form-item>
    </el-form>
    <div class="my-footer">
      <el-button
        class="cancer"
        size="large"
        type="primary"
        v-if="isChanging"
        @click="isChanging=false"
      >取消</el-button>
      <el-button
        class="confirm"
        @click="handleButtonClick"
        size="large"
        :type="isChanging ? 'danger' : 'primary'"
      >{{!isChanging ? "编辑": "确定"}}</el-button>
    </div>
    <el-dialog v-model="dialogVisible">
      <img w-full :src="previewUrl" alt="Preview Image" />
    </el-dialog>
    </div>
    <div class="handle-record">
      <div class="handle-record-title">操作日志</div>
      <div class="handle-record-content">
        <el-scrollbar>
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="utcToDateTimeFormat(activity.createAt)"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/stores/user';
import cache from '@/utils/cache';
import { utcToDateTimeFormat } from "@/utils/date-format"

import { watch, nextTick, ref, computed } from "vue"

import type { UploadInstance,  UploadRawFile, UploadProps } from 'element-plus'

import { Plus, Delete, ZoomIn } from "@element-plus/icons-vue"
import { genFileId } from 'element-plus'

const userStore = useUserStore();
const userInfo = ref({...userStore.userEntireInfo});
const isChanging = ref(false);
const uploadRef = ref<UploadInstance>();
const previewUrl = ref("");
const dialogVisible = ref(false);

watch(() => userStore.userEntireInfo, () => {
  userInfo.value = {...userStore.userEntireInfo};
})

const handleButtonClick = async () => {
  if (!isChanging.value) {
    isChanging.value= true;
  } else {
    const { id, name, gender, emall, phone, address } = userInfo.value;
    const newUserInfo = {
      id,
      name,
      gender,
      emall,
      phone,
      address
    }
    isChanging.value = false;
    await userStore.editUserInfo(newUserInfo);
    uploadRef.value?.submit();
    nextTick(async () => {
      await userStore.getUserInfo();
      if (userStore.userEntireInfo) {
        userStore.userEntireInfo.avatar_url = previewUrl.value;
      }
    })
  }
}

const handleExceed:  UploadProps['onExceed'] = async (files) => {
  uploadRef.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  uploadRef.value!.handleStart(file)
}
const handlePictureSelect: UploadProps['onChange'] = (uploadFile) => {
  previewUrl.value = window.webkitURL.createObjectURL(uploadFile.raw!);
}
const handleRemove = () => {
  uploadRef.value?.clearFiles();
  previewUrl.value = "";
}
const handlePictureCardPreview = () => {
  dialogVisible.value = true;
}
const handleModalClick = (event) => {
  event.stopPropagation();
}
userStore.getRecordListAction();
const activities = computed(() => userStore.recordList);
</script>

<style lang="less">
@import "@/assets/css/theme.less";
.my {
  background-color: #f5f5f5;
  display: flex;
  .userInfo {
    background-color: #fff;
    padding: 60px;
    margin-right: 40px;
    width: 550px;
    border-radius: 5px;
    border-top: 3px solid @theme-color;
    img {
      width: 100%;
      height: 100%;
      max-width: 800px;
      max-height: 600px;
      object-fit: contain;
    }
    .el-form {
    .el-form-item {
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(194, 198, 206, .5);
    }
  }
  }
  .handle-record {
    background-color: #fff;
    width: 650px;
    &-title {
      padding: 18px 20px;
      font-size: 14px;
      color: #303133;
      border-bottom: 1px solid #e4e7ed;
    }
    &-content {
      height: 700px;
      padding: 18px 20px;
      .el-timeline {
        margin-top: 4px;
      }
    }
  }
}
.avatar-uploader {
  text-align: center;
  margin-bottom:  40px;
  .preview {
    width: 100%;
    height: 100%;
    position: relative;
    &:hover {
      .modal {
        visibility: visible;
      }
    }
    .modal {
      position: absolute;
      visibility: hidden;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #7f7f7f;
      opacity: .4;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 18px;
      .delete {
        margin-left: 20px;
      }
    }
  }
}
.avatar-uploader .el-upload {
  width: 180px;
  height: 180px;
  border: 1px dashed #dcdfe6;;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: .2s;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.my-footer {
  margin-top: 20px;
  padding-left: 40px;
  .confirm {
    margin-left: 30px;
  }
}
</style>
