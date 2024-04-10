<template>
  <div class="logo-container" v-if="props.showLogo">
    <Logo />
  </div>
  <div class="sidebar-container sidebar-class">
    <el-scrollbar>
      <Sidebar />
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './components/sidebar.vue'
import Logo from './components/logo.vue'

const props = withDefaults(defineProps<{
  showLogo?: boolean
}>(), {
  showLogo: false
})
</script>

<style scoped>
.logo-container {
  display: flex;
  height: var(--header-height);
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #eeeeee;
  box-sizing: border-box;
}

.sidebar-container {
  height: calc(100% - var(--header-height));
  background-color: var(--side-bg-color);
}
</style>
