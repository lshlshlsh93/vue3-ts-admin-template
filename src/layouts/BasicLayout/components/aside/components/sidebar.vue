<template>
  <div class="sidebar" ref="sidebarRef">
    <el-menu router :collapse="isCollapse">
      SidebarItem
    </el-menu>
  </div>
</template>

<script lang="ts" setup>

import { useApplication } from '@/stores'

const appStore = useApplication()
// 判断是否收缩
const isCollapse = computed(() => {
  return !appStore.opened
})
</script>
