<template>
  <div class="sczl">
    <div class="head">
      <publicProgressBar :tagData="tagData" />
    </div>
    <div class="middle">
      <div class="middle-title">
        上传资料照片:<br />
        <span
          style="
            color: #44828c;
            display: inline-block;
            font-weight: 400;
            margin-top: 10px;
          "
        >
          报名系统上传资料必须与原件保持一致。提供虚假材料，一经查实，取消录取资格，并报有关部门处理。</span
        >
      </div>
      <div class="info-list">
        <div v-for="(item, index) in selectLxs" :key="index">
          <publicUploadPictures
            v-for="(val, key) in item.zls"
            :ref="'uploadpic' + val.id"
            :key="key"
            :title="val.desc"
            :loaclData="!bmid"
            :state="val.id"
            :isNeed="val.sfbx === 1"
          />
        </div>
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

export default {
  name: '',
  components: {
    publicProgressBar,
    publicUploadPictures
  },
  props: {},
  data () {
    return {
      tagData: ['入学报名', '资格审查', '入户排序', '录取确认', '学籍注册'],
      fmData: {
        zls: []
      }
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
      return sessionInfo.fetch('selectBz')
    },
    bmid () {
      return this.$route.query.bmid
    },
    selectLxs () {
      return sessionInfo.fetch('selectLxs')
    }
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
          let zls = rps.data.content.zls
          delete rps.data.content.zls
          // 图片显示
          zls.forEach(el => {
            let _ref = this.$refs['uploadpic' + el.zlid]
            if (_ref && _ref.length > 0) {
              _ref[0].setPictures(el.idurls, el.main_id)
            }
          })
        } else {
          this.changtoast(rps.data.message)
        }
      })
    } else {
      this.fmData = sessionInfo.fetch('zlData') || {
        zls: []
      }
    }
  },
  mounted () { },
  methods: {
    // 上一步
    beforeStep () {
      this.$router.go(-1)
    },
    // 下一步
    nextStep () {
      // 上传资料
      let selelctLxs = this.selectLxs[0]
      let selelctzls = selelctLxs.zls
      this.fmData.zls = []
      this.fmData.rxlx = selelctLxs.id
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
          this.fmData.zls.push({
            id: el.id,
            mainid: data.mainId
          })
        }
      }
      sessionInfo.save('zlData', this.fmData)
      // this.$router.push('/yrysctp' + window.location.search)
      // this.$router.push('/yryrxbm' + window.location.search)
      this.$router.push('/yrytbzy' + window.location.search)

    }
  }
}
</script>

<style scoped lang="scss">
@import './style/yrysczl.scss';
</style>
