<template>
  <div class="zmcl">
    <div class="middle">
      <div class="title">入学类型</div>
      <div class="tips">{{ rxlx.desc }}</div>
      <div class="title">填写家长信息</div>
      <div class="base-tab bd-none">家长（第一联系人）：</div>
      <div class="base-tab">
        家长姓名：<span>{{ zmclData.jz1_xm }}</span>
      </div>
      <div class="base-tab">
        与幼儿关系: <span>{{ zmclData.jz1_gx }}</span>
      </div>
      <div class="base-tab">
        家长证件类型： <span>{{ zmclData.jz1_zjlx }}</span>
      </div>
      <div class="base-tab">
        家长证件号：<span>{{ zmclData.jz1_zjhm }}</span>
      </div>
      <div class="base-tab">
        家长联系电话：<span>{{ zmclData.jz1_lxdh }}</span>
      </div>
      <div class="base-tab bd-none">家长（第二联系人）：</div>
      <div class="base-tab">
        家长姓名：<span>{{ zmclData.jz2_xm }}</span>
      </div>
      <div class="base-tab">
        与幼儿关系: <span>{{ zmclData.jz2_gx }}</span>
      </div>
      <div class="base-tab">
        家长证件类型：<span>{{ zmclData.jz2_zjlx }}</span>
      </div>
      <div class="base-tab">
        家长证件号：<span>{{ zmclData.jz2_zjhm }}</span>
      </div>
      <div class="base-tab">
        家长联系电话：<span>{{ zmclData.jz2_lxdh }}</span>
      </div>
    </div>
    <div class="bd-line"></div>

    <div class="module">
      <div class="title">资料照片</div>
      <div class="list" v-for="(item, index) in zmclData.zls" :key="index">
        <div class="desc">{{ item.desc }}</div>
        <div class="check">
          <div class="state">
            <!-- 结果：{{ item.scjg ? item.scjg : '(暂无结果通知)' }} -->
            结果：<span v-if="sczt === '待审查'">(暂无结果通知)</span>
            <span v-else :class="{ not: item.scjg === '不通过' }">{{
              item.scjg
            }}</span>
            <br />
          </div>
          <div class="time">
            <!-- 审核时间：{{ item.scsj ? item.scsj : '(暂无结果通知)' }} -->
            审核时间：<span v-if="sczt === '待审查'">(暂无结果通知)</span>
            <span v-else>{{ item.scsj }}</span>
          </div>
        </div>
        <div v-if="sczt !== '待审查'" class="scsm">{{ item.scsm }}</div>
        <div class="pics">
          <div class="pic-item" v-for="(val, key) in item.urls" :key="key">
            <img :src="val" alt="" @click="getimg(item.urls, key)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { YeyYbmzl } from '@/api/publicApi'
import { ImagePreview } from 'vant'
import { sessionInfo } from '@/js/studentUtil'

export default {
  name: '',
  components: {},
  props: {
    bmid: {
      type: String
    }
  },
  data () {
    return {
      zmclData: {},
      // 入学类型
      rxlx: {},
      rxlxData: [
        {
          id: 1,
          // desc: '户籍生(具有北滘镇户籍的适龄儿童)'
          desc: '年满3周岁，即2017年9月1日（含）~2018年8月31日（含） 期间出生，身心健康、适宜集体生活，具有北滘居委会、君兰居委会、顺江居委会、设计城居委会、三洪奇居委会、碧桂园居委会的户籍适龄儿童'
        },
        {
          id: 2,
          // desc: '优待类儿童(北滘居委会股东子女雅正幼儿园非统筹班)'
          desc: '北滘居委会股东子女(雅正幼儿园优先录取)'
        },
        {
          id: 3,
          // desc: '优待类儿童(三洪奇居委会股东子女非统筹学位)'
          desc: '三洪奇居委会股东子女(第三幼儿园优先录取)'
        },
        // {
        //   id: 4,
        //   desc: '优待类儿童(具有三洪奇居委会户籍的适龄儿童)'
        // }
      ],
      sczt: ''
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loading()
    YeyYbmzl({
      id: this.bmid
    }).then(rps => {
      this.closeLoading()
      console.log(rps.data.content)
      if (rps.data.success) {
        this.zmclData = rps.data.content
      } else {
        this.changtoast(rps.data.message)
      }
    })
    let rxlx = sessionInfo.fetch('rxlx')
    this.rxlx = this.rxlxData.find(m => m.id == rxlx)
    this.sczt = sessionInfo.fetch('sczt')
  },
  mounted () { },
  methods: {
    getimg (item, index) {
      ImagePreview({
        images: item,
        showIndex: true,
        loop: false,
        startPosition: index,
        closeOnPopstate: true
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../style/zmcl.scss';
</style>
