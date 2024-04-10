<script setup lang="ts">
import Logo from '../aside/components/logo.vue'
import SidebarOpenClose from './components/sidebarOpenClose.vue'
import ModuleSelect from './components/moduleSelect.vue'
import User from './components/user.vue'

const props = withDefaults(defineProps<{
  showLogo?: boolean
}>(), {
  showLogo: true
})

</script>

<template>
  <div class="header-container">
    <div class="left-part">
      <div class="logo-container" v-if="props.showLogo">
        <Logo />
      </div>
      <div class="sidebar-control">
        <SidebarOpenClose />
      </div>
      <div class="module-select">
        <ModuleSelect />
      </div>
    </div>
    <div class="right-part">
      <User />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 100%;
  background-color: var(--bg-color-write);
  border-bottom: 1px solid var(--border-bottom-color);

  .left-part {
    display: flex;
    align-items: center;
    height: 100%;

    .logo-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      border-bottom: 1px solid var(--border-bottom-color);
      box-sizing: border-box;
      padding: 0 20px;
    }

    .sidebar-control {
      margin-right: 20px;
    }

    .module-select {
      height: 100%;
    }
  }
}
</style>
