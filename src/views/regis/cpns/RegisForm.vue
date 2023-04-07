<template>
  <el-form
    status-icon
    :rules="regisInfoRules"
    label-width="80px"
    :model="regisInfo"
    ref="formRef"
  >
    <el-form-item label="用户名" prop="name">
      <el-input v-model="regisInfo.name"/>
    </el-form-item>
    <el-form-item label="密码" prop="password" required>
      <el-input
        type="password"
        v-model="regisInfo.password"
      />
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPwd" required>
      <el-input
        type="password"
        v-model="regisInfo.confirmPwd"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleReset">重置</el-button>
      <el-button @click="handleRegis">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router"

import type { FormInstance } from "element-plus"

import useUserStore from "@/stores/user/index"


const regisInfo = reactive({
  name: "",
  password: "",
  confirmPwd: ""
})

const formRef = ref<FormInstance>()

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (regisInfo.confirmPwd !== '') {
      if (!formRef.value) return
      formRef.value.validateField('confirmPwd', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入确认密码'))
  } else if (value !== regisInfo.password) {
    callback(new Error("两次密码不匹配"))
  } else {
    callback()
  }
}
const regisInfoRules = {
  name: [
    { required: true, message: '必须输入用户名', trigger: "blur" },
    { pattern: /^.{1,30}$/, message: '用户名必须大于一个字符且不超过30个', trigger: 'blur' }
  ],
  password: [
    { validator: validatePass, trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,}$/, message: '必须是3位以上数字', trigger: 'blur' }
  ],
  confirmPwd: [
    { validator: validatePass2, trigger: 'blur' }
  ],
}

const userStore = useUserStore();

const router = useRouter()

const handleRegis = async () => {
  const result = await userStore.accountRegis({...regisInfo});
  if (result)
    router.push("/main")
}
const handleReset = () => {
  regisInfo.name = "";
  regisInfo.password = "";
  regisInfo.confirmPwd = "";
  formRef.value?.resetFields()
}
</script>

<style scoped>

</style>
