<template>
  <div class="yryxzlx">
    <div class="head">
      <publicProgressBar :state="0" :tagData="tagData" />
    </div>
    <div class="middle">
      <div class="middle-title">请选择入学类型:</div>
      <div class="type-list">
        <div
          class="list-tab"
          :class="{ 'list-tab-action': selectIndex === rxlb.dh }"
          v-for="(rxlb, index) in rxlbs"
          :key="index"
          @click="select(rxlb)"
        >
          {{ rxlb.desc }}<span class="desc">（{{ rxlb.bz }}）</span>
        </div>
      </div>
      <div class="info-list" v-if="selectIndex === 'F'">
        <div class="info-title">填写房产信息</div>
        <public-Input-Select
          v-model="fmData.fc_fcss"
          :name="'房产所属'"
          :placeholder="'输入房产所属人姓名'"
        />
        <public-Input-Select
          v-model="fmData.fc_sfzh"
          :name="'身份证号'"
          :placeholder="'输入房产所属人身份证号'"
        />
        <public-Input-Select
          v-model="fmData.fc_fczh"
          :name="'不动产权证号或购房合同号'"
          :placeholder="'输入不动产权证号或购房合同号'"
        />
        <public-Input-Select
          v-if="selectIndex === 'F'"
          :readonly="isView"
          v-model="fmData.sszj"
          :name="'所在镇街'"
          :placeholder="'输入房产所在镇街选项'"
          :selectType="'select'"
          :column="sszjData"
        />
        <!-- fmData.fc_fczm_id -->
        <publicUploadPictures
          ref="upload0"
          @setStorage="storageFczm"
          v-model="fmData.fc_fczm_id"
          title="上传不动产权证（房产证）或不动产证信息查询结果证明图片片"
        />
      </div>
      <div class="policy-tab" v-if="selectIndex === 'Y'" @click="setZc">
        <div class="policy-title">请选择优待政策:</div>
        <div class="policy-select">
          {{
            $store.state.selectzc.desc
              ? $store.state.selectzc.desc
              : '请选择优待政策'
          }}<i></i>
        </div>
      </div>
      <div class="info-list">
        <div class="info-title">{{ getTitle() }}</div>
        <div class="info-name" v-if="getName()">{{ getName() }}</div>
        <public-Input-Select
          :readonly="isView"
          v-model="fmData.jzxm"
          :name="'姓 名'"
          :placeholder="'输入姓名'"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="fmData.yyrgx"
          :name="'与幼儿关系'"
          :placeholder="'选择关系'"
          :selectType="'select'"
          :column="gxData"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="fmData.jz_zjlx"
          :name="'证件类型'"
          :placeholder="'选择证件类型'"
          :selectType="'select'"
          :column="zjlxData"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="fmData.jz_zjhm"
          :name="'证件号'"
          :placeholder="'输入证件号'"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="fmData.lxdh"
          :name="'联系电话'"
          :placeholder="'输入联系电话'"
          :type="'number'"
        />
        <public-Input-Select
          :readonly="isView"
          v-if="selectIndex === 'Z'"
          v-model="fmData.zzxx_id"
          :name="'在职幼儿园'"
          :placeholder="'选择在职的幼儿园'"
          :selectType="'linkage'"
          :linkage="yeyxx"
        />
        <div
          class="select-tag"
          v-if="selectIndex === 'Y' && $store.state.selectzc.id === 17"
        >
          <div class="select-title">在职沧江教育集团所属学校:</div>
          <div class="select-input" @click="selectxx">
            <input
              type="text"
              v-model="fmData.cjxx"
              readonly="readonly"
              placeholder="选择沧江教育集团所属学校名称"
            /><i></i>
          </div>
        </div>
        <!-- fmData.fc_fmzm_id -->
        <publicUploadPictures
          ref="upload1"
          @setStorage="storageFmzm"
          :readonly="isView"
          v-model="fmData.fc_fmzm_id"
          v-if="selectIndex === 'F'"
          title="上传父母与幼儿关系的证明材料照片"
        />
        <!-- fmData.zmcl_mainid -->
        <publicUploadPictures
          ref="upload2"
          @setStorage="storageZcml"
          :readonly="isView"
          v-model="fmData.zmcl_mainid"
          v-if="selectIndex === 'Y'"
          :title="
            $store.state.selectzc.id === 17
              ? '上传职工在职证明'
              : '上传优待政策证明材料照片'
          "
        />
      </div>
    </div>
    <div class="base" v-if="isView">
      <div class="base-tab base-tab-action">
        <div class="public-long-but" @click="goback">返回</div>
      </div>
    </div>
    <div class="base" v-else>
      <div class="base-tab">
        <div class="public-long-but" @click="beforeStep">上一步</div>
      </div>
      <div class="base-tab">
        <div class="public-long-but" @click="nextStep">下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
import publicProgressBar from '@/components/publicProgressBar/publicProgressBar'
import publicUploadPictures from '@/components/publicUploadPictures/publicUploadPictures'
import {
  setYrbmData,
  getYrbmData,
  getZjData,
  clearYrbmData,
  setImages,
  getImages,
  clearImages
} from '@/js/studentUtil.js'
import { RxlxInfo, yeyBm, yeyxx, YeyBmxxRxzl } from '@/api/publicApi'

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
      xsData: '',
      selectIndex: '',
      rxlbs: [],
      tagData: ['入学报名', '资格审查', '入户排序', '录取确认', '学籍注册'],
      zjlxData: ['身份证', '港澳居民居住证'],
      gxData: ['父亲', '母亲', '爷爷', '奶奶', '外公', '外婆', '监护人'],
      cjxxData: [
        '佛山市高明区机关幼儿园',
        '佛山市高明区蓓蕾幼儿园（机关幼儿园一分园）'
      ],
      sszjData: ['荷城街道', '杨和镇', '明城镇', '更合镇'],
      yeyxx: [],
      fmData: {
        jzxm: '',
        yyrgx: '',
        jz_zjlx: '',
        jz_zjhm: '',
        lxdh: '',
        cjxx: ''
      }
    }
  },
  mounted() {
    this.$nextTick(el => {
      this.getStorage()
    })
  },
  methods: {
    storageFczm(item) {
      setImages('fczm', item)
    },
    storageFmzm(item) {
      setImages('fmzm', item)
    },
    storageZcml(item) {
      setImages('zcml', item)
    },
    getStorage() {
      let fczmData = getImages('fczm')
      let fmzmData = getImages('fmzm')
      let zcmlData = getImages('zcml')
      if (fczmData) {
        this.$refs['upload0'].setPictures(fczmData.urlData, fczmData.mainId)
        this.fmData.fc_fczm_id = fczmData.mainId
      }
      if (fmzmData) {
        this.$refs['upload1'].setPictures(fmzmData.urlData, fmzmData.mainId)
        this.fmData.fc_fmzm_id = fmzmData.mainId
      }
      if (zcmlData) {
        this.$refs['upload2'].setPictures(zcmlData.urlData, zcmlData.mainId)
        this.fmData.zmcl_mainid = zcmlData.mainId
      }
    },
    select(i) {
      if (this.isView) {
        return
      }
      this.fmData.cjxx = ''
      this.selectIndex = i.dh
      this.$store.commit('setYryzc', i.lxs)
      if (i.lxs.length === 1) {
        this.fmData.rxlx = i.lxs[0].id
      } else {
        this.fmData.rxlx = null
      }
    },
    goback() {
      this.$router.push('/yrybm')
    },
    setZc() {
      this.$router.push('/yryzc')
    },
    selectxx() {
      this.$Selector({ columns: this.cjxxData, type: 'select' }).then(el => {
        this.fmData.cjxx = el
      })
    },
    getTitle() {
      if (this.selectIndex === 'H') return '填写父母或监护人信息'
      if (this.selectIndex === 'Z') return '填写幼儿园在职直系亲属信息'
      if (this.selectIndex === 'K') return '填写抗疫父母信息'
      if (this.selectIndex === 'Y' || 'F') {
        return '填写父母信息'
      }
    },
    getName() {
      if (this.selectIndex === 'Z')
        return '直系亲属（父母、爷爷奶奶、外公外婆或监护人）'
      if (this.selectIndex === 'K' || 'Y' || 'F')
        return '满足条件的父或母方信息必填'
    },
    getYryxx() {
      yeyxx().then(rps => {
        if (rps.data.success) {
          this.yeyxx = getZjData(rps.data.content)
        } else {
          this.changtoast(rps.data.message)
        }
      })
    },
    nextStep() {
      if (
        !this.fmData.cjxx &&
        this.selectIndex === 'Y' &&
        this.$store.state.selectzc &&
        this.$store.state.selectzc.id === 17
      ) {
        this.changtoast('请选择沧江教育集团所属学校')
        return
      }
      let data = Object.assign({}, this.fmData, this.xsData)
      yeyBm(data).then(rps => {
        clearImages()
        if (rps.data.success) {
          this.changtoast('提交成功', 'sccuess')
          clearYrbmData()
          this.$router.push('/yryzgcx/' + rps.data.content.bmid)
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    beforeStep() {
      this.$router.go(-1)
    },
    getBmdata() {
      //获取已报名信息
      YeyBmxxRxzl(this.$route.query.bmid, this.isView).then(rps => {
        if (rps.data.success) {
          this.fmData = rps.data.content
          this.selectIndex = this.fmData.dm
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    }
  },
  created() {
    this.getYryxx()
    this.xsData = getYrbmData(this.bmid)
    if (!this.xsData) {
      this.$router.push('/yrybm')
    }
    this.xsData.zclx = '户籍就读'
    RxlxInfo({
      xxlx: 2
    }).then(rps => {
      if (rps.data.success) {
        this.rxlbs = rps.data.content
        if (this.$route.query.bmid) {
          this.getBmdata()
        } else {
          this.selectIndex = this.rxlbs[0].dh
          if (this.$store.state.selectzc) {
            this.selectIndex = 'Y'
            this.fmData.rxlx = this.$store.state.selectzc.id
          } else {
            this.fmData.rxlx = this.rxlbs[0].lxs[0].id
          }
        }
      } else {
        this.changtoast(rps.data.message)
      }
    })
  },
  components: {
    publicProgressBar,
    publicUploadPictures
  }
}
</script>

<style lang='scss' scoped>
@import './style/yryxzlx.scss';
</style>