<script setup lang="ts">
import CustomHeader from './components/header/index.vue'
import CustomAside from './components/aside/index.vue'
import Breadcrumb from './components/breadcrumb/index.vue'
import { useApplication } from '@/stores'

const appStore = useApplication()
const classObj = computed(() => {
  return {
    hideSidebar: !appStore.sidebarOpened,
    openSidebar: appStore.sidebarOpened
  }
})
</script>

<template>
  <el-container class="layout layout-class">
    <el-header class="layout-header">
      <CustomHeader />
    </el-header>
    <el-container class="layout-container">
      <el-aside class="layout-aside" :class="classObj">
        <CustomAside />
      </el-aside>
      <el-main class="layout-main">

        <div class="bread-crumb">
          <Breadcrumb />
        </div>

        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>

        <el-backtop target=".layout-main" />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.layout {
  height: 100%;
}

.layout-header {
  height: var(--header-height);
  padding: 0;
}

.layout-container {
  height: calc(100% - var(--header-height));
}

.layout-aside {
  height: 100%;
  width: var(--sidebar-width);
  transition: width 0.3s;
}

.layout-main {
  position: relative;
  height: 100%;
  padding: 10px;
  background-color: #f8f8f8;
  box-sizing: border-box;
}
</style>
