<template>
  <div class="yryxzlx" v-if="xsData">
    <div class="head">
      <publicProgressBar v-if="!isView" :tagData="tagData" />
      <div v-else class="public-classify-tab">
        <div
          class="classify-tab"
          @click="changeTab(item)"
          :class="{ 'classify-tab-action': tabState === item.state }"
          v-for="(item, index) in listData"
          :key="index"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="middle">
      <!-- 优待生政策 -->
      <div v-if="selectState === 'Y'" class="selectName">
        <div class="middle-title">
          入学类型:
          <div class="middle-title-hint">{{ selectName }}({{ selectBz }})</div>
        </div>
      </div>
      <div class="policy-tab" v-if="selectState === 'Y'" @click="selectZcs">
        <div class="policy-title">请选择优待政策:</div>
        <div class="policy-select">
          <p>
            <span v-if="!selectZc.desc" style="color: red">*</span>
            {{ selectZc.desc ? selectZc.desc : '请选择优待政策' }}
          </p>
          <i></i>
        </div>
      </div>
    </div>
    <div class="middle">
      <!-- 户籍生（？？？） -->
      <div v-if="selectState != 'Y'" class="selectName">
        <div class="middle-title">
          入学类型:
          <div class="middle-title-hint">{{ selectName }}({{ selectBz }})</div>
        </div>
      </div>
      <div class="middle-title">
        填写家长信息:
        <div class="middle-title-hint middle-title-action">
          （请务必填写满足政策条件的家长或直系亲属信息）
        </div>
      </div>
      <div class="middle-input">
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.dylxr"
          :val="xsData.dylxr"
          :name="'家长（第一联系人）'"
          :placeholder="'输入家长（第一联系人）'"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.jzxm"
          :val="xsData.jzxm"
          :name="'家长姓名'"
          :placeholder="'输入姓名'"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.yyrgx"
          :val="xsData.yyrgx"
          :name="'与幼儿关系'"
          :placeholder="'选择关系'"
          :selectType="'select'"
          :column="gxData"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.jz_zjlx"
          :val="xsData.jz_zjlx"
          :name="'家长证件类型'"
          :placeholder="'选择证件类型'"
          :selectType="'select'"
          :column="zjlxData"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.jz_zjhm"
          :val="xsData.jz_zjhm"
          :name="'家长证件号'"
          :placeholder="'输入证件号'"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.lxdh"
          :val="xsData.lxdh"
          :name="'家长联系电话'"
          :placeholder="'输入联系电话'"
          :type="'number'"
        />

        <public-Input-Select
          :readonly="isView"
          v-model="xsData.dylxr_2"
          :val="xsData.dylxr_2"
          :name="'家长（第二联系人）'"
          :placeholder="'输入家长（第二联系人）'"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.jzxm_2"
          :val="xsData.jzxm_2"
          :name="'家长姓名'"
          :placeholder="'输入姓名'"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.yyrgx_2"
          :val="xsData.yyrgx_2"
          :name="'与幼儿关系'"
          :placeholder="'选择关系'"
          :selectType="'select'"
          :column="gxData"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.jz_zjlx_2"
          :val="xsData.jz_zjlx_2"
          :name="'家长证件类型'"
          :placeholder="'选择证件类型'"
          :selectType="'select'"
          :column="zjlxData"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.jz_zjhm_2"
          :val="xsData.jz_zjhm_2"
          :name="'家长证件号'"
          :placeholder="'输入证件号'"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.lxdh_2"
          :val="xsData.lxdh_2"
          :name="'家长联系电话'"
          :placeholder="'输入联系电话'"
          :type="'number'"
        />
        <!-- <public-Input-Select
          :readonly="isView"
          v-model="fmData.zzxx_id"
          v-if="selectState === 'K' && yeyxx.length > 0"
          :val="xsData.zzxx_id"
          :name="'选择就读学校'"
          :placeholder="'请选择就读学校'"
          :selectType="'linkage'"
          :linkage="yeyxx"
        /> -->
      </div>
    </div>
    <div class="middle">
      <!-- <div class="info-list" v-if="selectState === 'F'">
        <div class="info-title">填写房产信息</div>
        <public-Input-Select
          v-model="fmData.fc_fcss"
          :val="fmData.fc_fcss"
          :name="'不动产权利人'"
          :placeholder="'输入房产所属人姓名'"
        />
        <public-Input-Select
          v-model="fmData.fc_sfzh"
          :val="fmData.fc_sfzh"
          :name="'权利人身份证号'"
          :placeholder="'输入房产所属人身份证号'"
        />
        <public-Input-Select
          v-model="fmData.fc_fczh"
          :val="fmData.fc_fczh"
          :name="'不动产权证号或购房合同号'"
          :placeholder="'输入不动产权证号或购房合同号'"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="fmData.fc_fczl"
          :val="fmData.fc_fczl"
          :name="'不动产坐落'"
          :placeholder="'不动产坐落(房产证或者预售合同上的坐落)'"
          :selectType="'select'"
          :column="sszjData"
        />
      </div> -->

      <!-- <div class="info-list">
        <public-Input-Select
          :readonly="isView"
          v-if="selectState === 'Z' && yeyxx.length > 0"
          v-model="fmData.zzxx_id"
          :name="'在职幼儿园'"
          :placeholder="'选择就读的在职幼儿园'"
          :selectType="'linkage'"
          :linkage="yeyxx"
        />
        <div
          class="select-tag"
          v-if="selectState === 'Y' && selectZc.id === 17"
        >
          <div class="select-title">
            <span style="color: red">*</span>请选择就读学校:
          </div>
          <div class="select-input" @click="selectxx">
            <input
              type="text"
              v-model="cjxx"
              readonly="readonly"
              placeholder="选择沧江教育集团所属学校名称"
            />
            <i></i>
          </div>
        </div>
      </div> -->
      <div class="middle-title">上传资料照片:</div>
      <div class="info-list">
        <div v-for="(item, index) in getlistData(selectLxs)" :key="index">
          <publicUploadPictures
            v-for="(val, key) in item.zls"
            :ref="'uploadpic' + val.id"
            :key="key"
            :title="val.desc"
            :loaclData="!isView && !bmid"
            :state="val.id"
            :isNeed="val.sfbx === 1"
          />
        </div>
      </div>
    </div>
    <div class="base" v-if="!isView">
      <div class="base-tab">
        <div class="public-long-but" @click="beforeStep">上一步</div>
      </div>
      <div class="base-tab" v-if="isView">
        <div class="public-long-but" @click="goback">返回</div>
      </div>
      <div class="base-tab" v-else>
        <div class="public-long-but" @click="nextStep">下一步</div>
      </div>
    </div>
    <div class="base" v-else-if="!jg">
      <div class="base-tab width">
        <div class="public-long-but" @click="compile">返回编辑页</div>
      </div>
    </div>
  </div>
</template>

<script>
import publicProgressBar from '@/components/publicProgressBar/publicProgressBar'
import publicUploadPictures from '@/components/publicUploadPictures/publicUploadPictures'
import { GetWechatConfig } from '@/api/GetWechatConfig'
import {
  sessionInfo,
  getYrbmData,
  clearYrbmData,
  getZjData,
  setYrbmData
} from '@/js/studentUtil.js'
import { CheckForm } from '@/js/checkForm.js'
import { yeyBm, yeyxx, YeyBmxxRxzl, YeyBmxxYbzl } from '@/api/publicApi'

let vaildRule = {
  F: [
    { key: 'fc_fcss', tips: '不动产权利人' },
    { key: 'fc_sfzh', tips: '权利人身份证号' },
    { key: 'fc_fczh', tips: '不动产权证号或购房合同号' },
    { key: 'fc_fczl', tips: '不动产坐落' }
  ]
}
export default {
  data () {
    return {
      xsData: {
        dylxr: '',
        jzxm: '',
        jz_zjhm: '',
        jz_zjlx: '身份证',
        lxdh: '',
        yyrgx: '',
        dylxr_2: '',
        jzxm_2: '',
        jz_zjhm_2: '',
        jz_zjlx_2: '身份证',
        lxdh_2: '',
        yyrgx_2: ''
      },
      WaChatConfigData: '',
      rxlbs: [],
      tagData: ['入学报名', '资格审查', '入户排序', '录取确认', '学籍注册'],
      cjxxData: [
        { text: '佛山市高明区机关幼儿园', id: 1 },
        { text: '佛山市高明区蓓蕾幼儿园（机关幼儿园一分园）', id: 2 }
      ],
      sszjData: ['荷城街道', '杨和镇', '明城镇', '更合镇'],
      hjData: [
        '高明区荷城街道户籍',
        '高明区杨和镇户籍',
        '高明区明城镇户籍',
        '高明区更合镇户籍',
        '高明区外户籍'
      ],
      zjlxData: ['身份证', '港澳居民居住证', '护照'],
      gxData: ['父亲', '母亲', '爷爷', '奶奶', '外公', '外婆', '监护人'],
      yeyxx: [],
      cjxx: '',
      fmData: {
        jzxm: '',
        yyrgx: '',
        jz_zjlx: '',
        jz_zjhm: '',
        lxdh: '',
        cjxx: '',
        zls: []
      },
      listData: [
        { name: '基本信息', state: 1 },
        { name: '证明材料', state: 2 },
        { name: '进度结果', state: 3 }
      ],
      tabState: 2
    }
  },
  components: {
    publicProgressBar,
    publicUploadPictures
  },
  computed: {
    bmid () {
      return this.$route.params.bmid
    },
    isView () {
      //只看模式，不能修改
      return this.$route.query.m === 'v'
    },
    isEdit () {
      //查看模式，待审查前
      return this.$route.query.m === 'e'
    },
    selectState () {
      return sessionInfo.fetch('selectState')
    },
    selectName () {
      return sessionInfo.fetch('selectName')
    },
    selectBz () {
      return sessionInfo.fetch('selectBz')
    },
    selectLxs () {
      return sessionInfo.fetch('selectLxs')
    },
    selectZc () {
      return sessionInfo.fetch('selectZc') || ''
    },
    jg () {
      return this.$route.query.jg == 'true'
    }
  },
  created () {
    let data = sessionInfo.fetch('fmData')
    if (data) {
      this.fmData = data
    }
    if (this.isView) {
      this.getBmdata()
    } else if (this.bmid) {
      this.xsData = getYrbmData(this.bmid) || {}
      if (this.isEdit) {
        this.getOldData()
      }
    } else {
      this.xsData = getYrbmData() || {}
    }
    this.getYryxx()
  },
  methods: {
    getSelectedLx () {
      let lxs = sessionInfo.fetch('selectLxs')
      if (lxs.length === 1) {
        return lxs[0].id
      }
      return null
    },
    getOldData () {
      // let lxid = this.getSelectedLx();
      // if (!lxid) {
      //   return;
      // }
      YeyBmxxYbzl({ bmid: this.bmid, lxid: null }).then(rps => {
        if (rps.data.success) {
          if (rps.data.content) {
            let _content = rps.data.content
            this.xsData.jzxm = _content.jzxm
            this.xsData.jz_zjhm = _content.jz_zjhm
            this.xsData.jz_zjlx = _content.jz_zjlx
            this.xsData.lxdh = _content.lxdh
            this.xsData.yyrgx = _content.yyrgx
            let zls = rps.data.content.zls
            zls.forEach(el => {
              let _ref = this.$refs['uploadpic' + el.zlid]
              if (_ref && _ref.length > 0) {
                _ref[0].setPictures(el.idurls, el.main_id)
              }
            })
          }
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    changeTab (item) {
      if (item.state == 2) {
        this.$router.push('/yrysczl' + window.location.search)
      } else if (item.state == 3) {
        this.$router.push('/yryzgcxxq' + window.location.search)
      } else if (item.state == 1) {
        this.$router.push('/yrytxxx' + window.location.search)
      }
      // this.$nextTick(()=>{this.setData()})
    },
    getBmdata () {
      YeyBmxxRxzl(this.$route.query.bmid).then(rps => {
        if (rps.data.success) {
          let data = rps.data.content
          let lxs = sessionInfo.fetch('selectLxs')
          for (let index = 0; index < lxs.length; index++) {
            const element = lxs[index]
            for (let key = 0; key < element.zls.length; key++) {
              const val = element.zls[key]
              for (let i = 0; i < data.zls.length; i++) {
                const vm = data.zls[i]
                if (vm.zlid === val.id) {
                  let dom = this.$refs['uploadpic' + val.id][0]
                  dom.setPictures(vm.idurls, vm.main_id)
                }
              }
            }
          }
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    getTitle () {
      if (this.selectState === 'H') return '填写父母或监护人信息'
      if (this.selectState === 'Z') return '填写幼儿园在职直系亲属信息'
      if (this.selectState === 'K') return '填写抗疫父母信息'
      if (this.selectState === 'Y' || 'F') {
        return '填写父母信息'
      }
    },
    getName () {
      if (this.selectState === 'Z')
        return '直系亲属（父母、爷爷奶奶、外公外婆或监护人）'
      if (this.selectState === 'K' || 'Y' || 'F')
        return '满足条件的父或母方信息必填'
    },
    getlistData (item) {
      if (this.selectState === 'Y') {
        let data = item.filter(el => {
          return el.id === this.selectZc.id
        })
        return data
      } else {
        return item
      }
    },
    getYryxx () {
      yeyxx().then(rps => {
        if (rps.data.success) {
          this.yeyxx = getZjData(rps.data.content)
        } else {
          this.changtoast(rps.data.message)
        }
      })
    },
    goback () {
      this.$router.push('/yrybm')
    },
    selectZcs () {
      if (this.isEdit) {
        return
      }
      if (!this.isView) {
        let bmidParam = this.bmid ? '/' + this.bmid : ''
        this.$router.push('/yryzc' + bmidParam)
      }
    },
    selectxx () {
      this.$Selector({ columns: this.cjxxData, type: 'select' }).then(el => {
        this.fmData.zzxx_id = el.id
        this.cjxx = el.text
      })
    },
    _GetWechatConfig () {
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
    },
    beforeStep () {
      this.$router.go(-1)
      sessionInfo.save('fmData', this.fmData)
      setYrbmData(this.xsData)
    },
    checkExtraData () {
      let _rules = vaildRule[this.selectState]
      if (!_rules) return true
      let _r
      for (let index = 0; index < _rules.length; index++) {
        _r = _rules[index]
        if (!this.fmData[_r.key]) {
          this.changtoast('请填写' + _r.tips)
          return false
        }
      }
      return true
    },
    nextStep () {
      if (
        !this.fmData.zzxx_id &&
        this.selectState === 'Y' &&
        this.selectZc &&
        this.selectZc.id === 17
      ) {
        this.changtoast('请选择就读学校')
        return
      }
      if (!this.fmData.zzxx_id && this.selectState === 'Z') {
        this.changtoast('请选择在职幼儿园')
        return
      }
      if (!this.fmData.zzxx_id && this.selectState === 'K') {
        this.changtoast('请选择就读学校')
        return
      }
      if (this.selectState === 'Y' && !this.selectZc.desc) {
        this.changtoast('请选择优待政策')
        return
      }
      if (!this.xsData.jzxm) {
        this.changtoast('请填写家长姓名')
        return
      }
      if (!this.xsData.yyrgx) {
        this.changtoast('请选择与幼儿关系')
        return
      }
      if (!this.xsData.jz_zjlx) {
        this.changtoast('请选择家长证件类型')
        return
      }
      if (!this.xsData.jz_zjhm) {
        this.changtoast('请填写家长证件号码')
        return
      }
      if (!this.xsData.lxdh) {
        this.changtoast('请填写家长联系电话')
        return
      }
      if (!this.checkExtraData()) {
        return
      }
      if (this.xsData.jz_zjlx === '身份证') {
        const IsForm = CheckForm([
          {
            data: this.xsData.jz_zjhm,
            name: 'ckad',
            msg: '请输入正确的身份证号码'
          }
        ])
        if (IsForm) {
          return
        }
      }
      if (this.selectState === 'F') {
        const IsForm = CheckForm([
          {
            data: this.fmData.fc_sfzh,
            name: 'ckad',
            msg: '请输入正确的权利人身份证号码'
          }
        ])
        if (IsForm) {
          return
        }
      }
      const IsForm = CheckForm([
        { data: this.xsData.lxdh, name: 'phone', msg: '请输入正确的手机号码' }
      ])
      if (IsForm) {
        return
      }
      let selelctLxs = this.getlistData(this.selectLxs)[0]
      let selelctzls = selelctLxs.zls
      this.fmData.zls = []
      this.fmData.rxlx = selelctLxs.id
      let picDoms = []
      for (let index = 0; index < selelctzls.length; index++) {
        const el = selelctzls[index]
        let dom = this.$refs['uploadpic' + el.id][0]
        let data = dom.getMainId()
        if (data.number === 0 || !data.mainId) {
          if (el.sfbx === 1) {
            this.changtoast('请上传' + el.desc)
            return
          }
        } else {
          this.fmData.zls.push({ id: el.id, mainid: data.mainId })
          picDoms.push(dom)
        }
      }

      let data = Object.assign({}, this.fmData, this.xsData)
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '温馨提示:是否确认现在提交报名？点击确认提交前可在19日上午9:00时网上报名截止前修改报名信息，一旦确认提交不得修改报名信息！'
        })
        .then(() => {
          this.loading()
          yeyBm(data).then(rps => {
            this.closeLoading()
            if (rps.data.success) {
              this.changtoast('提交成功', 'sccuess')
              clearYrbmData()
              picDoms.forEach(picdom => {
                picdom.removeStorageImage()
              })
              this.$router.push('/yryzgcx/' + rps.data.content.bmid)
            } else {
              this.changtoast(rps.data.message, 'error')
            }
          })
        })
        .catch(() => {
          return
        })
    },
    compile () {
      let bmids = this.$route.query.bmid
      this.$router.push('/yrytxxx?bmid=' + bmids)
    }
  }
}
</script>

<style lang='scss' scoped>
@import './style/yrysczl.scss';
</style>