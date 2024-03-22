import OriginAxios from 'axios'
import {CommonParams, CommonOption} from './config'
import { GetToken } from '@/js/until.js'
import Vm from '@/main'

//响应拦截器
OriginAxios.interceptors.response.use(
  response => {
    return response;
  }, 
  error => {
    Vm.closeLoading()
    let err = error.response // error.code == 'ECONNABORTED' && error.message.indexOf('timeout')!=-1 // 请求超时
    if (err) {
      let state = err.status
      if (state == 401) { // Token 过期
        Vm.changtoast ('用户信息过期，正在重新获取','error')
        GetToken(true)
      } else { // 其他错误信息 404或请求超时
        Vm.changtoast ('网络开小差了, 请刷新页面','error')
      }
    } else {
      Vm.changtoast ('网络开小差了, 请重试','error')
    }
  }
)

// 导出请求函数
export default function axios (SettingOptions,usePartyMember) {
  if(usePartyMember){
    let Token = ''//  TODO  storage.fetch('PMToken').data
    return requestData(SettingOptions,Token)
  }else{
    return new Promise(resolve=>{
      GetToken().then(t=>requestData(SettingOptions,t).then(resolve))
    })
  }
}

function requestData(SettingOptions,Token){
    CommonOption.headers.Authorization = 'Bearer '+ Token
    function isEmpty (obj) {
      return obj != undefined ? obj : {}
    }
    let option = {
      url: SettingOptions.url,
      data: Object.assign({}, CommonParams, isEmpty(SettingOptions.data)),
      ...Object.assign({}, CommonOption, isEmpty(SettingOptions.config))
    }
    return OriginAxios(option)
}
