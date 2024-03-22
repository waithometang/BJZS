<template>
  <div class="sczl">
    <div class="head">
      <publicProgressBar :tagData="tagData" />
    </div>
    <div class="middle">
      <div class="middle-title">入学类型</div>
      <div class="middle-type">{{ selectName }}：{{ selectBz }}</div>
      <div class="middle-title">填写家长信息</div>
      <div class="middle-action">
        （请务必填写满足政策条件的家长或直系亲属信息）
      </div>
      <div class="middle-input">
        <div class="middle-type">家长（第一联系人）：</div>
        <public-Input-Select
          v-model="jzData.jz1_xm"
          :val="jzData.jz1_xm"
          :name="'家长姓名'"
          :placeholder="'输入姓名'"
        />
        <public-Input-Select
          v-model="jzData.jz1_gx"
          :val="jzData.jz1_gx"
          :name="'与幼儿关系'"
          :placeholder="'选择幼儿关系'"
          :selectType="'select'"
          :column="yrgxData"
        />
        <public-Input-Select
          v-model="jzData.jz1_zjlx"
          :val="jzData.jz1_zjlx"
          :name="'家长证件类型'"
          :placeholder="'选择证件类型'"
          :selectType="'select'"
          :column="zjlxData"
        />
        <public-Input-Select
          v-model="jzData.jz1_zjhm"
          :val="jzData.jz1_zjhm"
          :name="'家长证件号'"
          :placeholder="'输入证件号'"
        />
        <public-Input-Select
          v-model="jzData.jz1_lxdh"
          :val="jzData.jz1_lxdh"
          :name="'家长联系电话'"
          :placeholder="'请输入当前报名手机号码'"
          :type="'number'"
        />
        <div class="middle-type">家长（第二联系人）：</div>
        <public-Input-Select
          v-model="jzData.jz2_xm"
          :val="jzData.jz2_xm"
          :name="'家长姓名'"
          :placeholder="'输入姓名'"
        />
        <public-Input-Select
          v-model="jzData.jz2_gx"
          :val="jzData.jz2_gx"
          :name="'与幼儿关系'"
          :placeholder="'选择幼儿关系'"
          :selectType="'select'"
          :column="yrgxData"
        />
        <public-Input-Select
          v-model="jzData.jz2_zjlx"
          :val="jzData.jz2_zjlx"
          :name="'家长证件类型'"
          :placeholder="'选择证件类型'"
          :selectType="'select'"
          :column="zjlxData"
        />
        <public-Input-Select
          v-model="jzData.jz2_zjhm"
          :val="jzData.jz2_zjhm"
          :name="'家长证件号'"
          :placeholder="'输入证件号'"
        />
        <public-Input-Select
          v-model="jzData.jz2_lxdh"
          :val="jzData.jz2_lxdh"
          :name="'家长联系电话'"
          :placeholder="'输入联系电话'"
          :type="'number'"
        />
      </div>
    </div>
    <div class="base">
      <div class="base-tab">
        <div class="public-long-but" @click="beforeStep">上一页</div>
      </div>
      <div class="base-tab">
        <div class="public-long-but" @click="nextStep">下一页</div>
      </div>
    </div>
  </div>
</template>

<script>
import publicProgressBar from '@/components/publicProgressBar/publicProgressBar'
import publicUploadPictures from '@/components/publicUploadPictures/publicUploadPictures'
import { CheckForm } from '@/js/checkForm.js'
import {
  getYrbmData,
  sessionInfo,
  setYrjzData,
  getYrjzData
} from '@/js/studentUtil'
import { YeyYbmzl } from '@/api/publicApi'

let validRule = {
  jzxx: [
    { key: 'jz1_xm', tips: '（第一联系人）姓名' },
    { key: 'jz1_gx', tips: '（第一联系人）与幼儿关系' },
    { key: 'jz1_zjhm', tips: '（第一联系人）证件号' },
    { key: 'jz1_lxdh', tips: '（第一联系人）联系电话' },
    { key: 'jz2_xm', tips: '（第二联系人）姓名' },
    { key: 'jz2_gx', tips: '（第二联系人）与幼儿关系' },
    { key: 'jz2_zjhm', tips: '（第二联系人）证件号' },
    { key: 'jz2_lxdh', tips: '（第二联系人）联系电话' }
  ]
}

export default {
  name: '',
  components: {
    publicProgressBar,
    publicUploadPictures
  },
  props: {},
  data () {
    return {
      jzData: {},
      tagData: ['入学报名', '资格审查', '入户排序', '录取确认', '学籍注册'],
      zjlxData: ['身份证', '港澳居民居住证', '护照'],
      yrgxData: ['父亲', '母亲', '爷爷', '奶奶', '外公', '外婆', '监护人']
      // fmData: {
      //   zls: []
      // }
    }
  },
  computed: {
    selectState () {
      return sessionInfo.fetch('selectState')
    },
    selectName () {
      return sessionInfo.fetch('selectName')
    },
    selectBz () {
      return sessionInfo.fetch('selectBz').replace(/[<br/>]/g, '')
    },
    bmid () {
      return this.$route.query.bmid
    }
    // selectLxs() {
    //   return sessionInfo.fetch('selectLxs')
    // }
  },
  watch: {},
  created () {
    if (this.bmid) {
      this.loading()
      this.$post('ybm/api/YeyBmxxYbzl', {
        bmid: this.bmid
      }).then(rps => {
        this.closeLoading()
        if (rps.data.success) {
          this.jzData = rps.data.content
        } else {
          this.changtoast(rps.data.message)
        }
      })
    } else {
      this.jzData = getYrjzData(this.bmid) || {
        jz1_zjlx: '身份证',
        jz2_zjlx: '身份证'
      }
      // this.fmData = sessionInfo.fetch('zlData') || {
      //   zls: []
      // }
    }
  },
  mounted () { },
  methods: {
    // 上一步
    beforeStep () {
      setYrjzData(this.jzData)
      this.$router.go(-1)
    },
    checkExtraData (item) {
      let _rules = validRule[item]
      if (!_rules) return true
      let _r
      for (let index = 0; index < _rules.length; index++) {
        _r = _rules[index]
        if (!this.jzData[_r.key]) {
          this.changtoast('请填写' + _r.tips)
          return false
        }
      }
      return true
    },
    // 去重
    isRepeat (arr) {
      var hash = {}
      for (var i in arr) {
        if (arr[i]) {
          if (hash[arr[i]]) {
            return true
          }
          hash[arr[i]] = true
        }
      }
      return false
    },
    // 下一步
    nextStep () {
      let arr = [
        this.jzData.jz1_gx,
        this.jzData.jz2_gx
      ]
      if (!this.checkExtraData('jzxx')) {
        return
      }
      if (this.jzData.jz1_zjlx == '身份证') {
        const IsForm = CheckForm([
          {
            data: this.jzData.jz1_zjhm,
            name: 'ckad',
            msg: '请输入正确的身份证号码（第一联系人）'
          }
        ])
        if (IsForm) {
          return
        }
      }
      if (this.jzData.jz2_zjlx == '身份证') {
        const IsForm = CheckForm([
          {
            data: this.jzData.jz2_zjhm,
            name: 'ckad',
            msg: '请输入正确的身份证号码（第二联系人）'
          }
        ])
        if (IsForm) {
          return
        }
      }
      let phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/
      if (!phoneReg.test(this.jzData.jz1_lxdh)) {
        this.changtoast('请输入正确的手机号码（第一联系人）')
        return
      }
      if (!phoneReg.test(this.jzData.jz2_lxdh)) {
        this.changtoast('请输入正确的手机号码（第二联系人）')
        return
      }
      // 不能选重复的关系
      if (this.isRepeat(arr)) {
        this.changtoast('幼儿关系不能选择同一个身份', 'error')
        return
      }
      if (this.bmid) {
        this.jzData.bmid = this.bmid
      }
      setYrjzData(this.jzData)
      this.$router.push('/yryrxbm' + window.location.search)
      // this.$router.push('/yrysctp' + window.location.search)
    }
  }
}
</script>

<style scoped lang="scss">
@import './style/yrysczl.scss';
</style>
