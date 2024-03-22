<template>
  <div class="publicSelectSite">
    <van-popup v-model="showSite" position="bottom">
      <div class="select-site">
        <div class="site-head-but">
          <div class="site-head-but-name" @click="selectSite">取消</div>
          <div class="site-head-but-name" @click="clickConfirm">确定</div>
        </div>
        <div class="public-input-tab" @click="setAffirmSite">
          <div class="input-tab-name">所在地区:</div>
          <div class="input-tab-content">
            <input
              type="text"
              placeholder="省市区"
              readonly="readonly"
              v-model="siteValue"
            />
          </div>
        </div>
        <div class="public-input-tab">
          <div class="input-tab-name">详细地址:</div>
          <div class="input-tab-content">
            <input type="text" v-model="xxdz" placeholder="街道、楼牌号等" />
          </div>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="affirmSite" position="bottom">
      <van-area
        :area-list="areaList"
        :value="defAera"
        @confirm="setSiteValue"
        @cancel="setAffirmSite"
      />
    </van-popup>
  </div>
</template>

<script>
import area from '@/js/area'
import store from '@/store'

export default {
  data() {
    return {
      showSite: false,
      affirmSite: false,
      siteValue: '',
      xxdz: '',
      defAera: '440606',
      areaList: '',
      promiseStatus: ''
    }
  },
  methods: {
    selectSite() {
      this.showSite = false
    },
    clickConfirm() {
      if (!this.siteValue) {
        this.changtoast('请选择所属地区')
        return
      }
      if (!this.xxdz) {
        this.changtoast('请输入详细地址')
        return
      }
      this.showSite = false
      this.promiseStatus.resolve(`${this.siteValue}${this.xxdz}`)
      this.promiseStatus && this.promiseStatus.resolve()
    },
    setAffirmSite() {
      this.affirmSite = !this.affirmSite
    },
    setSiteValue(item) {
      this.affirmSite = false
      this.siteValue = ''
      item.forEach(val => {
        this.siteValue = this.siteValue + val.name
      })
    },
    install() {
      //inarea-区内  incity-市内其他区 outcity-其它市户籍
      let areatype = store.state.publicSelectAreaType
      switch (areatype) {
        case 'inarea':
          this.defAera = '440608'
          this.areaList = {
            province_list: { 440000: '广东省' },
            city_list: { 440600: '佛山市' },
            county_list: { 440608: '高明区' }
          }
          break
        case 'incity':
          this.defAera = '440605'
          this.areaList = {
            province_list: { 440000: '广东省' },
            city_list: { 440600: '佛山市' },
            county_list: {
              440604: '禅城区',
              440605: '南海区',
              440606: '顺德区',
              440607: '三水区'
            }
          }
          break
        case 'outcity':
          this.defAera = '440106'
          let citylist = Object.assign({}, area.city_list)
          delete citylist['440600']
          this.areaList = {
            province_list: area.province_list,
            city_list: citylist,
            county_list: area.county_list
          }
          break
        default:
          this.defAera = '440606'
          this.areaList = area
          break
      }
      this.showSite = true
      return new Promise((resolve, reject) => {
        this.promiseStatus = { resolve, reject }
      })
    }
  }
}
</script>
