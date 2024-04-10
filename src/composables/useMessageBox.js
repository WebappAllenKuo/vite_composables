import { ElMessage, ElMessageBox } from 'element-plus'


export function useMessageBox(){
  const messageBox = (detail, success, confirm, callBack) => {
    ElMessageBox.confirm(detail, '警告', {
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then((res) => {
        callBack(res)
        ElMessage({
          type: 'success',
          message: success
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: confirm
        })
      })
  }
  return { messageBox }
}