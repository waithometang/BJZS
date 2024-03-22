import wx from 'weixin-js-sdk'
import { WaChatrequireConfig } from './WaChatrequireConfig'
import { GetMediaToMainId } from "@/api/WaChatApi"

/**
 *  微信sdk上传图片
 * @param {sdk 实例化参数} WaChatConfigData 
 */
export function uploadFile(WaChatConfigData, that) {
  let dome = that
  let u = navigator.userAgent
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    WaChatrequireConfig(WaChatConfigData)
  }
  wx.ready(function () {
    wx.checkJsApi({
      jsApiList: ["chooseImage", 'getLocalImgData'],
      success: function (rps) {
        if (rps.checkResult.chooseImage == false || rps.checkResult.getLocalImgData == false) {
          dome.changtoast('当前微信版本不支持该功能请升级', "error")
        }
      },
      fail: function (rps) {
      }
    })
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var localIds = res.localIds
        syncUpload(localIds, dome)
      },
      fail: function (rps) {
      }
    })
  })
}
//  上传图片微信服务器
function syncUpload(localIds, that) {
  let dome = that
  var localId = localIds.pop()
  wx.uploadImage({
    localId: localId.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
    isShowProgressTips: 1, // 默认为1，显示进度提示
    success: function (res) {
      let Medialds = dome.$store.state.MedialdsList
      Medialds.push(res.serverId)
      dome.$store.commit('SetMedialdsList', Medialds)
      if (localIds.length > 0) {
        syncUpload(localIds,dome)
      } else {
        _GetMediaList(Medialds, dome)
      }
    },
    fail: function (rps) {
    }
  })
}

// 上传图片到服务器
function _GetMediaList(item, that) {
  let dome = that
  dome.uploading = true
  dome.$store.commit('SetpublicMessage', '上传失败')
  GetMediaToMainId ({
    MediaIds: item,
    mainId: dome.mainId
  }).then(rps => {
    dome.percent = 0
    dome.uploading = false
    dome.$store.commit('SetMedialdsList', []) // 清空本次选中记录
    if (rps.data.success) {
      dome.changtoast('上传成功')
      dome.uploaded.push(...rps.data.content.urlData)
      dome.mainId = rps.data.content.mainId
      if (dome.doneUpload) dome.doneUpload()
    } else {
      dome.changtoast(rps.data.message, "error")
    }
  })
}