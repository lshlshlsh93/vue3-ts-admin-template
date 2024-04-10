<template>
  <div class="sidebar" ref="sidebarRef">
    <el-menu router :collapse="!sidebarOpened">
      SidebarItem
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useApplication } from '@/stores'

const appStore = useApplication()
const { sidebarOpened } = storeToRefs(appStore)
</script>
