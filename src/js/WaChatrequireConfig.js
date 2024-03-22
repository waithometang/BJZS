import wx from 'weixin-js-sdk'
import { GetWechatConfig } from "@/api/publicApi";
import Vm from '@/main'

export function WaChatrequireConfig (WaChatConfigData) {
  let url = window.location.href
  let code = '8898'
  if (url.indexOf(code) != -1) {
    return
  }
  let u = navigator.userAgent;
  if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    IosWaChatConfig()
  } else {
    AndroidWaChatConfig(WaChatConfigData)
  }
}

//  ios 微信签名验证
function IosWaChatConfig() {
  let url = encodeURI(window.location.href)
  GetWechatConfig({
    url
  }).then(rps => {
    wx.config({
      debug: false, //是否开启调试模式, true为开启，false关闭
      appId: rps.data.content.appId, // 必填 公众号唯一标识
      timestamp: rps.data.content.timestamp, // 必填 生成签名的时间戳
      nonceStr: rps.data.content.nonceStr, // 必填 生成签名的随机串
      signature: rps.data.content.signature, // 必填 签名
      jsApiList: ["updateAppMessageShareData", "updateTimelineShareData", "onMenuShareTimeline", "onMenuShareAppMessage", "chooseImage", "uploadImage", "getLocation", "previewImage", 'getLocalImgData', 'downloadImage'], // 必填 需要调用的接口
    })
    wx.error(err => {
      // Vm.changtoast(err)
      setTimeout(() => {
        IosWaChatConfig()
      }, 10000);
    })
  })
}

// 安卓 微信签名验证
function AndroidWaChatConfig(WaChatConfigData) {
  if (WaChatConfigData) { // 有微信实例化参数
    wx.config({
      debug: false, //是否开启调试模式, true为开启，false关闭
      appId: WaChatConfigData.appId, // 必填 公众号唯一标识
      timestamp: WaChatConfigData.timestamp, // 必填 生成签名的时间戳
      nonceStr: WaChatConfigData.nonceStr, // 必填 生成签名的随机串
      signature: WaChatConfigData.signature, // 必填 签名
      jsApiList: ["updateAppMessageShareData", "updateTimelineShareData", "onMenuShareTimeline", "onMenuShareAppMessage", "chooseImage", "uploadImage", "getLocation", "previewImage", 'getLocalImgData', 'downloadImage'], // 必填 需要调用的接口
    })
    wx.error(err => {
      AndroidWaChatConfig()
    })
  } else { // 没有微信实例化参数
    let url = encodeURI(window.location.href)
    GetWechatConfig({
      url
    }).then(rps => {
      wx.config({
        debug: false, //是否开启调试模式, true为开启，false关闭
        appId: rps.data.content.appId, // 必填 公众号唯一标识
        timestamp: rps.data.content.timestamp, // 必填 生成签名的时间戳
        nonceStr: rps.data.content.nonceStr, // 必填 生成签名的随机串
        signature: rps.data.content.signature, // 必填 签名
        jsApiList: ["updateAppMessageShareData", "updateTimelineShareData", "onMenuShareTimeline", "onMenuShareAppMessage", "chooseImage", "uploadImage", "getLocation", "previewImage", 'getLocalImgData'], // 必填 需要调用的接口
      })
      wx.error(err => {
        setTimeout(() => {
          AndroidWaChatConfig()
        }, 10000);
      })
    })
  }
}