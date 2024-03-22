<template>
  <div class="zgcx">
    <div class="head">
      <publicProgressBar :state="1" :tagData="tagData" />
    </div>
    <div class="zgcxPages">
      <img src="/static/ybmimages/dengdai.png" alt="" />
      <div>
        <p>请耐心等候结果通知。</p>
        <span>
          审查后会以短信形式发送审查结果消息，<br />也可在此查看审查结果。
        </span>
      </div>
      <div class="base">
        <div class="base-tab">
          <div @click="gotoSY">返回首页</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import publicProgressBar from '@/components/publicProgressBar/publicProgressBar'

export default {
  computed: {},
  data () {
    return {
      show: true,
      tagData: ['入学报名', '资格审查', '入户排序', '录取确认', '学籍注册']
    }
  },
  methods: {
    gotoSY () {
      this.$router.push('/bm')
    }
  },
  created () { },
  components: {
    publicProgressBar
  }
}
</script>
<style lang="scss" scoped>
@import './style/yryzgcx.scss';
</style>