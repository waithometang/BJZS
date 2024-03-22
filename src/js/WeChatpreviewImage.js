import wx from 'weixin-js-sdk'
import Vm from '@/main'
import { WaChatrequireConfig } from './WaChatrequireConfig'

export function WcChatPreviewImage (counts, arr,config) { // counts 图片数组 arr 需要展示的图片路径
  let u = navigator.userAgent
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    WaChatrequireConfig(config)
  }
  wx.ready(function () {
    // 判断调用接口是否支持
    wx.checkJsApi({
      jsApiList: ["previewImage"],
      success: function (rps) {
        // 以键值对的形势返回， true可用接口， false不可用
        if (rps.checkResult.previewImage == false) {
          Vm.changtoast('当前微信版本不支持该功能请升级', "error");
        }
      },
      fail: function (rps) {
        // Vm.changtoast('验证接口失败', 'error')
        // Vm.changtoast(rps.errMsg, 'error')
      }
    })
    wx.previewImage ({
      current: counts,
      urls: arr
    })
  })
}