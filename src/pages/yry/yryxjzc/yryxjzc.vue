<template>
  <div class="xjzc">
    <div class="head">
      <publicProgressBar :state="4" :tagData="tagData" />
    </div>
    <div class="xjzcPages">
      <div class="xjzcImage">
        <img src="/static/ybmimages/xjzcHeadImage.png" />
      </div>
      <div class="xjzcTit">
        <p>
          请在规定学籍注册时间内，由家长陪同已被录取的新生，携带资料到被录取的幼儿园进行学籍注册，
          逾期未进行学籍注册的视为放弃录取，学籍学位不予保留。相关资料：1、家长身份证原件及复印件；2、家长户口本原件及复印件（首页、户主页、如家长不是户主，还要复印家长页）；3、幼儿所在户口本原件及复印件（首页、户主页、幼儿页）复印资料与上存资料必须一致；4、出生证。
        </p>
      </div>
      <div class="xjzcItem">
        <span>新生</span>
        <span>{{ xsdata.xm }}</span>
      </div>
      <div class="xjzcItem">
        <span>性别</span>
        <span>{{ xsdata.xb }}</span>
      </div>
      <div class="xjzcItem">
        <span>{{ xsdata.zjlx }}</span>
        <span>{{ xsdata.sfzhm }}</span>
      </div>
      <div class="xjzcItem">
        <span>录取学校</span>
        <span>{{ xsdata.lqxx }}</span>
      </div>
      <div class="xjzcButton" @click="gotoSY">
        <div>返回首页</div>
      </div>
    </div>
  </div>
</template>
<script>
import publicProgressBar from '@/components/publicProgressBar/publicProgressBar'
import { YeyBmxx } from '@/api/publicApi'
export default {
  data() {
    return {
      xsdata: {
        xm: '',
        xb: '',
        sfzhm: '',
        lqxx: '',
        zjlx: ''
      },
      tagData: ['入学报名', '资格审查', '入户排序', '录取确认', '学籍注册']
    }
  },
  components: {
    publicProgressBar
  },
  computed: {},
  created() {
    this.xsdata.xm = this.$route.params.data.xm
    this.xsdata.xb = this.$route.params.data.xb
    this.xsdata.lqxx = this.$route.params.data.lqxx

    this.loading()
    YeyBmxx(this.$route.params.id, true).then(rps => {
      this.closeLoading()
      if (rps.data.success) {
        this.xsdata.sfzhm = rps.data.content.sfzhm
        this.xsdata.zjlx = rps.data.content.zjlx
      } else {
        this.changtoast(rps.data.message, 'error')
      }
    })
    console.log(this.xsdata)
  },
  methods: {
    gotoSY() {
      this.$router.push('/bm')
    }
  }
}
</script>
<style lang="scss" scoped>
@import './style/yryxjzc.scss';
</style>