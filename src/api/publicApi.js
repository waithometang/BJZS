import Axios from './axios'

import OriginAxios from 'axios'
import {CommonParams} from "./config";


/**微信相关api**/

// 获取授权
export function GetWechatConfig(SettingData) {
  let url = 'api/Wechat/GetWechatConfig'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 通过授权获取token    直接使用原生的axios请求
export function LoginOfficialAccount(SettingData) {
  let url = '/api/MemberLogin/LoginOfficialAccount'
  let data = SettingData

  return OriginAxios({
    url,
    data,
    method: 'post'
  })
}
// 测试专用，通过授权获取token 正式不能用
export function GetTestToken() {
  return OriginAxios({
    baseURL:'/', // 测试环境
    url:'api/MemberLogin/TestLoginWx',
    data:{},
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post'
  })
}
// orc身份证识别
export function IdCardOrcById(Settingdata) {
  let url = 'api/wechat/IdCardOrcById'
  let data = Settingdata

  return Axios({
    url,
    data
  })
}

// 群众上传图片 单张 识别身份证验证
export function GetMedia(Settingdata) {
  let url = 'api/Wechat/GetMedia'
  let data = Settingdata

  return Axios({
    url,
    data
  })
}

// 上传图片 多张 返回对象
export function GetMediaToMainId(Settingdata) {
  let url = 'api/Wechat/GetMediaToMainId'
  let data = Settingdata

  return Axios({
    url,
    data,
    config: {
      timeout: 12000
    }
  })
}


/** 内部api **/
export function Login(SettingData) { // 换取用户token
  let url = 'ybm/api/Wechat/Login'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

//阅读细则
export function GetYdxz(xxlx) {
  let url = 'ybm/api/GetYdxz/' + xxlx

  return Axios({
    url,
    config: { method: 'get' }
  })
}

// 政策信息
export function RxlxInfo(SettingData) {
  let url = 'ybm/api/RxlxInfo'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 获取民族信息
export function MzOption(SettingData) {
  let url = 'ybm/api/MzOption'
  let data = SettingData

  return Axios({
    url,
    data,
    config: {
      method: 'get'
    }
  })
}

// 我的预报名 ybm/api/wdybm
export function wdybm(SettingData) {
  let url = 'ybm/api/wdybm'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 报名前检查
export function BmCheck(SettingData) {
  let url = 'ybm/api/BmCheck'
  let data = SettingData

  return Axios({
    url,
    data
  })
}


// 报名进度
export function jdcx(SettingData) {
  let url = 'ybm/api/jdcx'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 学生信息
export function xxxx(SettingData) {
  let url = 'ybm/api/xxxx'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 报名信息
export function bmxx(SettingData) {
  let url = 'ybm/api/bmxx'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 获取发布类
export function GetPulishList(SettingData) {
  let url = 'api/Common/PulishList'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 发布详细
export function GetPulishDetail(SettingData) {
  let url = 'api/Common/PulishDetail'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 报名信息详细
export function BmxxDetail(SettingData) {
  let url = 'ybm/api/BmxxDetail'
  let data = SettingData

  return Axios({
    url,
    data
  })
}


// 选择毕业学校
export function ByxxOption(xxlx) {
  return Axios({
    url: 'ybm/api/ByxxOption/' + xxlx,
    config: { method: 'get' }
  })
}

// 选择公办学校
export function GbxxOption(xxlx) {
  return Axios({
    url: 'ybm/api/GbxxOption/' + xxlx,
    config: { method: 'get' }
  })
}

// 通知公告
export function sytzgg(SettingData) {
  let url = 'ybm/api/sytzgg'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 通知公告_正式
export function sytzggzs(SettingData) {
  let url = 'ybm/api/sytzggzs'
  let data = SettingData

  return Axios({
    url,
    data
  })
}


// 通知公告详情
export function tzggxq(SettingData) {
  let url = 'ybm/api/tzggxx'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 通知公告详情_正式
export function tzggxxzs(SettingData) {
  let url = 'ybm/api/tzggxxzs'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 通知公告列表
export function tzgglist(SettingData) {
  let url = 'ybm/api/tzgglist'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 通知公告列表_正式
export function tzgglistzs(SettingData) {
  let url = 'ybm/api/tzgglistzs'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 删除图片
export function DelUpload(Settingdata) {
  let url = 'api/wechat/DelUpload'
  let data = Settingdata

  return Axios({
    url,
    data
  })
}

// 是否关注
export function yhxx(SettingData) {
  let url = '/api/member/yhxx'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 检查幼儿信息
export function yeyCheck(SettingData) {
  let url = 'ybm/api/yeyCheck'
  let data = SettingData

  return Axios({
    url,
    data
  })
}

// 检查小学信息
export function xxCheck(SettingData) {
  let url = 'ybm/xxapi/CheckBmData'
  let data = SettingData

  return Axios({
    url,
    data
  })
}
// 检查初中信息
export function czCheck(SettingData) {
  let url = 'ybm/czapi/CheckBmData'
  let data = SettingData

  return Axios({
    url,
    data
  })
}
//
export function getYrrxlx(id) {
  let url = 'ybm/api/getYrrxlx'
  return Axios({
    url,
    data: { id }
  })
}

//
export function CheckBegin(xxlx) {
  let url = 'ybm/api/CheckBegin'
  return Axios({
    url,
    data: { xxlx }
  })
}

//
export function yeyBm(data) {
  let url = 'ybm/api/yeyBm'
  return Axios({
    url,
    data
  })
}

export function yeyxx(data) {
  let url = 'ybm/api/yeyxx'
  return Axios({
    url,
    data
  })
}


export function byyeyxx(data) {
  let url = 'ybm/api/byyeyxx'
  return Axios({
    url,
    data
  })
}

export function Wdyrybm(data) {
  let url = 'ybm/api/Wdyrybm'
  return Axios({
    url,
    data
  })
}

export function Wdxxbm(data) {
  let url = 'ybm/xxapi/Wdbm'
  return Axios({
    url,
    data
  })
}

export function Wdczbm(data) {
  let url = 'ybm/czapi/Wdbm'
  return Axios({
    url,
    data
  })
}


export function Zgscjg(id) {
  let url = 'ybm/api/Zgscjg'
  return Axios({
    url,
    data: {
      id,
      xxlx: 2
    }
  })
}

export function YeyBmxx(id, isview) {
  let url = 'ybm/api/YeyBmxx'
  return Axios({
    url,
    data: {
      id,
      isview
    }
  })
}

export function yryzytb(data) {
  let url = 'ybm/api/yryzytb'
  return Axios({
    url,
    data
  })
}

export function lqjg(id) {
  let url = 'ybm/api/lqjg'
  return Axios({
    url,
    data: {
      id,
      xxlx: 2
    }
  })
}

export function cxtbzy(id) {
  let url = 'ybm/api/cxtbzy'
  return Axios({
    url,
    data: {
      id,
      xxlx: 2
    }
  })
}

export function lqqr(data) {
  let url = 'ybm/api/lqqr'
  return Axios({
    url,
    data
  })
}
//
export function xjzc(data) {
  let url = 'ybm/api/xjzc'
  return Axios({
    url,
    data
  })
}

export function YeyBmxxRxzl(id, isview) {
  let url = 'ybm/api/YeyBmxxRxzl'
  return Axios({
    url,
    data: {
      id,
      isview
    }
  })
}
export function YeyJdcx(id) {
  let url = 'ybm/api/YeyJdcx'
  return Axios({
    url,
    data: {
      id
    }
  })
}
export function YeyBmLb(id) {
  let url = 'ybm/api/YeyBmLb'
  return Axios({
    url,
    data: {
      id
    }
  })
}
export function YeyYbmzl(data) {
  let url = 'ybm/api/YeyYbmzl'
  return Axios({
    url,
    data
  })
}

export function YeyBmxxYbzl(data) {
  let url = 'ybm/api/YeyBmxxYbzl'
  return Axios({
    url,
    data
  })
}

export function ZytbInfo(data) {
  let url = 'ybm/api/ZytbInfo'

  return Axios({
    url,
    data
  })
}

export function Zjpqxx(xxlx) {
  let url = 'ybm/api/Zjpqxx'

  return Axios({
    url,
    data: {
      xxlx
    }
  })
}

export function xxbm(data) {
  let url = 'ybm/xxapi/bm'

  return Axios({
    url,
    data
  })
}

export function czbm(data) {
  let url = 'ybm/czapi/bm'

  return Axios({
    url,
    data
  })
}
