<template>
  <div class="xzlx">
    <div class="head">
      <publicProgressBar :tagData="tagData" />
    </div>
    <div class="middle" v-if="isShow">
      <div class="middle-title">请选择入学类型</div>
      <div class="type-list">
        <template v-if="rxlbs.length > 0">
          <div
            class="list-tab"
            :class="{ 'list-tab-action': selectIndex === rxlb.dh }"
            v-for="(rxlb, index) in rxlbs"
            :key="index"
            @click="select(rxlb)"
          >
            <span>{{ rxlb.desc }}</span
            >：{{ rxlb.bz }}
          </div>
        </template>
        <div
          class="list-tab"
          @click="showYD"
          :class="{ 'list-tab-action': selectIndex && selectIndex != 'HJ' }"
        >
          <span>优待类儿童</span>：北滘居委股东子女、三洪奇居委会股东子女
        </div>
      </div>
    </div>
    <div class="middle" v-else>
      <div class="middle-title">请选择优待类型</div>
      <div class="type-list">
        <div
          class="list-tab"
          :class="{ 'list-tab-action': selectIndex === rxlb.dh }"
          v-for="(rxlb, index) in ydlbs"
          :key="index"
          @click="select(rxlb)"
        >
          <span>{{ rxlb.desc }}</span
          >：<span v-html="rxlb.bz"></span>
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
import { Loading } from 'vant'

export default {
  name: '',
  components: {
    publicProgressBar
  },
  props: {},
  data () {
    return {
      isShow: true, // 入学类型显示
      tagData: ['入学报名', '资格审查', '入户排序', '录取确认', '学籍注册'],
      // 户籍生
      rxlbs: [],
      // 优待生
      ydlbs: [],
      selectIndex: '' // 选择的下标
    }
  },
  computed: {
    bmid () {
      return this.$route.query.bmid
    }
  },
  watch: {},
  created () {
    // update_v1
    this.loading()
    RxlxInfo({
      xxlx: 2
    })
      .then(res => {
        this.closeLoading()
        if (res.data.success) {
          const rxlxInfoData = res.data.content
          this.rxlbs.push(rxlxInfoData[0])
          this.ydlbs = rxlxInfoData.slice(1)
          // // 放在这里防止数据还没拿到会出现报错 dh
          if (this.bmid) {
            let rxlx = sessionInfo.fetch('rxlx')
            let resArray = [...this.rxlbs, ...this.ydlbs]
            this.select(resArray.find(m => m.id == rxlx))
          }
        } else {
          this.closeLoading()
          this.changtoast(res.data.message)
        }
      })
      .catch(err => {
        this.closeLoading()
        console.log(err)
      })
    // update_v1 end
  },
  mounted () {
    let data = sessionInfo.fetch('selectState')
    if (data) {
      this.selectIndex = data
    }
  },
  methods: {
    // 上一步
    beforeStep () {
      if (this.isShow) {
        this.$router.go(-1)
      } else {
        this.isShow = true
      }
    },
    // 下一步
    nextStep () {
      if (!this.selectIndex) {
        this.changtoast('请选择入学类型')
        return
      }
      this.$router.push('/yryzlsc' + window.location.search)
    },
    // 选择类型
    select (i) {
      console.log(i)
      this.selectIndex = i.dh
      sessionInfo.save('selectLxs', i.lxs)
      sessionInfo.save('selectState', i.dh)
      sessionInfo.save('selectName', i.desc)
      sessionInfo.save('selectBz', i.bz)
    },
    showYD () {
      this.isShow = false
    }
  }
}
</script>

<style scoped lang="scss">
@import './style/yryxzlx.scss';
</style>
