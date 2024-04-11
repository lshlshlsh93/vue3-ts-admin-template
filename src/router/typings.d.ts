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

export interface IRouterData {
  id: string;
  code: string;
  url: string;
  name: string;
  level: number;
  parent_id: string;
  [key: string]: any;
}

export interface IRouteType {
  path: string;
  name: string;
  redirect?: string;
  hidden?: boolean;
  component?: RouteComponent;
  meta?: IRouterData;
  children?: any;
}
