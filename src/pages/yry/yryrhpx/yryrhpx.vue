<template>
  <div class="rhpx">
    <div class="head">
      <publicProgressBar :state="2" :tagData="tagData" />
    </div>
    <div class="middle">
      <template v-if="rhpxData.length > 0">
        <div class="middle-item">
          <div class="title">入户排序</div>
          <div class="item" v-for="(item, index) in rhpxData" :key="index">
            <div class="content">
              <div class="left-img">
                <img src="/static/ybmimages/touxiang.png" alt="" />
              </div>
              <div class="middle-content">
                <div class="name">
                  {{ item.xm }}&emsp;&emsp;{{ item.xb }}
                  <div class="right-type">
                    {{ item.hjlx }}
                  </div>
                </div>
                <div class="bmxx">{{ item.bmxx }}</div>
                <div :class="item.lqjg === '未录取' ? 'wlq' : 'ylq'">
                  {{ item.lqjg }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="no-data">
          <img src="/static/ybmimages/yrybmlqawait.png" alt="" />
          <div class="tips">请耐心等待排序结果</div>
        </div>
      </template>
      <div class="footer-btn">
        <div class="last-step" @click="laststep">上一步</div>
        <div
          class="next-step"
          :class="{ unactive: rhpxData.length <= 0 }"
          @click="nextstep"
        >
          下一步
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import publicProgressBar from '@/components/publicProgressBar/publicProgressBar'
export default {
  name: '',
  components: {
    publicProgressBar
  },
  props: {},
  data() {
    return {
      rhpxJg: false,
      tagData: ['入学报名', '资格审查', '入户排序', '录取确认', '学籍注册'],
      rhpxData: [
        {
          xm: '张思凯',
          hjlx: '户籍生',
          xb: '女',
          bmxx: '报名学校：君兰幼儿园(第一志愿报名学校)',
          lqjg: '未录取'
        },
        {
          xm: '张思凯',
          hjlx: '户籍生',
          xb: '女',
          bmxx: '报名学校：君兰幼儿园(第一志愿报名学校)',
          lqjg: '已录取'
        }
      ]
    }
  },
  computed: {
    bmid() {
      return this.$route.params.bmid
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 上一步
    laststep() {
      this.$router.go(-1)
    },
    // 下一步
    nextstep() {
      if (this.rhpxData.length <= 0) {
        return
      }
      this.$router.push(`/yrybmlq/${this.bmid}`)
    }
  }
}
</script>

<style scoped lang="scss">
@import './style/yryrhpx.scss';
</style>
