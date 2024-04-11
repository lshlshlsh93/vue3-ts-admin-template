<template>
  <div class="sidebar" ref="sidebarRef">
    <el-menu router :collapse="!sidebarOpened" :default-active="activeMenu">
      <template v-for="item in sidebarRoutes" :key="item.meta?.id">
        <SidebarItem :route="item" :base-path="resolvePath()" />
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import SidebarItem from './sidebarItem.vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useApplication, usePermission } from '@/stores'

const appStore = useApplication()
const permissionStore = usePermission()
const route = useRoute()

const { sidebarOpened } = storeToRefs(appStore)
const { sidebarRoutes } = storeToRefs(permissionStore)
const { firstRoutes } = permissionStore

// 获取完整path
const resolvePath = () => {
  return firstRoutes?.path
}

// 获取当前路径
const activeMenu = computed(() => {
  if (route.matched.length === 4) {
    // 四级菜单,包含tab,需要剔除tab的路径
    const index = route.path.lastIndexOf('\/')
    return route.path.substring(0, index)
  }
  return route.path
})
</script>
