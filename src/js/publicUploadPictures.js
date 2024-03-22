import wx from 'weixin-js-sdk'
import { GetMediaToMainId } from "@/api/publicApi"
import { WaChatrequireConfig } from './WaChatrequireConfig'
import Vm from '@/main'
let Medialds = []

export function publicUploadPictures (configData, mainId, amount) {
  Medialds = []
  let dome = new Promise (resolve => {
    if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1) {
      WaChatrequireConfig(configData)
    }
    wx.ready(function () {
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
        count: amount || 9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          let localIds = res.localIds
          waChatUploadImage(localIds, mainId, resolve)
        },
        fail: function (rps) {
        }
      })
    })
  })
  return dome
}

// 上传图片到微信服务器
function waChatUploadImage (localIds, mainId, resolve) {
  console.log('上传服务器')
  let localId = localIds.pop()
  wx.uploadImage({
    localId: localId.toString(),
    isShowProgressTips: 1,
    success: function (res) {
      Medialds.push(res.serverId)
      if (localIds.length > 0) {
        waChatUploadImage(localIds, mainId, resolve)
      } else {
        GetMediaList(mainId, resolve)
      }
    },
    fail: function (rps) {
    }
  })
}

function GetMediaList (mainId, resolve) {
  console.log('上传本地')
  GetMediaToMainId({
    MediaIds: Medialds,
    mainId: mainId
  }).then (rps => {
    if (rps.data.success) {
      resolve(rps.data.content)
    } else {
      Vm.changtoast(rps.data.message)
    }
  })
}