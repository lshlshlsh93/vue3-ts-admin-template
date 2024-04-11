import 'vue-router'

declare module 'vue-router' {
  /**
   * 自定义路由元数据
   */
  interface RouteMeta {

    id?: string
    /**
     * 名称
     */
    name?: string

    /**
     * 图标信息
     */
    icon?: string

    /**
     * 是否需要权限
     * @enum true 需要
     * @enum false 不需要
     */
    requiresAuth?: boolean | false

    /**
     * 权限列表
     * @example [user:resetPassword,user:add]
     */
    permission?: string[]
  }
}
