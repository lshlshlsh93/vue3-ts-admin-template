<template>
  <div class="module-select">

    <div class="icon-wrapper" @click="handleSetScroll(-80)">
      <el-icon>
        <arrow-left />
      </el-icon>
    </div>

    <div class="content-wrapper">
      <el-scrollbar noresize ref="scrollbarRef" @scroll="handleScroll">
        <div class="content">
          <div class="router-item active">
            <span>首页</span>
          </div>
          <div class="router-item">
            <span>组件</span>
          </div>
          <div class="router-item">
            <span>系统设置</span>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <div class="icon-wrapper" @click="handleSetScroll(80)">
      <el-icon>
        <arrow-right />
      </el-icon>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { ElScrollbar } from 'element-plus'



const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
let scrollNum = 0


const handleScroll = (e: any) => {
  scrollNum = e.scrollLeft
}

const handleSetScroll = (num: number) => {
  let count = 0
  if (scrollbarRef.value) {
    const timer = setInterval(() => {
      scrollbarRef.value!.setScrollLeft(num > 0 ? scrollNum + 4 : scrollNum - 4)
      count += 4
      if (count >= Math.abs(num)) {
        clearInterval(timer)
      }
    }, 16)
  }
}
</script>


<style lang="scss" scoped>
.module-select {
  display: flex;
  align-items: center;

  .icon-wrapper {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: #e5e5e5;
  }

  .content-wrapper {
    max-width: 440px;
    padding: 0 10px;

    .content {
      display: flex;
      align-items: center;

      .router-item {
        display: flex;
        font-size: 14px;
        color: #666666;
        flex-shrink: 0;
        cursor: pointer;
        padding: 0 20px;
        align-items: center;

        .icon {
          margin-right: 2px;
        }

        &:hover {
          color: var(--primary-color);
        }
      }

      .active {
        color: var(--primary-color);
      }
    }
  }
}
</style>
