/**
 * 关于缓存的Key
 */
export enum EnumStorageKey {

  /** 用户token */
    'accessToken' = '__ACCESS_TOKEN__', 'refreshToken' = '__REFRESH_TOKEN__',

  /** 用户信息 */
    'userinfo' = '__APPLICATION_USERINFO__',

  /** tab路由 */
    'tabRouter' = '__APPLICATION_TAB_ROUTER__',

  /** 当前一级路由 */
    'firstRouter' = '__APPLICATION_FIRST_ROUTER__'
}
