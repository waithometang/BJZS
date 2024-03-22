<template>
  <div class="bmxq">
    <div class="public-classify-tab">
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
    <div class="bd-line"></div>
    <div class="middle">
      <jbxx-com v-if="tabState === 1" :bmid="bmid" :jg="jg" />
      <zmcl-com v-if="tabState === 2" :bmid="bmid" />
      <jdjg-com v-if="tabState === 3" :bmid="bmid" />
    </div>
    <div class="footer" v-if="tabState !== 1">
      <div class="public-long-but" @click="gotoIndex">点击返回首页</div>
    </div>
    <!-- <div class="footer">
      <div class="public-long-but" @click="gotoIndex">点击返回首页</div>
    </div> -->
  </div>
</template>

<script>
import JbxxCom from './components/JbxxCom'
import ZmclCom from './components/ZmclCom'
import JdjgCom from './components/JdjgCom'
export default {
  name: '',
  components: {
    JbxxCom,
    ZmclCom,
    JdjgCom
  },
  props: {},
  data () {
    return {
      listData: [
        { name: '基本信息', state: 1 },
        { name: '证明材料', state: 2 },
        { name: '进度结果', state: 3 }
      ],
      tabState: 1
    }
  },
  computed: {
    bmid () {
      return this.$route.params.id
    },
    jg () {
      return this.$route.query.jg
    }
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {
    changeTab (item) {
      this.tabState = item.state
    },
    gotoIndex () {
      this.$router.push('/bm')
    }
  }
}
</script>

<style scoped lang="scss">
@import './style/index.scss';
</style>
