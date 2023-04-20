<template>
   <el-form
    status-icon
    :rules="accountRules"
    label-width="80px"
    :model="account"
    ref="formRef"
    label-position="top"
  >
    <el-form-item label="用户名" prop="name">
      <el-input
        size="large"
        v-model="account.name"
      />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        size="large"
        v-model="account.password"
      />
    </el-form-item>
    <el-checkbox v-model="checkRememberPwd" label="记住密码" size="large" />
    <div class="form-button">
      <el-button round size="large" @click="handleReset">重置</el-button>
      <el-button round size="large" type="primary" @click="handleLogin">登录</el-button>
    </div>
    <p class="form-footer">没有账号?点击<router-link to="/regis">立即注册</router-link></p>
  </el-form>
</template>

<script setup lang="ts">
import cryptoJs from "crypto-js"
import cookies from "js-cookie"

import useUserStore from "@/stores/user/index"

import { reactive, ref } from "vue"
import { useRouter } from "vue-router"

import type { FormInstance } from "element-plus";

const account = reactive({
  name: "",
  password: ""
})
const checkRememberPwd = ref(false);

function initAccount() {
    const userName = cookies.get('userName') ? cookies.get('userName') : '';
    const password = cookies.get('userPwd') ? cookies.get('userPwd') : '';
    if (password) {
      account.password = cryptoJs.AES.decrypt(password,'user123!').toString(cryptoJs.enc.Utf8);
      checkRememberPwd.value = true;
    } else {
      account.password = '';
    }
    account.name = userName;
}
initAccount();

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
      cookies.set('userName', account.name, {
          expires: 30
      })
      const res = await userStore.accountLogin({...account});
      if (res) {
        if (checkRememberPwd.value) {
          cookies.set('userPwd', cryptoJs.AES.encrypt(account.password, 'user123!'), {
            expires: 30
          })
        } else {
          cookies.remove("userPwd");
        }
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
<style scoped lang="less">
@import "@/assets/css/theme.less";
.el-form-item {
  margin-bottom: 20px;
}
.form-footer {
  text-align: center;
  font-size: 15px;
  a {
    color: @font-color;
  }
}
.form-button {
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 20px;
  height: 94px;
  width: 100%;
  .el-button {
    margin-left: 0;
  }
}
</style>
