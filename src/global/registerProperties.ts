import type { App } from 'vue'
import { utcToDateTimeFormat } from '@/utils/date-format'

function registerGlobalProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return utcToDateTimeFormat(value)
    },
    showStatus(enable: boolean) {
      return enable ? '启用' : '禁用'
    }
  }
}

export default registerGlobalProperties;
