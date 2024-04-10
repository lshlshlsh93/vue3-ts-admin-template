<template>
  <div class="main-container">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts" name="main">
</script>

<style lang="scss" scoped>
.main-container {
  height: calc(100vh - var(--header-height) - 30px - 20px);
}
</style>
