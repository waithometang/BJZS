import wx from "weixin-js-sdk";
import { WaChatrequireConfig } from "./WaChatrequireConfig";
import { TxGeocode } from "@/api/GetWechatConfig";
/**
 * 微信sdk获取经纬度
 * url: 需要config验证签名的路径
 * @export
 */
export function WeChatGetLocation(WaChatConfigData, that, initAddress,lat,lng) {
  let u = navigator.userAgent;
  if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
    console.log(window.location.href, "安卓重新实例");
    WaChatrequireConfig(WaChatConfigData);
  }
  wx.ready(function() {
    // 判断调用接口是否支持
    wx.checkJsApi({
      jsApiList: ["getLocation", "chooseImage", "uploadImage"],
      success: function(rps) {
        // 以键值对的形势返回， true可用接口， false不可用
        if (
          rps.checkResult.getLocation == false ||
          rps.checkResult.chooseImage == false ||
          rps.checkResult.uploadImage == false
        ) {
          console.log("不支持该接口");
        }
      },
      fail: function(rps) {
        // alert('验证接口失败')
        // alert(rps.errMsg)
      }
    });
    wx.getLocation({
      type: "gcj02", // 坐标，gcj02 返回可用于wx.openLocation的坐标,
      success: res => {
        let latitude=res.latitude;
        let longitude= res.longitude;
        if(lat&&lng){
          latitude = lat
          longitude = lng
        }

        that.$store.commit("SetWaChetLatitude", latitude);
        that.$store.commit("SetWaChetLongitude", longitude);
        if (initAddress) {
          TxGeocode({
            lat: latitude,
            lng: longitude
          }).then(rps => {
            if (rps.data.success) {
              let Data = JSON.parse(rps.data.content);
              if (Data.status == 0) {
                let wxReturnLocalist ={
                  module:'',
                  latlng:'',
                  poiaddress:'',
                  poiname:'',
                  cityname:''
                };
                wxReturnLocalist.module='locationPicker'
                wxReturnLocalist.latlng=Data.result.location
                wxReturnLocalist.poiaddress=Data.result.formatted_addresses.recommend
                wxReturnLocalist.poiname=Data.result.address
                wxReturnLocalist.cityname=Data.result.address_component.city
                that.wxReturnLocalist=wxReturnLocalist
                that.add_listData = Data.result.pois;
                that.address = Data.result.formatted_addresses.recommend;
              } else {
                that.changtoast("定位失败" + Data.message, "error");
                that.address = "定位失败,请重新定位";
                that.siteError = true;
              }
              that.$store.commit("SET_TxGeocodeData", Data);
            } else {
              that.changtoast(rps.data.message, "error");
            }
          });
        }
      },
      fail: () => {
        console.log("getLocation failed");
      }
    });
  });
}
