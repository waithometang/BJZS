<template>
  <div class="xzlx">
    <div class="head">
      <publicProgressBar :tagData="tagData" />
    </div>
    <div class="middle">
      <div class="middle-title">请选择入学类型</div>
      <div class="type-list">
        <div
          class="list-tab"
          :class="{ 'list-tab-action': selectIndex === rxlb.dh }"
          v-for="(rxlb, index) in rxlbs"
          :key="index"
          @click="select(rxlb)"
        >
          <span>{{ rxlb.desc }}</span
          >&emsp;({{ rxlb.bz }})
        </div>
      </div>
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
import { getYrbmData, sessionInfo } from '@/js/studentUtil'
import { RxlxInfo } from '@/api/publicApi'

export default {
  name: '',
  components: {
    publicProgressBar
  },
  props: {},
  data() {
    return {
      xq: '', // 第几学区
      tagData: ['入学报名', '资格审查', '入户排序', '录取确认', '学籍注册'],
      rxlbs: [], // 入学类别
      selectIndex: '' // 选择的下标
    }
  },
  computed: {
    bmid() {
      return this.$route.query.bmid
    }
  },
  watch: {},
  created() {
    this.loading()
    // 获取学区
    let xxData = getYrbmData(this.bmid)
    this.xq = xxData.ssxq
    // 根据学区获取不同政策
    let p1 = RxlxInfo({
      xxlx: 2,
      ssxq: this.xq
    })
    let p2 = this.$post('ybm/api/GetZsxqXx', { name: this.xq })

    Promise.all([p1, p2]).then(res => {
      this.closeLoading()
      let rps = res[0]
      let _rxlbs
      if (rps.data.success) {
        _rxlbs = rps.data.content
        // _rxlbs = rps.data.content.filter(
        //   // m => m.dh == 'HJ' || m.ssjwh == xxData.hjszjwh
        //   m => m.dh == 'HJ' || m.dh.indexOf('YD') > -1
        // )
      } else {
        this.changtoast(rps.data.message)
        return
      }
      rps = res[1]
      if (rps.data.success) {
        try {
          let desc = '具有' + rps.data.content + '户籍的适龄儿童'
          let rxlb = _rxlbs.find(m => m.dh == 'HJ')
          rxlb.bz = desc
          rxlb.lxs[0].desc = desc
          this.rxlbs = _rxlbs
          if (this.bmid) {
            this.select(_rxlbs.find(m => m.id == xxData.rxlx))
          }
        } catch (error) {
          this.rxlbs = _rxlbs
        }
      } else {
        this.changtoast(rps.data.message)
      }
    })
  },
  mounted() {
    let data = sessionInfo.fetch('selectState')
    if (data) {
      this.selectIndex = data
    }
  },
  methods: {
    // 上一步
    beforeStep() {
      this.$router.go(-1)
    },
    // 下一步
    nextStep() {
      if (!this.selectIndex) {
        this.changtoast('请选择入学类型')
        return
      }
      this.$router.push('/yryzlsc' + window.location.search)
    },
    // 选择类型
    select(i) {
      console.log(i)
      this.selectIndex = i.dh
      sessionInfo.save('selectLxs', i.lxs)
      sessionInfo.save('selectState', i.dh)
      sessionInfo.save('selectName', i.desc)
      sessionInfo.save('selectBz', i.bz)
    }
  }
}
</script>

<style scoped lang="scss">
@import './style/yryxzlx.scss';
</style>
