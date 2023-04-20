<template>
  <div class="page-modal">
    <el-dialog
      :title="pageModalConfig.title"
      width="30%"

      v-model="dialogVisable"
      center
      destroy-on-close
    >
      <el-scrollbar>
        <div class="page-modal-form">
          <Form
            v-bind="pageModalConfig"
            v-model="formData"
          />
          <slot></slot>
        </div>
      </el-scrollbar>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisable = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"

import { Form } from "@/components/common/form"

import useSystemStore from "@/stores/main/system"

interface PageModalPropsType {
  pageModalConfig: any,
  defaultInfo?: any
  otherInfo?: any
  pageName: string
}
const props = withDefaults(defineProps<PageModalPropsType>(), {
  defaultInfo() {
    return {}
  },
  otherInfo() {
    return []
  }
})

const emit = defineEmits<{
  (event: "pageChange", page?: number): void
}>()

const formData = ref({...props.defaultInfo})
watch(() => props.defaultInfo, (newVal) => {
  formData.value = { ...newVal };
})

const systemStore = useSystemStore();
const handleConfirmClick = async () => {
  dialogVisable.value = false;
  const newData = {
      ...formData.value,
      ...props.otherInfo,
  };
  delete newData.createAt;
  delete newData.updateAt;
  if (Object.keys(props.defaultInfo).length === 0) {
    await systemStore.newPageListItemAction(props.pageName, newData);
    emit("pageChange");
  } else {
    await systemStore.editPageListItemAction(props.pageName, newData);
    emit("pageChange", 0);
  }
}

const dialogVisable = ref(false);

defineExpose({
  dialogVisable
})
</script>

<style scoped lang="less">
.page-modal-form {
  max-height: 300px;
}
</style>
