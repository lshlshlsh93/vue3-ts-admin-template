<template>
  <div class="personal-container">
    <div class="content-wrapper">
      <!--  tab区域    -->
      <el-card class="left-wrapper" shadow="hover">
        <el-scrollbar>
          <div class="tab-wrapper">
            <div
              v-for="(item, index) in personCenterRouteData"
              :key="item.path"
              class="tab-item"
              @click="handleTabClick(item.path, index)"
            >
              {{ item.meta.name }}
            </div>
            <div class="tab-active" :style="{ transform: `translateY(calc(100% * ${activeTab}))` }"></div>
          </div>
        </el-scrollbar>
      </el-card>
      <!--   内容区域   -->
      <el-card class="right-wrapper" shadow="hover">
        <router-view></router-view>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute, type RouteRecord } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 过滤出包含/personCenter的路由数据
const routerRoutes = router.getRoutes()
const personCenterRouteData: RouteRecord[] = routerRoutes.filter((record: RouteRecord) => {
  return record.path.indexOf('/personCenter/') >= 0
})

// 当前激活的tab选项
const activeTab = ref(0)

// 获取当前路由的全路径名
const nowRoute: string = route.fullPath
// 获取其对应索引
const nowIndex: number = personCenterRouteData.findIndex((record: RouteRecord) => record.path === nowRoute)

// 设置新值
if (nowIndex >= 0) {
  activeTab.value = nowIndex
}

/**
 * 点击tab触发的回调
 * @param {string} path 路由路径
 * @param {number} index 索引值
 */
const handleTabClick = (path: string, index: number) => {
  activeTab.value = index
  router.push(path)
}
</script>

<style lang="scss" scoped>
.personal-container {
  padding: 10px;
  height: calc(100% - var(--bread-crumb-height));
  background-color: #f8f8f8;
  box-sizing: border-box;

  .content-wrapper {
    display: flex;
    height: calc(100% - var(--bread-crumb-height));

    /* 左侧tab样式 */
    .left-wrapper {
      width: 180px;
      flex-shrink: 1;

      .tab-wrapper {
        position: relative;
        margin-top: var(--tab-margin-medium);

        .tab-item {
          position: relative;
          height: var(--tab-height-medium);
          line-height: var(--tab-height-medium);
          text-align: center;
          z-index: 1;
          cursor: pointer;
        }

        .tab-active {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: var(--tab-height-medium);
          background-color: var(--background-color-1);
          z-index: 0;
          border-left: 4px solid var(--primary-color);
          box-sizing: border-box;
          transition: all 0.4s;
        }
      }
    }

    /* 右侧内容样式 */
    .right-wrapper {
      flex: 1;
    }
  }
}


</style>
