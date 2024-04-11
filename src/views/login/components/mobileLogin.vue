<script setup lang="ts">
import type { ILogin } from '@/views/login/index.vue'
import { ElForm } from 'element-plus'

interface ILoginProps {
  modelValue: ILogin;
  loginFormRules?: any;
  loading: boolean;
  isSession?: boolean;
}

const props = withDefaults(defineProps<ILoginProps>(), {
  loginFormRules: {
    phone: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  },
  isSession: false
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: ILogin): void
  (event: 'update:isSession', value: boolean): void;
  (event: 'login'): void;
}>()
const loginFormRef = ref<InstanceType<typeof ElForm>>()

// 修改表单数据
const handleValueChange = (value: string, field: string) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}

const handleLoginBtn = async () => {
  const valid = await loginFormRef.value?.validate()
  if (valid) {
    emit('login')
  }
}
</script>

<template>
  <div class="login-container">
    <div class="image-mobile">
      <img src="@/assets/images/login_images/th.webp" alt="...">
    </div>
    <div class="login-wrapper">
      <div class="login-card">
        <el-form
          ref="loginFormRef"
          :model="props.modelValue"
          :rules="props.loginFormRules"
          class="login-form"
          label-position="top"
        >
          <el-form-item label="帐号" prop="phone">
            <el-input
              :model-value="props.modelValue.phone"
              size="large"
              placeholder="账户"
              @update:modelValue="handleValueChange($event,'phone')"
            >
              <template #prefix>
                <el-icon>
                  <avatar />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <div class="input-password">
              <el-input
                :model-value="props.modelValue.password"
                size="large"
                type="password"
                placeholder="密码"
                prefix-icon="el-icon-lock"
                show-password
                @update:modelValue="handleValueChange($event, 'password')"
              >
                <template #prefix>
                  <el-icon>
                    <lock />
                  </el-icon>
                </template>
              </el-input>
              <div class="reset-password">忘记密码?</div>
            </div>
          </el-form-item>
          <div class="form-button-wrapper">
            <el-button type="primary" class="form-button" :loading="props.loading" @click="handleLoginBtn">
              登 录
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .image-mobile {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .login-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 2.1333rem 0.96rem 1.2267rem 0.96rem;
    border-radius: 0.8rem 0.8rem 0 0;
    background-color: #fff;
    z-index: 1;
    box-sizing: border-box;
  }
}

.login-card {
  .input-password {
    position: relative;
    width: 100%;
  }

  .reset-password {
    position: absolute;
    bottom: -0.64rem;
    right: 0;
    font-size: .32rem;
    color: #ccc;
  }

  .form-button-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .form-button {
    width: 100%;
    height: 1.2267rem;
    line-height: 1.2267rem;
    padding: 0;
    text-align: center;
    font-size: .4267rem;
    border-radius: .6133rem;
    margin-top: 2.4rem;
    margin-bottom: .4267rem;
    box-shadow: 0 4px 20px 0 rgba(55, 132, 220, 0.25);
  }

  .register {
    color: var(--primary-color);
    text-decoration: none;
    font-size: .4267rem;
    font-weight: 500;
  }
}
</style>
