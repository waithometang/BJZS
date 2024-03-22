<template>
  <div class="yryxzlx">
    <div class="head">
      <publicProgressBar :state="isView ? 1 : 0" :tagData="tagData" />
    </div>
    <div class="middle">
      <div class="middle-title">请选择入学类型:</div>
      <div class="type-list">
        <div
          class="list-tab"
          v-show="
            (rxlb.desc != '户籍生' || hjlx != '高明区外户籍') &&
            (rxlb.desc != '按房产入园' || hjlx == '高明区外户籍')
          "
          :class="{ 'list-tab-action': selectIndex === rxlb.dh }"
          v-for="(rxlb, index) in rxlbs"
          :key="index"
          @click="select(rxlb)"
        >
          {{ rxlb.desc }}({{ rxlb.bz }})
        </div>
      </div>
    </div>
    <div class="base">
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
import {
  setYrbmData,
  getYrbmData,
  clearYrbmData,
  sessionInfo
} from '@/js/studentUtil.js'
import { RxlxInfo, yeyBm, yeyxx, YeyBmLb } from '@/api/publicApi'

export default {
  components: {
    publicProgressBar
  },
  computed: {
    bmid() {
      return this.$route.params.bmid
    },
    isView() {
      //查看模式，不能修改
      return this.$route.query.m === 'v'
    },
    isEdit() {
      //查看模式，待审查前
      return this.$route.query.m === 'e'
    },
    selectState() {
      return sessionInfo.fetch('selectState')
    }
  },
  data() {
    return {
      xsData: '',
      selectIndex: '',
      rxlbs: [],
      tagData: ['入学报名', '资格审查', '入户排序', '录取确认', '学籍注册'],
      fmData: {
        jzxm: '',
        yyrgx: '',
        jz_zjlx: '',
        jz_zjhm: '',
        lxdh: '',
        cjxx: ''
      },
      hjlx: ''
    }
  },
  methods: {
    select(i) {
      if (this.isView || this.isEdit) {
        this.changtoast('入学类型不可修改', 'error')
        return
      }
      this.selectIndex = i.dh
      sessionInfo.save('selectLxs', i.lxs)
      sessionInfo.save('selectState', i.dh)
      sessionInfo.save('selectName', i.desc)
      sessionInfo.save('selectBz', i.bz)
    },
    goback() {
      this.$router.push('/yrybm')
    },
    nextStep() {
      let parm = this.bmid ? '/' + this.bmid : ''
      this.$router.push('/yrysczl' + parm + window.location.search)
    },
    beforeStep() {
      this.$router.go(-1)
    },
    getBmdata(bmid) {
      //获取已报名信息
      YeyBmLb(bmid).then(rps => {
        if (rps.data.success) {
          this.selectIndex = rps.data.content.dm
          sessionInfo.save('selectState', rps.data.content.dm)
          this.rxlbs.forEach(el => {
            if (el.dh === this.selectIndex) {
              sessionInfo.save('selectLxs', el.lxs)
              el.lxs.forEach(val => {
                sessionInfo.save('selectName', el.desc)
                sessionInfo.save('selectBz', el.bz)
                if (val.id === rps.data.content.rxlxid) {
                  sessionInfo.save('selectZc', val)
                }
              })
            }
          })
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    }
  },
  created() {
    this.hjlx = getYrbmData(this.bmid).hjlx
    RxlxInfo({
      xxlx: 2
    }).then(rps => {
      if (rps.data.success) {
        this.rxlbs = rps.data.content
        if (this.$route.query.bmid) {
          this.getBmdata(this.$route.query.bmid)
        } else if (this.isEdit && this.bmid) {
          this.getBmdata(this.bmid)
        } else {
          // if (this.selectState) {
          //   this.selectIndex = this.selectState;
          // } else {
          if (this.hjlx == '高明区外户籍') {
            // this.selectIndex = this.rxlbs[1].dh;
            this.select(this.rxlbs[1])
          } else {
            // this.selectIndex = this.rxlbs[0].dh;
            this.select(this.rxlbs[0])
          }
          sessionInfo.save('selectLxs', this.rxlbs[0].lxs)
        }
        // }
        // this.select(this.rxlbs[0]);
      } else {
        this.changtoast(rps.data.message)
      }
    })
  }
}
</script>

<style lang='scss' scoped>
@import './style/yryxzlx.scss';
</style>