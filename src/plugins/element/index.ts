import type { App } from 'vue'

import {
  Avatar,
  Lock,
  Loading,
  ArrowDown,
  ArrowRight,
  Expand,
  Fold,
  LocationFilled,
  ArrowLeft,
  Tickets,
  MagicStick,
  Bell,
  Aim,
  Cloudy
} from '@element-plus/icons-vue'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/loading/style/css'


export const icons = [
  Avatar,
  Lock,
  Loading,
  ArrowDown,
  ArrowRight,
  Expand,
  Fold,
  LocationFilled,
  ArrowLeft,
  Tickets,
  MagicStick,
  Bell,
  Aim,
  Cloudy
]

// 按需导出图标组件
export default function initElement(app: App): void {
  for (const icon of icons) {
    app.component(icon.name, icon)
  }
}
