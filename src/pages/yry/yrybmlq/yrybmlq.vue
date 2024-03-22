<template>
  <div class="bmlq">
    <div class="head">
      <publicProgressBar :state="3" :tagData="tagData" />
    </div>

    <div class="middle">
      <div class="title">确认报名录取</div>
      <div class="tips">
        提示：请在确认截止时间前确认录取资格结果，否则视为放弃该次的入学资格。
      </div>
      <div class="middle-item">
        <div class="left-img">
          <img src="/static/ybmimages/touxiang.png" alt="" />
        </div>
        <div class="middle-content">
          <div>{{ lqjg.xm }}&emsp;&emsp;{{ lqjg.xb }}</div>
          <div class="base-tab">录取学校：{{ lqjg.lqxx }}({{ lqjg.zypx }})</div>
          <div class="base-tab">录取时间：{{ lqjg.lqsj }}</div>
        </div>
        <div class="right-type">{{ lqjg.rxlx }}</div>
      </div>
      <div class="footer-btn">
        <div class="fq-btn" @click="qrqxShow = true">放弃</div>
        <div class="qr-btn" @click="confirmFn">确认</div>
      </div>
    </div>

    <!-- 弹出框 -->
    <div class="layer" v-show="qrqxShow">
      <div class="popup">
        <div class="popupClose">
          <img src="/static/ybmimages/close.png" @click="qrqxShow = false" />
        </div>
        <div class="popupTitle">
          <img src="/static/ybmimages/remind.png" />
          <p>确认放弃该录取名额吗?</p>
        </div>
        <div class="popupInput">
          <textarea placeholder="请输入放弃原因" v-model="qrsm"></textarea>
        </div>
        <div class="popupBotton">
          <div @click="cancelFn">确定</div>
          <i></i>
          <div @click="qrqxShow = false">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import publicProgressBar from '@/components/publicProgressBar/publicProgressBar'
import { lqjg, lqqr } from '@/api/publicApi'

export default {
  computed: {
    bmid () {
      return this.$route.params.bmid
    }
  },
  data () {
    return {
      qrqxShow: false,
      qrsm: '',
      lqjg: {},
      tagData: ['入学报名', '资格审查', '入户排序', '录取确认', '学籍注册']
    }
  },
  components: {
    publicProgressBar
  },
  created () {
    this.loading()
    lqjg(this.bmid).then(rps => {
      this.closeLoading()
      if (rps.data.success) {
        this.lqjg = rps.data.content
        console.log(this.lqjg)
        // if (this.lqjg.lqjg === '未录取' || this.lqjg.qrjg === '放弃就读') {
        //   this.$router.replace('/bm')
        // }
      } else {
        this.changtoast(rps.data.message, 'error')
      }
    })
  },
  methods: {
    // 确认
    confirmFn () {
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '是否确认就读该学校？'
        })
        .then(() => {
          this.loading()
          lqqr({
            xxlx: 2,
            id: this.bmid,
            sfqr: true,
            zyid: this.lqjg.zy_id
          }).then(rps => {
            this.closeLoading()
            if (rps.data.success) {
              this.$dialog
                .alert({
                  title: '温馨提示',
                  message: '确认就读学校成功'
                })
                .then(() => {
                  this.$router.push({
                    name: 'yryxjzc',
                    params: {
                      data: this.lqjg,
                      id: this.bmid
                    }
                  })
                })
            } else {
              this.changtoast(rps.data.message, 'error')
            }
          })
        })
    },
    // 取消
    cancelFn () {
      if (!this.qrsm) {
        this.changtoast('请输入放弃原因', 'error')
        return
      }
      lqqr({
        xxlx: 2,
        id: this.bmid,
        sfqr: false,
        qrsm: this.qrsm,
        zyid: this.lqjg.zy_id
      }).then(rps => {
        if (rps.data.success) {
          this.$dialog
            .alert({
              title: '温馨提示',
              message: '放弃就读学校成功'
            })
            .then(() => {
              this.$router.push('/bm')
            })
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './style/yrybmlq.scss';
</style>