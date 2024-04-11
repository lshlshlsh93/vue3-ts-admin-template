<template>
  <MobileLogin
    v-if="curDeviceType === 'mobile'"
    :loading="loading"
    :login-form-rules="loginFormRules"
    v-model:model-value="loginForm"
    v-model:is-session="isSession"
    v-on:login="handleLogin"
  />
  <PcLogin
    v-else
    :loading="loading"
    :login-form-rules="loginFormRules"
    v-model:model-value="loginForm"
    v-model:is-session="isSession"
    v-on:login="handleLogin"
  />
</template>
<script setup lang="ts">
import MobileLogin from './components/mobileLogin.vue'
import PcLogin from './components/pcLogin.vue'
import { useRouter } from 'vue-router'
import { useApplication, useUser } from '@/stores'
import { useBoolean, useLoading } from '@/hooks'

const router = useRouter()
const appStore = useApplication()
const { curDeviceType } = appStore

export interface ILogin {
  phone: string;
  password: string;
}

const loginForm = ref<ILogin>({
  phone: 'admin',
  password: '123456'
})
const loginFormRules = reactive({
  phone: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

// 加载中
const [loading, startLoading, endLoading] = useLoading(false)
// 记住我
const [isSession] = useBoolean(false)

/**
 * 点击登录触发的回调
 */
const handleLogin = async () => {
  const userStore = useUser()
  const { loginAction } = userStore
  try {
    startLoading()
    await loginAction(loginForm.value)
    await router.push({ path: '/' })
  } finally {
    endLoading()
  }
}
</script>
