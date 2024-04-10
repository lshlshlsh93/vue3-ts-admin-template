<template>
  <div>
    <el-dropdown class="dropdown" placement="bottom-end" @command="handleCommand">
      <div class="user">
        <div class="avatar">
          <el-avatar src="http://upload-file001.oss-cn-guangzhou.aliyuncs.com/704296930.jpeg" size="small">
            <img src="@/assets/images/logo.png" alt="..." />
          </el-avatar>
        </div>
        <div class="name">
          欢迎你，Lee Hui
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </div>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="user">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退 出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>

</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleCommand = (command: string) => {
  switch (command) {
    case 'logout':
      // TODO: 利用pinia实现用户退出登录
      router.replace('/login')
      break
    case 'user':
      router.push('/personCenter')
      break
  }
}
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  height: var(--header-height);
  align-items: center;
  padding: 0 20px;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }

  .avatar {
    margin-right: 10px;
  }
}

.name {
  display: flex;
  align-items: center;
}
</style>
