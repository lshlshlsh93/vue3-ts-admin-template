<template>
  <template v-if="!route.hidden">
    <!-- 当元素为最后一个 -->
    <el-menu-item v-if="!hasChild()" :index="resolvePath()">
      <span>{{ route.meta?.name }}</span>
    </el-menu-item>

    <!-- 二级菜单 -->
    <el-sub-menu v-else :index="resolvePath()">
      <template #title>
        <span>{{ route.meta?.name }}</span>
      </template>
      <SidebarItem
        v-for="child in route.children"
        :key="child.meta?.id"
        :route="child"
        :base-path="resolvePath()" />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import type { RouteComponent } from 'vue-router'

interface IRouteType {
  path: string;
  name: string;
  redirect?: string;
  hidden?: boolean;
  component?: RouteComponent;
  meta?: any;
  children?: any;
}
interface IProps {
  route: IRouteType,
  basePath: string
}

const props = defineProps<IProps>()

// 判断是否有子路由
const hasChild = () => {
  // 不存在子元素
  if (!props.route.children) {
    return false
  }
  // 获取显示的子元素
  const showChildren = props.route.children.filter((child: IRouteType) => {
    return !child.hidden
  })
  return showChildren.length
}

// 获取完整path
const resolvePath = () => {
  return props.basePath + '/' + props.route.path
}
</script>

<style scoped>
.icon {
  margin-right: 10px;
}
</style>
