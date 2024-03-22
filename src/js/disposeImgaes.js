import wx from 'weixin-js-sdk'
import { GetMediaToMainId } from "@/api/WaChatApi"
import { WaChatrequireConfig } from '@/js/WaChatrequireConfig'
import Vm from '@/main'

// 微信处理图片
export function waChatDisposeImgaes (configDta, amount) {
  let dome = new Promise (resolve => {
    let u = navigator.userAgent
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓
      WaChatrequireConfig(configDta)
    }
    wx.ready(function () {
      // 判断调用接口是否支持
      wx.checkJsApi({
        jsApiList: ["chooseImage", "uploadImage"],
        success: function (rps) {
          if (rps.checkResult.chooseImage == false || rps.checkResult.uploadImage == false || rps.checkResult.getLocalImgData == false) {
            Vm.changtoast('当前微信版本不支持该功能请升级', "error")
          }
        },
        fail: function (rps) {
        }
      })
      // 拍照或从手机相册获取照片
      wx.chooseImage({
        count: amount || 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          let localIds = res.localIds
          waChatUploadImage(localIds, resolve)
        },
        fail: function (rps) {
        }
      })
    })
  })
  return dome
}

// 上传图片到微信服务器
function waChatUploadImage (data, resolve) {
  let localId = data.pop()
  wx.uploadImage({
    localId: localId.toString(),
    isShowProgressTips: 1,
    success: function (res) {
      let Medialds = Vm.$store.state.MedialdsList
      Medialds.push(res.serverId)
      Vm.$store.commit('SetMedialdsList', Medialds)
      if (data.length > 0) {
        waChatUploadImage(data, resolve)
      } else {
        resolve(Medialds)
      }
    },
    fail: function (rps) {
    }
  })
}