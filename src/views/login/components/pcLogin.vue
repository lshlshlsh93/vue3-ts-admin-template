<template>
  <div class="login-container">
    <div class="image-bc">
      <img src="@/assets/images/login_images/th.webp" alt="...">
    </div>

    <div class="login-wrap">
      <div class="login-card">
        <div class="title">登录</div>
        <el-form
          ref="loginFormRef"
          :model="props.modelValue"
          :rules="props.loginFormRules"
          class="form"
          label-position="top"
        >
          <el-form-item label="账号" prop="phone">
            <el-input
              :model-value="props.modelValue.phone"
              size="large"
              placeholder="账户"
              @update:modelValue="handleValueChange($event, 'phone')"
            >
              <template #prefix>
                <el-icon>
                  <avatar />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
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
          </el-form-item>
          <el-form-item>
            <div class="checkbox">
              <el-checkbox :model-value="props.isSession" @change="handleSessionChange">三天内自动登录</el-checkbox>
              <router-link to="/personCenter/resetPassword">忘记密码?</router-link>
              <div v-show="props.isSession" class="session-msg">
                请注意！您已勾选自动登录。请不要在公共电脑上这样做。
              </div>
            </div>
          </el-form-item>
          <div class="form-button-wrapper">
            <el-button
              type="primary"
              class="form-button"
              :loading="props.loading"
              @click="handleFormBtn"
            >
              登 录
            </el-button>
          </div>
        </el-form>
      </div>
      <div class="bottom-tip">AAA</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { ElForm } from 'element-plus'
import type { ILogin } from '@/views/login/index.vue'

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
  (event: 'update:modelValue', value: ILogin): void;
  (event: 'update:isSession', value: boolean): void;
  (event: 'login'): void;
}>()

const loginFormRef = ref<InstanceType<typeof ElForm>>()

// 修改表单数据
const handleValueChange = (value: string, field: string) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}
// 修改是否自动登录
const handleSessionChange = (value: boolean) => {
  emit('update:isSession', value)
}

const handleFormBtn = async () => {
  const valid = await loginFormRef.value?.validate()
  if (valid) {
    emit('login')
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .image-bc {
    width: 1228px;
    height: 100%;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .login-wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 500px;
    flex: 1;
    height: 100%;
    background-color: #fff;
    align-items: center;
    justify-content: center;
  }
}

@media screen and (max-width: 1728px) {
  .login-wrap {
    position: absolute !important;
    right: 0;
  }
}

/* 登录框 */
.login-card {
  width: 420px;

  .title {
    font-size: 48px;
    color: #666666;
    font-weight: 500;
    text-align: center;
    margin-bottom: 56px;
  }

  .checkbox {
    position: relative;
    width: 100%;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 72px;

    a {
      color: #cccccc;
      text-decoration: none;
    }

    .session-msg {
      position: absolute;
      bottom: 45px;
      color: red;
      font-size: 12px;
    }
  }

  .form-button {
    width: 100%;
    height: 66px;
    line-height: 70px;
    padding: 0;
    text-align: center;
    font-size: 24px;
    letter-spacing: 1em;
    border-radius: 37px;
    box-shadow: 0 4px 20px 0 rgba(55, 132, 220, 0.25);
  }
}

.bottom-tip {
  position: absolute;
  bottom: 64px;
  font-size: 14px;
  color: #999999;
}
</style>
