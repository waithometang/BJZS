<template>
  <div class="rxbm">
    <div class="head">
      <publicProgressBar :tagData="tagData" />
    </div>
    <div class="middle">
      <div class="middle-title">幼儿信息</div>
      <div class="middle-input">
        <public-Input-Select
          v-model="yryxxData.xm"
          :val="yryxxData.xm"
          :name="'幼儿姓名'"
          :placeholder="'输入幼儿姓名'"
        />
        <public-Input-Select
          v-model="yryxxData.zjlx"
          :val="yryxxData.zjlx"
          :name="'证件类型'"
          ref="zjlxCom"
          :placeholder="'选择幼儿证件类型'"
          :selectType="'select'"
          :column="zjlxData"
        />
        <public-Input-Select
          v-model="yryxxData.sfzhm"
          :val="yryxxData.sfzhm"
          :name="'证件号码'"
          :placeholder="'输入幼儿证件号码'"
        />
        <public-Input-Select
          v-model="yryxxData.mz"
          :val="yryxxData.mz"
          :name="'幼儿民族'"
          :placeholder="'选择幼儿所属民族'"
          :selectType="'select'"
          :column="mzData"
        />
        <public-Input-Select
          v-model="yryxxData.sex"
          :val="yryxxData.sex"
          :name="'幼儿性别'"
          :placeholder="'选择幼儿性别'"
          :selectType="'select'"
          :column="sexData"
          ref="sexInput"
        />
        <public-Input-Select
          v-model="yryxxData.birth"
          :val="yryxxData.birth"
          :name="'出生日期'"
          :placeholder="'选择幼儿出生年月'"
          :selectType="'date'"
          ref="birthInput"
        />
        <public-Input-Select
          v-model="yryxxData.hjszjwh"
          :val="yryxxData.hjszjwh"
          :name="'现户籍所属居委'"
          :placeholder="'选择现户籍所属居委'"
          :selectType="'select'"
          :column="hjData"
        />
        <public-Input-Select
          ref="ssxqInput"
          v-model="yryxxData.ssxq"
          :val="yryxxData.ssxq"
          readonly
          :name="'所属学区'"
        />
        <public-Input-Select
          v-model="yryxxData.qrbxqsj"
          :val="yryxxData.qrbxqsj"
          :name="'迁入本学区时间'"
          :placeholder="'选择幼儿户籍迁入时间'"
          :selectType="'qrdate'"
        />
        <public-Input-Select
          v-model="yryxxData.xjdz"
          :val="yryxxData.xjdz"
          :name="'现居住地'"
          :placeholder="'输入现居住地'"
          :selectType="'site'"
        />
        <public-Input-Select
          v-model="yryxxData.hjdz"
          :val="yryxxData.hjdz"
          :name="'户籍地址'"
          :placeholder="'必须与户口本首页地址一致'"
          :selectType="'site'"
        />
      </div>
      <!-- <div class="remark">
        温馨提示：若父母一方为北滘居委股东或三洪奇居委股东,幼儿可以优待类儿童进行入学报名,“<span>现户籍所属居委</span>”请根据父母的股东所属居委
      </div> -->
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
import { MzOption, yeyCheck, YeyBmxx } from '@/api/publicApi'
import { getYrbmData, setYrbmData, sessionInfo } from '@/js/studentUtil'

let validRule = {
  yrxx: [
    { key: 'xm', tips: '幼儿姓名' },
    { key: 'sfzhm', tips: '身份证号码' },
    { key: 'mz', tips: '幼儿所属民族' },
    { key: 'sex', tips: '幼儿性别' },
    { key: 'birth', tips: '幼儿出生年月' },
    { key: 'hjszjwh', tips: '现户籍所属居委' },
    { key: 'ssxq', tips: '所属学区' },
    { key: 'qrbxqsj', tips: '选择幼儿户籍迁入时间' },
    { key: 'xjdz', tips: '现居住地' },
    { key: 'hjdz', tips: '户籍地址' }
  ]
}

export default {
  name: '',
  components: {
    publicProgressBar
  },
  props: {},
  data () {
    return {
      yryxxData: {
        xm: '',
        sfzhm: '',
        zjlx: '身份证',
        mz: '汉族',
        sex: '',
        birth: '',
        hjszjwh: '',
        ssxq: '',
        qrbxqsj: '',
        xjdz: '',
        hjdz: ''
      },
      mzData: [],
      sexData: ['男', '女'],
      hjData: [
        '君兰居委会',
        '北滘居委会',
        '三洪奇居委会',
        '顺江居委会',
        '设计城居委会',
        '碧桂园居委会',
        '其他'
      ],
      ssxqData: ['第一学区', '第二学区', '第三学区'],
      tagData: ['入学报名', '资格审查', '入户排序', '录取确认', '学籍注册'],
      // zjlxData: ['身份证', '港澳居民居住证', '护照']
    }
  },
  computed: {
    bmid () {
      return this.$route.query.bmid
    },
    selectState () {
      return sessionInfo.fetch('selectState')
    },
    zjlxData () {
      if (this.selectState == 'HJ') {
        return ['身份证']
      } else {
        return ['身份证', '港澳居民居住证', '护照']
      }
    }
  },
  watch: {
    'yryxxData.hjszjwh' (newval, oldval) {
      if (
        newval == '三洪奇居委会' ||
        newval == '顺江居委会' ||
        newval == '设计城居委会'
      ) {
        this.yryxxData.ssxq = '第二学区'
      } else if (newval == '君兰居委会' || newval == '北滘居委会') {
        this.yryxxData.ssxq = '第一学区'
      } else if (newval == '碧桂园居委会') {
        this.yryxxData.ssxq = '第三学区'
      } else {
        this.selectState == 'YD1'
          ? (this.yryxxData.ssxq = '第一学区')
          : this.selectState == 'YD2'
            ? (this.yryxxData.ssxq = '第二学区')
            : (this.yryxxData.ssxq = '第三学区')
      }
      this.$refs.ssxqInput && this.$refs.ssxqInput.setText(this.yryxxData.ssxq)
    },
    'yryxxData.sfzhm' (newval, oldval) {
      if (
        this.yryxxData.zjlx == '身份证' &&
        this.yryxxData.sfzhm.length == 18
      ) {
        let birth = newval.substring(6, 10) +
          '-' +
          newval.substring(10, 12) +
          '-' +
          newval.substring(12, 14)

        let sex = parseInt(newval.substr(16, 1)) % 2 == 1 ? '男' : '女'
        this.yryxxData.birth = birth
        this.yryxxData.sex = sex
      } else if (
        this.yryxxData.zjlx == '身份证' &&
        this.yryxxData.sfzhm.length !== 18
      ) {
        this.yryxxData.birth = ''
        this.yryxxData.sex = ''
        this.$refs.birthInput && this.$refs.birthInput.setText('')
        this.$refs.sexInput && this.$refs.sexInput.setText('')
      }
    }
  },
  created () {
    if (this.bmid) {
      this.$post('ybm/api/YeyBmxx', { id: this.bmid, isview: false }).then(
        res => {
          if (res.data.success) {
            this.yryxxData = res.data.content
            sessionInfo.save('ssxqType', this.yryxxData.ssxq)
            this.$nextTick(() =>
              this.$refs.zjlxCom.setText(this.yryxxData.zjlx)
            )
          } else {
            this.changtoast(rps.data.message)
          }
        }
      )
    } else {
      let data = getYrbmData()
      if (data) {
        this.yryxxData = data
      }
    }
    if (this.selectState == 'HJ') {
      this.hjData = [
        '君兰居委会',
        '北滘居委会',
        '三洪奇居委会',
        '顺江居委会',
        '设计城居委会',
        '碧桂园居委会'
      ]
    }
  },
  mounted () {
    this.getMzOption()
  },
  methods: {
    // 民族信息
    getMzOption () {
      MzOption().then(rps => {
        if (rps.data.success) {
          let data = rps.data.content.mzxx.split(';')
          this.mzData = data.filter(el => {
            return el !== ''
          })
        } else {
          this.changtoast(rps.data.message)
        }
      })
    },
    checkExtraData (item) {
      let _rules = validRule[item]
      if (!_rules) return true
      let _r
      for (let index = 0; index < _rules.length; index++) {
        _r = _rules[index]
        if (!this.yryxxData[_r.key]) {
          this.changtoast('请填写' + _r.tips)
          return false
        }
      }
      return true
    },
    // 上一步
    beforeStep () {
      this.$router.go(-1)
    },
    // 下一步
    nextStep () {
      if (!this.checkExtraData('yrxx')) {
        return
      }
      if (this.yryxxData.zjlx == '身份证') {
        const IsForm = CheckForm([
          {
            data: this.yryxxData.sfzhm,
            name: 'ckad',
            msg: '请输入正确的身份证号码'
          }
        ])
        if (IsForm) {
          return
        }
      }
      // Date.parse(this.yryxxData.qrbxqsj)
      let qrsj = new Date(this.yryxxData.qrbxqsj).getTime()
      let birth = new Date(this.yryxxData.birth).getTime()
      let timeDiff = qrsj - birth
      if (timeDiff <= 0) {
        this.changtoast("迁入本学区时间要大于出生日期", 'error')
        return
      }
      this.yryxxData.bmid = this.bmid
      yeyCheck(this.yryxxData).then(rps => {
        this.closeLoading()
        if (rps.data.success) {
          setYrbmData(this.yryxxData)
          this.$router.push('/yrysctp' + window.location.search)
          // this.$router.push('/yrylxxz' + window.location.search)
          // this.$router.push('/yrytbzy' + window.location.search)
        } else {
          this.changtoast(rps.data.message)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import './style/yryrxbm.scss';
</style>
