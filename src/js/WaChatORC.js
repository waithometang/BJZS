import wx from 'weixin-js-sdk'
import Vm from '@/main'
import { IdCardOrcById, GetMedia } from '@/api/publicApi'
import { WaChatrequireConfig } from './WaChatrequireConfig'


/**
 *  微信sdk上传图片 识别身份证
 * @param {sdk 实例化参数} WaChatConfigData 
 */
export function WaChatORC (WaChatConfigData, that) {
  let u = navigator.userAgent
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    WaChatrequireConfig(WaChatConfigData)
  }
  wx.ready(function () {
    // 判断调用接口是否支持
    wx.checkJsApi({
      jsApiList: ["chooseImage", "uploadImage"],
      success: function (rps) {
        // 以键值对的形势返回， true可用接口， false不可用
        if (rps.checkResult.chooseImage == false || rps.checkResult.uploadImage == false) {
          Vm.changtoast('当前微信版本不支持该功能请升级', "error");
        }
      },
      fail: function (rps) {
        // Vm.changtoast('验证接口失败', 'error')
        // Vm.changtoast(rps.errMsg, 'error')
      }
    })
    // 拍照或从手机相册获取照片
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        syncUpload(localIds, that)
      },
      fail: function (rps) {
        // alert('选取图片失败')
        // alert(rps.errMsg)
      }
    })
  })
}
// 上传图片到微信服务器
let Medialds = ''
function syncUpload(localIds, that) {
  var localId = localIds.pop()
  wx.uploadImage({
    localId: localId.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
    isShowProgressTips: 1, // 默认为1，显示进度提示
    success: function (res) {
      //res.serverId 返回图片的服务器端ID
      Medialds = res.serverId
      // Medialds.push(res.serverId)
      if (localIds.length > 0) {
        syncUpload(localIds);
      } else {
        _GetIdCardOrc(Medialds, that);
      }
    }
  })
}

// 识别身份证
function _GetIdCardOrc (item, that) {
  GetMedia ({
    mediaId: item
  }).then (rps => {
    if (rps.data.success) {
      let id=rps.data.content.id
      if(!id){
        Vm.changtoast('上传身份证失败', "error");
        return
      }
      that.sfzFileId=id
      IdCardOrcById ({id}). then(rps => {
        if (rps.data.errcode ==0) {
          if (rps.data.type == 'Back') {
            Vm.changtoast('请上传身份证正面照片', "error");
          } else {
            that.Name = rps.data.name
            that.Sfzhm = rps.data.id
          }
        }else {
          Vm.changtoast(rps.data.errmsg, "error");
        }
      })
    } else {
      Vm.changtoast(rps.data.errmsg, "error");
    }
  })
}