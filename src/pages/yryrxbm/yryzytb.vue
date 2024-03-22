<template>
  <div class="zytb">
    <div class="head">
      <publicProgressBar :tagData="tagData" />
    </div>
    <div class="middle">
      <div class="middle-title">志愿填报</div>
      <template v-if="selectState == 'HJ'">
        <template v-if="zytbData.ssxq == '第一学区'">
          <div class="tip">（请务必认真填写志愿填报先后顺序）</div>
          <div class="middle-input">
            <public-Input-Select
              v-model="zytbData.ssxq"
              :val="zytbData.ssxq"
              :required="false"
              :name="'所属学区'"
              :placeholder="'输入所属学区'"
              readonly
            />
            <public-Input-Select
              v-model="zytbData.zyxx1"
              :val="zytbData.zyxx1"
              :name="'第一志愿'"
              :placeholder="'选择志愿填报学校'"
              selectType="select"
              :column="xqxxData"
            />
            <public-Input-Select
              v-model="zytbData.zyxx2"
              :val="zytbData.zyxx2"
              :name="'第二志愿'"
              :placeholder="'选择志愿填报学校'"
              :column="xqxxData"
              selectType="select"
              :required="false"
            />
            <public-Input-Select
              v-model="zytbData.zyxx3"
              :val="zytbData.zyxx3"
              :name="'第三志愿'"
              :placeholder="'选择志愿填报学校'"
              :column="xqxxData"
              selectType="select"
              :required="false"
            />
            <public-Input-Select
              v-model="zytbData.zyxx4"
              :val="zytbData.zyxx4"
              :name="'第四志愿'"
              :placeholder="'选择志愿填报学校'"
              :column="xqxxData"
              selectType="select"
              :required="false"
            />
            <public-Input-Select
              v-model="zytbData.zyxx5"
              :val="zytbData.zyxx5"
              :name="'第五志愿'"
              :placeholder="'选择志愿填报学校'"
              :column="xqxxData"
              selectType="select"
              :required="false"
            />
            <div class="tips">
              <span>*</span>
              学位不足的情况下，是否同意跨学区调剂
              <div class="radio-select">
                <van-radio-group
                  v-model="zytbData.sffctj"
                  direction="horizontal"
                  @change="change"
                >
                  <van-radio name="是">是</van-radio>
                  <van-radio name="否">否</van-radio>
                </van-radio-group>
              </div>
            </div>
            <template v-if="zytbData.sffctj == '是'">
              <public-Input-Select
                v-model="zytbData.tjdyzy"
                :val="zytbData.tjdyzy"
                :name="'第一志愿'"
                :placeholder="'选择志愿调剂学区'"
                :column="tjData"
                selectType="select"
              />
              <public-Input-Select
                v-model="zytbData.tjdezy"
                :val="zytbData.tjdezy"
                :name="'第二志愿'"
                :placeholder="'选择志愿调剂学区'"
                :column="tjData"
                selectType="select"
                :required="false"
              />
            </template>
          </div>
        </template>
        <template v-else>
          <div class="middle-input">
            <public-Input-Select
              v-model="zytbData.ssxq"
              :val="zytbData.ssxq"
              :required="false"
              :name="'所属学区'"
              :placeholder="'输入所属学区'"
              readonly
            />
            <public-Input-Select
              v-model="zytbData.bmxx"
              :val="zytbData.bmxx"
              :required="false"
              :name="'报名学校'"
              :placeholder="'选择报名学校'"
              :selectType="'select'"
              :column="xqxxData"
            />
            <div class="tips">
              <span>*</span>
              学位不足的情况下，是否同意跨学区调剂
              <div class="radio-select">
                <van-radio-group
                  v-model="zytbData.sffctj"
                  direction="horizontal"
                  @change="change"
                >
                  <van-radio name="是">是</van-radio>
                  <van-radio name="否">否</van-radio>
                </van-radio-group>
              </div>
            </div>
            <template v-if="zytbData.sffctj == '是'">
              <public-Input-Select
                v-model="zytbData.tjdyzy"
                :val="zytbData.tjdyzy"
                :name="'第一志愿'"
                :placeholder="'选择志愿填报学校'"
                :column="tjData"
                selectType="select"
              />
              <public-Input-Select
                v-model="zytbData.tjdezy"
                :val="zytbData.tjdezy"
                :name="'第二志愿'"
                :placeholder="'选择志愿填报学校'"
                :column="tjData"
                selectType="select"
                :required="false"
              />
            </template>
          </div>
        </template>
      </template>
      <template
        v-if="
          selectState == 'YD1' || selectState == 'YD2' || selectState == 'YD3'
        "
      >
        <div class="middle-input">
          <public-Input-Select
            v-model="zytbData.ssxq"
            :val="zytbData.ssxq"
            :required="false"
            :name="'所属学区'"
            :placeholder="'输入所属学区'"
            readonly
          />
          <public-Input-Select
            v-model="zytbData.bmxx"
            :val="zytbData.bmxx"
            :required="false"
            :name="'报名学校'"
            :placeholder="'选择报名学校'"
            :column="xqxxData"
            :selectType="'select'"
          />
        </div>
      </template>
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
import {
  clearYrbmData,
  sessionInfo,
  getYrbmData,
  getYrjzData
} from '@/js/studentUtil.js'

let validRule = {
  zyxx: [
    { key: 'zyxx1', tips: '第一志愿' }
    // { key: 'zyxx2', tips: '第二志愿' },
    // { key: 'zyxx3', tips: '第三志愿' },
    // { key: 'zyxx4', tips: '第四志愿' },
    // { key: 'zyxx5', tips: '第五志愿' }
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
      tagData: ['入学报名', '资格审查', '入户排序', '录取确认', '学籍注册'],
      zytbData: {
        sffctj: '是',
        bmxx: '',
        tjdyzy: '',
        tjdezy: ''
      },
      // 学校数据
      xqxxData: []
    }
  },
  computed: {
    // 所属学区
    ssxq () {
      return getYrbmData(this.bmid).ssxq
    },
    // 入学类型
    selectState () {
      return sessionInfo.fetch('selectState')
    },
    bmid () {
      return this.$route.query.bmid
    },
    tjData () {
      return ['第一学区', '第二学区', '第三学区'].filter(item => item != this.ssxq)
    }
  },
  created () {
    let xxData = getYrbmData(this.bmid)
    this.zytbData.ssxq = xxData.ssxq
    let ssxq = xxData.ssxq
    if (this.bmid) {
      let ssxqType = sessionInfo.fetch('ssxqType')
      let rxlx = sessionInfo.fetch('rxlx')
      let selectLxs = sessionInfo.fetch('selectLxs')[0].id
      if (ssxqType == ssxq && rxlx == selectLxs) {
        this.$post('ybm/api/YeyYbZyxx', {
          id: this.bmid,
          dh: this.selectState
        }).then(res => {
          if (res.data.success) {
            this.zytbData = res.data.content
            this.zytbData.ssxq = xxData.ssxq
          } else {
            this.changtoast(res.data.message, 'error')
          }
        })
      }
    }
    this.$post('ybm/api/xxxx', {
      xxlx: 2,
      dh: this.selectState,
      ssxq: ssxq
    })
      .then(res => {
        console.log(res.data.content)
        if (res.data.success) {
          this.allxxData = res.data.content
          this.xqxxData = res.data.content
            .filter(m => m.ssxq == ssxq)
            .map(m => m.xxmc)
          this.zytbData.bmxx = this.xqxxData.length == 1 ? this.xqxxData[0] : ''
        } else {
          this.changtoast(res.data.message, 'error')
        }
      })
      .catch(() => {
        console.log('error')
      })
  },
  methods: {
    // 判断志愿不能为空
    checkExtraData (item) {
      let _rules = validRule[item]
      if (!_rules) return true
      let _r
      for (let index = 0; index < _rules.length; index++) {
        _r = _rules[index]
        if (!this.zytbData[_r.key]) {
          this.changtoast('请选择' + _r.tips)
          return false
        }
      }
      return true
    },
    //判断[1,3,24,345,5]是否有重复数据
    isRepeat (arr) {
      var hash = {}
      for (var i in arr) {
        if (arr[i]) {
          if (hash[arr[i]]) {
            return true
          }
          hash[arr[i]] = true
        }
      }
      return false
    },
    getXxidByName (mc) {
      return { id: this.allxxData.find(m => m.xxmc == mc).xxid, name: mc }
    },
    beforeStep () {
      this.$router.go(-1)
    },
    // removeStorageImage () {
    //   try {
    //     let zls = sessionInfo.fetch('selectLxs')[0].zls
    //     zls.forEach(zl => {
    //       localStorage.removeItem(`ImagesKey${zl.id}`)
    //     })
    //   } catch (error) { }
    // },
    nextStep () {
      //检查数据
      if (this.ssxq == '第一学区') {
        let arr = [
          this.zytbData.zyxx1,
          this.zytbData.zyxx2,
          this.zytbData.zyxx3,
          this.zytbData.zyxx4,
          this.zytbData.zyxx5
        ]
        if (this.isRepeat(arr)) {
          this.changtoast('不能填报相同的学校', 'error')
          return
        }
      }
      // 调剂志愿
      if (this.zytbData.sffctj == '是' && this.selectState == 'HJ') {
        if (!this.zytbData.tjdyzy) {
          this.changtoast('调剂学区不能为空', 'error')
          return
        }
        let arr = [this.zytbData.tjdyzy, this.zytbData.tjdezy]
        if (this.isRepeat(arr)) {
          this.changtoast('不能填报相同的调剂学区', 'error')
          return
        }
      }
      // 志愿填报提交时的代码
      // 幼儿信息数据
      let xxData = getYrbmData(this.bmid)
      // 家长信息数据
      let jzData = getYrjzData(this.bmid)
      // 上传的资料数据
      let zlData = sessionInfo.fetch('zlData')
      let data = Object.assign({}, jzData, this.zytbData, xxData)
      data.rxlx = zlData.rxlx
      data.zls = zlData.zls || []
      // 不是户籍生服从调剂为空
      if (this.selectState !== 'HJ') {
        data.sffctj = ''
      }
      //志愿数据
      if (this.selectState == 'HJ' && this.ssxq == '第一学区') {
        if (!this.checkExtraData('zyxx')) {
          return
        }
        data.zyxx1 = this.getXxidByName(this.zytbData.zyxx1)
        this.zytbData.zyxx2 &&
          (data.zyxx2 = this.getXxidByName(this.zytbData.zyxx2))
        this.zytbData.zyxx3 &&
          (data.zyxx3 = this.getXxidByName(this.zytbData.zyxx3))
        this.zytbData.zyxx4 &&
          (data.zyxx4 = this.getXxidByName(this.zytbData.zyxx4))
        this.zytbData.zyxx5 &&
          (data.zyxx5 = this.getXxidByName(this.zytbData.zyxx5))
        data.sffctj = this.zytbData.sffctj
      } else {
        this.zytbData.bmxx = this.xqxxData[0]
        data.zyxx1 = this.getXxidByName(this.zytbData.bmxx)
      }
      //多胞胎参数
      if (this.$route.query.fzbh) {
        data.fzbh = this.$route.query.fzbh
      }
      // this.$dialog
      //   .confirm({
      //     title: '温馨提示',
      //     message: '是否确认现在提交报名？点击确认提交前可在19日上午9:00时网上报名截止前修改报名信息，一旦确认提交不得修改报名信息！'
      //   })
      //   .then(() => {
      // update_v1
      sessionInfo.save('submitData', data)
      // this.removeStorageImage()
      this.$router.push('/yrytjbm' + window.location.search)
      // update end

      // this.loading()
      // this.$post('ybm/api/yeyBm', data).then(rps => {
      //   this.closeLoading()
      //   if (rps.data.success) {
      //     this.removeStorageImage()
      //     this.changtoast('提交成功', 'sccuess')
      //     let bmid = this.bmid ? this.bmid : ''
      //     clearYrbmData(bmid)
      //     this.$router.replace('/yryzgcx')
      //   } else {
      //     this.changtoast(rps.data.message, 'error')
      //   }
      // })
      // })
      // .catch(() => {
      //   return
      // })
    },
    change (item) {
      if (item == '否') {
        this.zytbData.tjdyzy = ''
        this.zytbData.tjdezy = ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import './style/yryzytb.scss';
</style>
