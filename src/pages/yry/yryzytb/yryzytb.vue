<template>
  <div class="zytb" v-if="show">
    <div class="head">
      <publicProgressBar :state="2" :tagData="tagData" />
    </div>
    <div class="zytbPages">
      <div class="stage">{{ jd }}</div>
      <div class="info-list">
        <div class="info-title">请选择报读学校:</div>
        <public-Input-Select
          :readonly="readonly"
          v-model="sszj"
          :val="sszj"
          name="幼儿园所属镇街"
          placeholder="选择所属镇街"
          selectType="select"
          :column="zjData"
        />
        <public-Input-Select
          v-model="yryid"
          :val="yryid"
          name="可就读公办幼儿园"
          placeholder="选择可就读幼儿园"
          selectType="select"
          :column="getxxData()"
        />
      </div>
      <div class="base">
        <!-- <div class="base-tab">
          <div class="public-long-but">上一步</div>
        </div> -->
        <div class="base-tab">
          <div class="public-long-but" @click="nextStep">下一步</div>
        </div>
      </div>
      <div class="banner"></div>
    </div>
  </div>
</template>
<script>
import publicProgressBar from '@/components/publicProgressBar/publicProgressBar'
import { yryzytb, yeyxx, ZytbInfo } from '@/api/publicApi'
import { getZjData } from '@/js/studentUtil'
export default {
  computed: {
    bmid() {
      return this.$route.params.bmid
    }
  },
  data() {
    return {
      tagData: ['入学报名', '资格审查', '入户排序', '录取确认', '学籍注册'],
      tab_action: 1,
      readonly: false,
      yryid: '',
      sszj: '',
      jd: '',
      yeyxx: [],
      zjData: [],
      xxData: [],
      show: false
    }
  },
  watch: {
    sszj() {
      this.$nextTick(() => (this.yryid = ''))
      this.yeyxx.filter(val => {
        if (val.text === this.sszj) {
          this.xxData = val.children
        }
      })
    }
  },
  components: {
    publicProgressBar
  },
  methods: {
    getxxData() {
      return this.xxData.map(el => el.text)
    },
    getyeyID() {
      let data = ''
      this.xxData.forEach(el => {
        if (el.text === this.yryid) {
          data = el.id
        }
      })
      return data
    },
    getInfo() {
      this.loading()
      ZytbInfo({
        id: this.$route.params.bmid
      }).then(rps => {
        this.closeLoading()
        if (rps.data.success) {
          if (rps.data.content) {
            this.jd = rps.data.content.jd
            this.sszj = rps.data.content.sszj
            this.readonly = !!this.sszj
            this.show = true
          } else {
            this.$router.replace(
              `/yrytxxx?m=v&bmid=${this.$route.params.bmid}&jg=3`
            )
          }
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    nextStep() {
      if (!this.yryid) {
        this.changtoast('请先选择幼儿园', 'error')
        return
      }
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '是否提交选择的志愿学校'
        })
        .then(() => {
          this.loading()
          yryzytb({ bmid: this.bmid, yryid: this.getyeyID() }).then(rps => {
            this.closeLoading()
            if (rps.data.success) {
              this.changtoast('提交成功', 'sccuess')
              this.$router.push('/yrybmlq/' + this.bmid)
            } else {
              this.changtoast(rps.data.message, 'error')
            }
          })
        })
        .catch(() => {
          return
        })
    },
    getData() {
      yeyxx({ yxw: true }).then(rps => {
        if (rps.data.success) {
          this.yeyxx = getZjData(rps.data.content)
          this.yeyxx.forEach(el => {
            this.zjData.push(el.text)
          })
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    }
  },
  created() {
    this.getData()
    this.getInfo()
  }
}
</script>
<style lang="scss" scoped>
@import './style/yryzytb.scss';
</style>