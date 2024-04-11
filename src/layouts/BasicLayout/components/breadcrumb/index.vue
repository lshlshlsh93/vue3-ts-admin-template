<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in routePath" :key="item.path">
        <span class="text" :class="{ last: index === routePath.length - 1 }">
           {{ item.meta.name }}
        </span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const routePath = computed(() => {
  return route.matched
})
</script>

<style scoped>
.text {
  color: #999999;
}

.last {
  color: #666666;
}
</style>
