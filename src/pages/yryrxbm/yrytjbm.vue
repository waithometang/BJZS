<template>
  <div class="container">
    <div class="title">短信验证</div>
    <div class="input-wrapper">
      <div class="phone">
        <public-Input-Select
          v-model="phone"
          :val="phone"
          :name="'手机号码'"
          :placeholder="'请输入手机号码'"
          :type="'number'"
          :readonly="true"
        />
      </div>
      <div class="code">
        <public-Input-Select
          v-model="code"
          :val="code"
          :name="'验证码'"
          :placeholder="'请输入短信验证码'"
          :type="'number'"
          :maxlength="maxlength"
        />
        <div
          class="send-code"
          @click="GetphoneCode"
          :class="{ isActive: codeTime !== 0 }"
        >
          {{ codeTime === 0 ? '点击获取验证码' : codeTime + 's重发' }}
        </div>
      </div>
    </div>
    <div class="remark">
      点击确认提交前可在2021年4月19日上午9:00时网上报名截止前修改报名信息，一旦确认提交不得修改报名信息！
    </div>
    <div class="submit" @click="submit">提交</div>
  </div>
</template>

<script>
import {
  clearYrbmData,
  sessionInfo,
  getYrbmData,
  getYrjzData
} from '@/js/studentUtil.js'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      phone: '', // 手机号码
      code: '', // 验证码
      codeTime: 0,
      maxlength: 4 // 限制位数
    }
  },
  computed: {
    bmid () {
      return this.$route.query.bmid
    }
  },
  watch: {},
  created () { },
  mounted () {
    let bmid = this.bmid ? this.bmid : ''
    this.phone = getYrjzData(bmid).jz1_lxdh
  },
  methods: {
    // 获取验证码
    GetphoneCode () {
      let phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/
      if (!this.phone) {
        this.changtoast('请输入手机号码')
        return
      }
      if (!phoneReg.test(this.phone)) {
        this.changtoast('请输入正确的手机号码')
        return
      }
      if (this.codeTime > 0) {
        return
      }
      this.codeTime = 60
      this.$post('/api/sms/SendCode_Bjzs', {
        mobile: this.phone,
        smsType: 4
      }).then(rps => {
        if (rps.data.success) {
          this.dome = setInterval(() => {
            if (this.codeTime > 0) {
              this.codeTime--
              console.log(this.codeTime)
            } else {
              clearInterval(this.dome)
            }
          }, 1000)
        } else {
          this.codeTime = 0
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    // 提交数据 先判断验证是否正确 再提交数据
    submit () {
      if (!this.code) {
        this.changtoast('请输入验证码')
        return
      }
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '是否确认现在提交报名？点击确认提交前可在2021年4月19日上午9:00时网上报名截止前修改报名信息，一旦确认提交不得修改报名信息！'
        })
        .then(() => {
          this.loading()
          this.$post('/api/sms/VailCode', {
            code: this.code,
            smsType: 4
          })
            .then(res => {
              this.closeLoading()
              if (res.data.success) {
                let data = sessionInfo.fetch('submitData')
                this.removeStorageImage()
                this.$post('ybm/api/yeyBm', data).then(rps => {
                  this.closeLoading()
                  if (rps.data.success) {
                    this.changtoast('提交成功', 'sccuess')
                    let bmid = this.bmid ? this.bmid : ''
                    clearYrbmData(bmid)
                    sessionInfo.remove('submitData')
                    // this.removeStorageImage()
                    this.$router.push('/yryzgcx')
                  } else {
                    this.changtoast(rps.data.message, 'error')
                  }
                })
              } else {
                this.changtoast(res.data.message)
              }
            })
            .catch(err => {
              this.closeLoading()
              return
            })
        }).catch(err => {
          return
        })

    },
    // 清除图片
    removeStorageImage () {
      try {
        let zls = sessionInfo.fetch('selectLxs')[0].zls
        zls.forEach(zl => {
          localStorage.removeItem(`ImagesKey${zl.id}`)
        })
      } catch (error) { }
    },
    beforeDestroy () {
      clearInterval(this.dome)
    }
  }
}
</script>

<style scoped lang="scss">
@import './style/yrytjbm.scss';
</style>
