<template>
  <div class="yrytxxx" v-if="show">
    <div class="head">
      <publicProgressBar :state="0" :tagData="tagData" />
    </div>
    <div class="middle">
      <div class="middle-title">填写幼儿信息</div>
      <div class="middle-input">
        <!-- <public-Input-Select v-model="xsData.yrlx" :val="xsData.yrlx" :name="'幼儿类型'" :placeholder="'选择幼儿类型'" :selectType="'select'" :column="rylxData"/> -->
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.xm"
          :val="xsData.xm"
          :name="'幼儿姓名'"
          :placeholder="'输入幼儿姓名'"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.zjlx"
          :val="xsData.zjlx"
          :name="'证件类型'"
          :placeholder="'选择幼儿证件类型'"
          :selectType="'select'"
          :column="zjlxData"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.sfzhm"
          :val="xsData.sfzhm"
          :name="'证件号'"
          :placeholder="'输入幼儿证件号'"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.mz"
          :val="xsData.mz"
          :name="'幼儿民族'"
          :placeholder="'选择幼儿所属民族'"
          :selectType="'select'"
          :column="mzData"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.sex"
          :val="xsData.sex"
          :name="'幼儿性别'"
          :placeholder="'选择幼儿性别'"
          :selectType="'select'"
          :column="sexData"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.birth"
          :val="xsData.birth"
          :name="'出生日期'"
          :placeholder="'选择幼儿出生年月'"
          :selectType="'date'"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.hjlx"
          :val="xsData.hjlx"
          :name="'户籍类型'"
          :placeholder="'选择幼儿户籍类型'"
          :selectType="'select'"
          :column="hjData"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.xjdz"
          :val="xsData.xjdz"
          :name="'现居住地'"
          :placeholder="'输入幼儿现居住地'"
          :selectType="'site'"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.hjdz"
          :val="xsData.xjdz"
          :name="'户籍地址'"
          :placeholder="'输入幼儿户籍地址'"
          :selectType="'site'"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.jzzh"
          :val="xsData.jzzh"
          :name="'接种证号'"
          :placeholder="'输入幼儿接种证号'"
        />
      </div>
    </div>
    <div class="base">
      <div class="base-title">上传资料照片</div>
      <div class="base-file">
        <div class="file-tab">
          <publicUploadPictures
            :readonly="isView"
            ref="upload0"
            @setStorage="storageHkb"
            :configData="WaChatConfigData"
            v-model="xsData.hkb"
            :title="'幼儿页与父母页或监护人页的户口簿原件照片'"
            :name="'（如果幼儿与父母不在同一户口簿，需提交出生证照片）'"
          />
        </div>
        <div class="file-tab">
          <publicUploadPictures
            :readonly="isView"
            ref="upload1"
            @setStorage="storageJkzm"
            :configData="WaChatConfigData"
            v-model="xsData.jkzm"
            :title="'幼儿健康手册或幼儿健康体检手册或医院开具的入学体 检证明（三个月内有效，上传其中一种即可）'"
            :name="''"
          />
        </div>
        <div class="file-tab">
          <publicUploadPictures
            :readonly="isView"
            ref="upload2"
            @setStorage="storageMyzm"
            :configData="WaChatConfigData"
            v-model="xsData.myzm"
            :title="'免疫证明（三个月内有效）'"
            :name="''"
          />
        </div>
      </div>
      <div class="base-but">
        <div class="public-long-but" @click="nextStep">下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
import publicProgressBar from '@/components/publicProgressBar/publicProgressBar'
import publicUploadPictures from '@/components/publicUploadPictures/publicUploadPictures'
import { MzOption, yeyCheck, YeyBmxx } from '@/api/publicApi'
import { GetWechatConfig } from '@/api/GetWechatConfig'
import {
  getYrbmData,
  setYrbmData,
  setImages,
  getImages,
  clearImages
} from '@/js/studentUtil'
export default {
  computed: {
    bmid() {
      return this.$route.params.bmid
    },
    isView() {
      //查看模式，不能修改
      return this.$route.query.m === 'v'
    }
  },
  data() {
    return {
      show: false,
      mzData: [],
      picturesData: [
        { id: 1, title: '', name: '', model: '' },
        { id: 2, title: '', model: '' },
        { id: 3, title: '', model: '' }
      ],
      sexData: ['男', '女'],
      rylxData: ['幼儿类型1', '幼儿类型2'],
      hjData: ['高明区内户籍', '高明区外户籍'],
      zjlxData: ['身份证', '港澳居民居住证', '护照'],
      selectType: 1,
      WaChatConfigData: {},
      xsData: {
        mz: '',
        yrlx: '',
        zjlx: '',
        sex: '',
        xm: '',
        birth: '',
        hjlx: '',
        hkb: '',
        jkzm: '',
        myzm: ''
      },
      tagData: ['入学报名', '资格审查', '入户排序', '录取确认', '学籍注册']
    }
  },
  methods: {
    storageHkb(item) {
      setImages('hkb', item)
    },
    storageJkzm(item) {
      setImages('jkzm', item)
    },
    storageMyzm(item) {
      setImages('myzm', item)
    },
    nextStep() {
      if (this.isView) {
        this.$router.push('/yryxzlx' + window.location.search)
        return
      }
      if (!this.xsData.hkb) {
        this.changtoast('请上传幼儿页与父母页或监护人页的户口簿原件照片')
        return
      }
      if (!this.xsData.jkzm) {
        this.changtoast(
          '请上传幼儿健康手册或幼儿健康体检手册或医院开具的入学体 检证明（三个月内有效，上传其中一种即可）'
        )
        return
      }
      if (!this.xsData.myzm) {
        this.changtoast('请上传免疫证明')
        return
      }
      yeyCheck(this.xsData).then(rps => {
        clearImages()
        if (rps.data.success) {
          setYrbmData(this.xsData)
          let bmidParam = this.bmid ? '/' + this.bmid : ''
          this.$router.push('/yryxzlx' + bmidParam)
        } else {
          if (rps.data.message === '每个身份证只能报一次名') {
            this.$MessageBox({ type: 'message' })
          } else {
            this.changtoast(rps.data.message)
          }
        }
      })
    },
    getMzOption() {
      MzOption().then(rps => {
        if (rps.data.success) {
          let data = rps.data.content.mzxx.split(';')
          this.mzData = data.filter(el => {
            return el !== ''
          })
        } else {
          this.changtoast(rps.data.message)
        }
      })
    },
    // 获取微信sdk 初始化参数
    _GetWechatConfig() {
      let url = window.location.href
      GetWechatConfig({
        url: url
      }).then(rps => {
        if (rps.data.success) {
          this.WaChatConfigData = rps.data.content
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    }
  },
  created() {
    this.getMzOption()
    let that = this
    if (this.bmid) {
      YeyBmxx(this.bmid, false).then(rps => {
        this.show = true
        if (rps.data.success) {
          this.xsData = rps.data.content
          this.xsData.bmid = this.bmid
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    } else if (this.$route.query.bmid) {
      YeyBmxx(this.$route.query.bmid, true).then(rps => {
        this.show = true
        if (rps.data.success) {
          this.xsData = rps.data.content
          // this.xsData.sfdbt=true
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    } else {
      this.show = true
      let data = getYrbmData()
      if (data) {
        this.xsData = data
      }
      if (this.$route.query.dbt) {
        this.xsData.sfdbt = true
      }
    }
    this._GetWechatConfig()
  },
  components: {
    publicProgressBar,
    publicUploadPictures
  }
}
</script>

<style lang='scss' scoped>
@import './style/yrytxxx.scss';
</style>