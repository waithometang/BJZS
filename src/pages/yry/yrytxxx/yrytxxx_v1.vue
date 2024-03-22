<template>
  <div class="yrytxxx" v-if="show">
    <div class="head">
      <publicProgressBar
        v-if="!isView"
        :state="isView ? 1 : 0"
        :tagData="tagData"
      />
      <div v-else class="public-classify-tab">
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
    <div class="middle">
      <div class="middle-title">幼儿信息</div>
      <div class="middle-input">
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.xm"
          :val="xsData.xm"
          :name="'幼儿姓名'"
          :placeholder="'输入幼儿姓名'"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.zjlx"
          :val="xsData.zjlx"
          :name="'证件类型'"
          :placeholder="'选择幼儿证件类型'"
          :selectType="'select'"
          :column="zjlxData"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.sfzhm"
          :val="xsData.sfzhm"
          :name="'证件号'"
          :placeholder="'输入幼儿证件号'"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.mz"
          :val="xsData.mz"
          :name="'幼儿民族'"
          :placeholder="'选择幼儿所属民族'"
          :selectType="'select'"
          :column="mzData"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.sex"
          :val="xsData.sex"
          :name="'幼儿性别'"
          :placeholder="'选择幼儿性别'"
          :selectType="'select'"
          :column="sexData"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.birth"
          :val="xsData.birth"
          :name="'出生日期'"
          :placeholder="'选择幼儿出生年月'"
          :selectType="'date'"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.hjlx"
          :val="xsData.hjlx"
          :name="'现户籍所属居委'"
          :placeholder="'选择现户籍所属居委'"
          :selectType="'select'"
          :column="hjData"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.ssxq"
          :val="xsData.ssxq"
          :name="'所属学区'"
          :placeholder="'选择所属学区'"
          :selectType="'select'"
          :column="hjData"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.xqsj"
          :val="xsData.xqsj"
          :name="'迁入本学区时间'"
          :placeholder="'选择迁入时间'"
          :selectType="'date'"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.xjdz"
          :val="xsData.xjdz"
          :name="'现居住地'"
          :placeholder="'输入幼儿现居住地'"
          :selectType="'site'"
        />
        <public-Input-Select
          :readonly="isView"
          v-model="xsData.hjdz"
          :val="xsData.hjdz"
          :name="'户籍地址'"
          :placeholder="'输入幼儿户籍地址'"
          :selectType="'site'"
        />
      </div>
    </div>
    <div class="base" v-if="!isView">
      <div class="base-tab">
        <div class="public-long-but" @click="beforeStep">上一页</div>
      </div>
      <div class="base-tab">
        <div class="public-long-but" @click="nextStep">下一页</div>
      </div>
    </div>
    <div class="base" v-else-if="jg == 2">
      <div class="base-tab width">
        <div class="public-long-but" @click="compile">点击重新编写资料</div>
      </div>
    </div>
    <div class="base" v-else-if="jg == 1">
      <div class="base-tab">
        <div class="public-long-but" @click="gotoIndex">点击返回首页</div>
      </div>
      <div class="base-tab">
        <div class="public-long-but" @click="modified">点击修改资料</div>
      </div>
    </div>
    <div class="base" v-else-if="jg == 3">
      <div class="base-tab width">
        <div class="public-long-but" @click="gotoIndex">点击返回首页</div>
      </div>
    </div>
  </div>
</template>

<script>
import publicProgressBar from '@/components/publicProgressBar/publicProgressBar'
import publicUploadPictures from '@/components/publicUploadPictures/publicUploadPictures'
import { MzOption, yeyCheck, YeyBmxx } from '@/api/publicApi'
import { getYrbmData, setYrbmData } from '@/js/studentUtil'
export default {
  components: {
    publicProgressBar,
    publicUploadPictures
  },
  computed: {
    bmid() {
      return this.$route.params.bmid
    },
    isView() {
      //查看模式，不能修改
      return this.$route.query.m === 'v'
    },
    jg() {
      return this.$route.query.jg
    }
  },
  data() {
    return {
      show: false,
      mzData: [],
      picturesData: [
        { id: 1, title: '', name: '', model: '' },
        { id: 2, title: '', model: '' },
        { id: 3, title: '', model: '' }
      ],
      sexData: ['男', '女'],
      rylxData: ['幼儿类型1', '幼儿类型2'],
      hjData: [
        '高明区荷城街道户籍',
        '高明区杨和镇户籍',
        '高明区明城镇户籍',
        '高明区更合镇户籍',
        '高明区外户籍'
      ],
      zjlxData: ['身份证', '港澳居民居住证', '护照'],
      gxData: ['父亲', '母亲', '爷爷', '奶奶', '外公', '外婆', '监护人'],
      selectType: 1,
      WaChatConfigData: {},
      xsData: {
        mz: '',
        yrlx: '',
        zjlx: '身份证',
        sex: '',
        xm: '',
        birth: '',
        hjlx: '',
        ssxq: '',
        xqsj: '',
        hkb: '',
        jkzm: '',
        myzm: ''
      },
      tagData: ['入学报名', '资格审查', '入户排序', '录取确认', '学籍注册'],
      listData: [
        { name: '基本信息', state: 1 },
        { name: '证明材料', state: 2 },
        { name: '进度结果', state: 3 }
      ],
      tabState: 1
    }
  },
  inject: ['reload'],
  methods: {
    changeTab(item) {
      if (item.state == 2) {
        this.$router.push('/yrybtg' + window.location.search)
      } else if (item.state == 3) {
        this.$router.push('/yryzgcxxq' + window.location.search)
      } else if (item.state == 1) {
        this.$router.push('/yrytxxx' + window.location.search)
      }
      // this.$nextTick(()=>{this.setData()})
    },
    beforeStep() {
      this.$router.go(-1)
    },
    compile(item) {
      let bmids = this.$route.query.bmid
      this.$router.replace('/yrytxxx/' + bmids)
      this.reload()
    },
    nextStep() {
      if (this.isView) {
        this.$router.push('/yryxzlx' + window.location.search)
        return
      }
      this.loading()
      yeyCheck(this.xsData).then(rps => {
        this.closeLoading()
        if (rps.data.success) {
          setYrbmData(this.xsData)
          let bmidParam = this.bmid ? '/' + this.bmid : ''
          this.$router.push('/yryxzlx' + bmidParam + window.location.search)
        } else {
          if (rps.data.message === '每个身份证只能报一次名') {
            this.$MessageBox({ type: 'message' })
          } else {
            this.changtoast(rps.data.message)
          }
        }
      })
    },
    getMzOption() {
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
    gotoIndex() {
      this.$router.push('/yrybm')
    },
    modified() {
      this.$router.push(`/yrytxxx/${this.$route.query.bmid}?m=e`)
      this.reload()
    }
  },
  created() {
    this.getMzOption()
    let that = this
    if (this.bmid) {
      YeyBmxx(this.bmid, false).then(rps => {
        this.show = true
        if (rps.data.success) {
          this.xsData = rps.data.content
          this.xsData.bmid = this.bmid
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    } else if (this.$route.query.bmid) {
      YeyBmxx(this.$route.query.bmid, true).then(rps => {
        this.show = true
        if (rps.data.success) {
          this.xsData = rps.data.content
          // this.xsData.sfdbt=true
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    } else {
      this.show = true
      let data = getYrbmData()
      if (data) {
        this.xsData = data
      }
      if (this.$route.query.fzbh) {
        this.xsData.fzbh = this.$route.query.fzbh
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import './style/yrytxxx.scss';
</style>