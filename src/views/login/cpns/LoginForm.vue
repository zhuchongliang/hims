<template>
   <el-form
    status-icon
    :rules="accountRules"
    label-width="80px"
    :model="account"
    ref="formRef"
  >
    <el-form-item label="用户名" prop="name">
      <el-input
        v-model="account.name"
      />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        v-model="account.password"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleReset">重置</el-button>
      <el-button @click="handleLogin">登录</el-button>
    </el-form-item>
    <p class="form-footer">没有账号,点击<router-link to="/regis">立即注册</router-link></p>
  </el-form>
</template>

<script setup lang="ts">
import useUserStore from "@/stores/user/index"

import { reactive, ref } from "vue"
import { useRouter } from "vue-router"

import type { FormInstance } from "element-plus";

const account = reactive({
  name: "",
  password: ""
})

const accountRules = reactive({
  name: [
    { required: true, message: '必须输入用户名', trigger: "blur" },
    { pattern: /^.{1,30}$/, message: '用户名必须大于一个字符且不超过30个', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '必须输入密码', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,}$/, message: '必须是3位以上数字', trigger: 'blur' }
  ]
})

const userStore = useUserStore();

const router = useRouter();

const formRef = ref<FormInstance>()
const handleLogin = async () => {
  if (!formRef.value) return;
  await formRef.value.validate(async (valid, fields) => {
    if (valid) {
      const res = await userStore.accountLogin({...account});
      if (res) {
        router.push("/main/dashboard");
      }
    } else {
      console.log('error submit!', fields)
    }
  })

}
const handleReset = () => {
  account.name = "";
  account.password = "";
  formRef.value?.resetFields()
}
</script>

<style scoped>

.el-form-item {
  margin-bottom: 20px;
}
.form-footer {
  text-align: right;
  font-size: 12px
}
</style>
