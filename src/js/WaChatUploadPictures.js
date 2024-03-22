import wx from 'weixin-js-sdk'
import { GetMediaToMainId } from "@/api/publicApi"
import { WaChatrequireConfig } from './WaChatrequireConfig'
import Vm from '@/main'

/**
 *  微信sdk上传图片
 * @param {sdk 实例化参数} WaChatConfigData 
 */
let number = ''
export function WaChatUploadPictures(WaChatConfigData,mainId, counts, callback, ...params) {
  number = counts || 1
  let u = navigator.userAgent
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    WaChatrequireConfig(WaChatConfigData)
  }
  wx.ready(function () {
    // 判断调用接口是否支持
    wx.checkJsApi({
      jsApiList: ["chooseImage", "uploadImage", 'getLocalImgData', 'downloadImage'],
      success: function (rps) {
        // 以键值对的形势返回， true可用接口， false不可用
        if (rps.checkResult.chooseImage == false || rps.checkResult.uploadImage == false || rps.checkResult.getLocalImgData == false) {
          Vm.changtoast('当前微信版本不支持该功能请升级', "error")
        }
      },
      fail: function (rps) {
      }
    })
    // 拍照或从手机相册获取照片
    wx.chooseImage({
      count: number, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        Vm.loading()
        syncUpload(localIds,mainId, callback, ...params)
      },
      fail: function (rps) {
      }
    })
  })
}


// 上传多张图片
function syncUpload(localIds,mainId, callback, ...params) {
  var localId = localIds.pop()
  wx.uploadImage({
    localId: localId.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
    isShowProgressTips: 0, // 默认为1，显示进度提示
    success: function (res) {
      //res.serverId 返回图片的服务器端ID
      let Medialds = Vm.$store.state.MedialdsList || []
      Medialds.push(res.serverId)
      Vm.$store.commit('SetMedialdsList', Medialds)
      if (localIds.length > 0) {
        syncUpload(localIds,mainId, callback, ...params)
      } else {
        _GetMediaList(Medialds,mainId, callback, ...params)
      }
    },
    fail: function (rps) {
      Vm.closeLoading()
    }
  })
}

// 上传图片到服务器
function _GetMediaList(item,mainId, callback, ...params) {

  GetMediaToMainId ({
    MediaIds: item,
    mainId
  }).then(rps => {
    Vm.closeLoading()
    Vm.$store.commit('SetMedialdsList', []) // 清空本次选中记录
    if (rps.data.success) {
      if(callback) callback(rps.data.content,...params)
    } else {
      Vm.changtoast(rps.data.message,)
    }
  })
}