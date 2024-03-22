<template>
  <div class="yryzgcxxq">
    <div class="head">
      <div v-if="isView" class="public-classify-tab">
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
    <div class="list" v-if="show">
      <div class="listHead">学生信息</div>
      <div class="item">
        <div class="tximgs"><img src="/static/ybmimages/touxiang.png" /></div>
        <div class="message">
          <span>{{ thisData.xm }}</span>
          <p>性别：{{ thisData.xb }}</p>
          <p>身份证号：{{ thisData.sfzh }}</p>
        </div>
      </div>
    </div>
    <i></i>
    <div class="list" v-if="show">
      <div class="listHead">查询结果</div>
      <div class="item">
        <div class="bzimgs"><img src="/static/ybmimages/yryzgcx_01.png" /></div>
        <div class="message">
          <span>入学报名</span>
          <p>你已完成入学报名</p>
          <p class="time">{{ thisData.bmsj }}</p>
        </div>
      </div>
      <div class="item" v-if="stepIndex > 0">
        <div class="bzimgs"><img src="/static/ybmimages/yryzgcx_02.png" /></div>
        <div class="message">
          <span>资格审查</span>
          <p v-if="thisData.sczt === '待审查'">资格审查中</p>
          <p class="cor" v-else-if="thisData.scjg === '通过'">
            资格审查已通过！
          </p>
          <p class="cor cor2" v-else>资格审查不通过</p>
          <p class="time" v-if="thisData.scbz">{{ thisData.scbz }}</p>
          <p class="time">{{ thisData.scjg }}</p>
        </div>
      </div>
      <template v-if="stepIndex > 1 && thisData.zys">
        <div class="item" v-for="(item, index) in thisData.zys" :key="index">
          <div class="bzimgs">
            <img v-if="index == 0" src="/static/ybmimages/yryzgcx_03.png" />
          </div>
          <div class="message">
            <span v-if="index == 0">入户排序</span>
            <p>报名学校:{{ item.mc }}</p>
            <p>阶段:{{ item.jd }}</p>
            <p v-if="item.lqjg">录取结果：{{ item.lqjg }}</p>
            <p class="time">{{ item.rq }}</p>
          </div>
        </div>
      </template>
      <template v-if="stepIndex > 2">
        <div class="item border" v-if="thisData.lqjg === '已录取'">
          <div class="bzimgs">
            <img src="/static/ybmimages/yryzgcx_01.png" />
          </div>
          <div class="message">
            <span>确认报名录取</span>
            <p>录取学校:{{ thisData.lqxx }}</p>
            <!-- <p> 录取时间:{{thisData.lqsj}} </p> -->
            <p>阶段:{{ thisData.lqjd }}</p>
            <p class="time">
              提示:请在确认截止时间前确认录取结果，否则<br />视为放弃该次的入学资格。如果放弃该次的入学<br />资格，需在第二阶段入学报名时间内重新选择报<br />读幼儿园进行入学报名。
            </p>
            <p class="time">{{ thisData.lqsj }}</p>
          </div>
        </div>
        <div class="item" v-else-if="thisData.lqjg === '未录取'">
          <div class="bzimgs"></div>
          <div class="message">
            <p class="cor">未录取</p>
          </div>
        </div>
        <div class="item" v-if="thisData.qrjg">
          <div class="bzimgs"></div>
          <div class="message">
            <p class="cor">{{ thisData.qrjg }}</p>
            <p class="time">{{ thisData.qrsj }}</p>
          </div>
        </div>
      </template>
      <div class="item" v-if="stepIndex > 3">
        <div class="bzimgs"><img src="/static/ybmimages/yryzgcx_05.png" /></div>
        <div class="message">
          <span>学籍注册</span>
          <p>
            请在规定注册时间内，家长陪同已录取的幼儿，<br />携带相关证件资料到幼儿园进行学籍注册。
          </p>
          <p class="time">录取学校:{{ thisData.lqxx }}</p>
        </div>
      </div>
    </div>
    <div class="button" @click="gotoSY">点击返回首页</div>
  </div>
</template>
<script>
import { YeyJdcx } from '@/api/publicApi'

let steps = [
  '入学报名',
  '志愿填报',
  '资格审查',
  '幼儿园录取排序',
  '报名录取',
  '学籍注册'
]

export default {
  data() {
    return {
      show: false,
      listData: [
        { name: '基本信息', state: 1 },
        { name: '证明材料', state: 2 },
        { name: '进度结果', state: 3 }
      ],
      tabState: 3,
      stepIndex: 0,
      thisData: {
        xm: ''
      }
    }
  },
  computed: {
    isView() {
      //查看模式，不能修改
      return this.$route.query.m === 'v'
    }
  },
  methods: {
    changeTab(item) {
      if (item.state == 2) {
        this.$router.push('/yrybtg' + window.location.search)
      } else if (item.state == 3) {
        this.$router.push('/yryzgcxxq' + window.location.search)
      } else if (item.state == 1) {
        this.$router.push('/yrytxxx' + window.location.search)
      }
    },
    gotoSY() {
      this.$router.push('/yrybm')
    }
  },
  created() {
    YeyJdcx(this.$route.query.bmid).then(rps => {
      if (rps.data.success) {
        this.show = true
        this.thisData = rps.data.content
        this.stepIndex = steps.indexOf(this.thisData.dqbz)
      } else {
        this.changtoast(rps.data.message, 'error')
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@import './style/yryzgcxxq.scss';
</style>