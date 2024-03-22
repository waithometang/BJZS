<template>
  <div>
    <div class="policy-select" @click="_popupVisible">
      <p>
        <span style="color:red">*</span>
        {{address ? address : '请选择户籍所在位置'}}
      </p>
      <i></i>
    </div>
    <van-popup v-model="popupVisible" position="bottom">
      <div class="TxMap">
        <iframe id="mapPage" width="100%" height="100%" frameborder="0" :src="this.src"></iframe>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { TMap } from "@/js/TMap";
import { TxGeocode } from "@/api/GetWechatConfig";
export default {
  data() {
    return {
      popupVisible: false,
      listData: "",
      address: "",
      src:
        "https://apis.map.qq.com/tools/locpicker?type=1&key=QOQBZ-HQ2EP-IC3DC-VLC2Z-QCUQT-IAFYS&referer=高明通&"
    };
  },
  computed: {
    WaChetLatitude() {
      return this.$store.state.WaChetLatitude;
    },
    WaChetLongitude() {
      return this.$store.state.WaChetLongitude;
    }
  },
  mounted() {
    this.src = `https://apis.map.qq.com/tools/locpicker?type=1&key=QOQBZ-HQ2EP-IC3DC-VLC2Z-QCUQT-IAFYS&referer=高明通&coord=${this.$store.state.WaChetLatitude},${this.$store.state.WaChetLongitude}`;
    window.addEventListener(
      "message",
      event => {
        var loc = event.data;
        if (loc && loc.module == "locationPicker") {
          //防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
          this.setTxMAP(loc);
        }
      },
      false
    );
  },
  methods: {
    _popupVisible() {
      this.popupVisible = true;
    },
    setTMap() {
      TMap("QOQBZ-HQ2EP-IC3DC-VLC2Z-QCUQT-IAFYS").then(qq => {
        var center = "";
        center = new qq.maps.LatLng(this.WaChetLatitude, this.WaChetLongitude);
        var map = new qq.maps.Map(document.getElementById("container"), {
          // 地图的中心地理坐标。
          center: center,
          zoom: 18,
          disableDoubleClickZoom: false, //设置是否可以双击放大
          zoomControl: false,
          mapTypeControl: false,
          logo: false,
          slider: false
        });
        // 覆盖物
        var marker = new qq.maps.Marker({
          position: center,
          map: map
        });
        var listener = qq.maps.event.addListener(map, "click", event => {
          this.$store.commit("SetWaChetLatitude", event.latLng.getLat());
          this.$store.commit("SetWaChetLongitude", event.latLng.getLng());
          this.setTMap();
          TxGeocode({
            lat: event.latLng.getLat(),
            lng: event.latLng.getLng()
          }).then(rps => {
            if (rps.data.success) {
              let data = JSON.parse(rps.data.content);
              this.listData = data.result.pois;
              this.address = data.result.formatted_addresses.recommend;
            }
          });
        });
      });
    },
    setTxMAP(item) {
      this.$store.commit("SetWaChetLatitude", item.latlng.lat);
      this.$store.commit("SetWaChetLongitude", item.latlng.lng);
      this.popupVisible=false
      this.address = item.poiname
      this.$emit("setTxMAP", item);
    }
  }
};
</script>

<style lang='scss' scoped>
.TxMap {
  position: relative;
  overflow: hidden;
  height: 1100px;
  width: 750px;
  .map {
    height: 1100px;
    width: 750px;
    background: #ffffff;
    .serch {
      height: 80px;
      border-bottom: 1px solid;
      border-color: #ffffff;
      padding: 20px 20px 20px 20px;
      background: #ffffff;
      div {
        height: 80px;
        display: flex;
        align-items: center;
        background: #f4f4f4;
        border-radius: 15px 15px 15px 15px;
        input {
          border-radius: 15px 15px 15px 15px;
          flex: 1;
          border: none;
          margin-right: 7px;
          background: #f4f4f4;
          padding-left: 20px;
          font-size: 30px;
        }
        .imagesss {
          flex: 0 0 auto;
          img {
            height: 45px;
            width: 45px;
            padding-left: 20px;
            padding-right: 20px;
          }
        }
      }
    }
    .map_list {
      height: 978px;
      width: 750px;
    }
  }
  .map_list {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ffffff;
    height: 400px;
    overflow-y: scroll;
    p {
      text-align: center;
    }
    p:active {
      background: #f4f4f4;
    }
  }
}
</style>
