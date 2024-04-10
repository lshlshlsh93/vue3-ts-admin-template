<template>
  <div class="logo">
    <img src="@/assets/images/logo.png" alt="...">
    <span v-show="sidebarOpened">{{ VITE_APP_TITLE }}</span>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useApplication } from '@/stores'
const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE

const appStore = useApplication()
const { sidebarOpened } = storeToRefs(appStore)
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  height: 36px;
  font-size: 16px;
  font-weight: 600;
  box-sizing: border-box;
  align-items: center;

  img {
    width: 20px;
    height: 20px;
  }

  span {
    margin-left: 4px;
  }
}
</style>
