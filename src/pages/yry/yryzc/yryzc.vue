<template>
  <div class="yryzc">
    <div class="zc-tag" v-for="(item, index) in selectLxs" :key="index" @click="setDesc(item)">
      <i :class="{'icon': state === item.id}"><img v-if="state === item.id" src="/static/ybmimages/gou.png" alt=""></i>
      <p>{{item.desc}}</p>
    </div>
  </div>
</template>

<script>
import { sessionInfo } from '@/js/studentUtil';
export default {
  data () {
    return {
      state: '',  
    }
  },
  computed: {
    bmid(){
      return this.$route.params.bmid
    },
    selectLxs () {
      return sessionInfo.fetch('selectLxs')
    },
  },
  methods: {
    setDesc (item) {
      this.state = item.id
      sessionInfo.save('selectZc', item)
      let bmidParam=this.bmid?('/'+this.bmid):''
      this.$router.replace('/yrysczl'+bmidParam)
    }
  }
}
</script>

<style lang='scss' scoped>
@import './style/yryzc.scss';
</style>