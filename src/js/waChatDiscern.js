import wx from 'weixin-js-sdk'
import Vm from '@/main'
import { IdCardOrcById, GetMedia } from '@/api/publicApi'
import { WaChatrequireConfig } from './WaChatrequireConfig'

export function waChatDiscern (WaChatConfigData) {
  let dome = new Promise (resolve => {
    let u = navigator.userAgent
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓
      WaChatrequireConfig(WaChatConfigData)
    }
    wx.ready(function () {
      // 判断调用接口是否支持
      wx.checkJsApi({
        jsApiList: ["chooseImage", "uploadImage"],
        success: function (rps) {
          if (rps.checkResult.chooseImage == false || rps.checkResult.uploadImage == false || rps.checkResult.getLocalImgData == false) {
            Vm.changtoast('当前微信版本不支持该功能请升级')
          }
        },
        fail: function (rps) {
        }
      })
      // 拍照或从手机相册获取照片
      wx.chooseImage({
        count: 1,
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
      _GetIdCardOrc(res.serverId, resolve)
    },
    fail: function (rps) {
    }
  })
}

// 识别身份证
function _GetIdCardOrc (item, resolve) {
  GetMedia ({
    mediaId: item
  }).then (rps => {
    if (rps.data.success) {
      let id=rps.data.content.id
      if(!id){
        Vm.changtoast('上传身份证失败');
        return
      }
      IdCardOrcById ({id}). then(rps => {
        if (rps.data.errcode ==0) {
          if (rps.data.type == 'Back') {
            Vm.changtoast('请上传身份证正面照片');
          } else {
            resolve(rps.data)
          }
        }else {
          Vm.changtoast(rps.data.errmsg);
        }
      })
    } else {
      Vm.changtoast(rps.data.errmsg);
    }
  })
}