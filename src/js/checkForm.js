/**
 *表单提交内容验证
 *
 * @export
 */
import Vm from '@/main'
export function CheckForm(obj) {
  for (let index = 0; index < obj.length; index++) {
    const element = obj[index];
    if (element.data == '' || element.data == undefined) {
      Vm.changtoast(element.msg, 'warning')
      return true
    }
    // 验证电话号码
    if (element.name == 'phone') {
      let phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/
      if (!phoneReg.test(element.data)) {
        Vm.changtoast(element.msg, 'warning')
        return true
      }
    }
    // 验证姓名
    if (element.name == 'name') {
      let reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/
      if (!reg.test(element.data)) {
        Vm.changtoast(element.msg, 'warning')
        return true
      }
    }
    // 验证身份证号码 
    if (element.name == 'ckad') {
      let regIdNo = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (!regIdNo.test(element.data)) {
        Vm.changtoast(element.msg)
        return true
      }
    }
  }
  return false
}