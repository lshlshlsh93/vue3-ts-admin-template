<template>
  <div class="sidebar-close-open" @click="appStore.toggleSidebarOpened()">
    <el-icon>
      <expand v-show="appStore.sidebarOpened" />
      <fold v-show="!appStore.sidebarOpened" />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { useApplication } from '@/stores'

const appStore = useApplication()

</script>

<style lang="scss" scoped>
.sidebar-close-open {
  display: flex;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
}
</style>
