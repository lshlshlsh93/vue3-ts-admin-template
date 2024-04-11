import { store } from './index'

import { appStore } from './modules/application';
import { permissionStore } from './modules/permission';
import { userStore } from './modules/user'

export function useApplication() {
  return appStore(store)
}
export function usePermission() {
  return permissionStore(store)
}
export function useUser() {
  return userStore(store)
}
