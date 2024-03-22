import el from '@/main';

export function fromInspect (item) {
  let inspectState = false
  item.forEach((val) => {
    switch (val.type) {
      case 'text':
        if (!val.name) {
          el.changtoast(val.message || '请按要求填写或选择相关信息', 'warning')
          inspectState = true
        }
        break;
      case 'phone':
        if(!(/^1[3456789]\d{9}$/.test(val.name))){ 
          el.changtoast(val.message || '您输入的联系电话有误', 'warning')
          inspectState = true
        }
        break;
      case 'card':
        let reg=RegExp("(^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$)|(^[1-9]\\d{5}\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{2}[0-9Xx]$)")
        if (!reg.test(val.name)) {
          el.changtoast(val.message || '您输入的身份证号码有误', 'warning')
          inspectState = true
        }
        break;
      default:
        break;
    }
  })
  return inspectState
}