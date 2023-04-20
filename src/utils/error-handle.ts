import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
function showErrorMessage(errorMessage: string) {
  ElMessage({
    message: errorMessage,
    showClose: true,
    type: "error"
  })
}
function showSuccessMessage(successMessage: string) {
  ElMessage({
    message: successMessage,
    showClose: true,
    type: "success"
  })
}
export {
  showErrorMessage,
  showSuccessMessage
}
