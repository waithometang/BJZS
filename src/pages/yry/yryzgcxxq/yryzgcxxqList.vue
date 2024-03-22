<template>
  <div class="yryzgcxxqList">
    <div class="title">我的报名</div>
    <div class="succeed">
      <div class="succeedContent" @click="next" v-for="item in 2" :key="item">
        <div class="contentHead">
          <div class="HeadImg">
            <img src="/static/ybmimages/touxiang.png" />
          </div>
          <div class="HeadName">
            <span>张思凯</span>
          </div>
          <div class="Headsex">
            <span>女(多胞胎)</span>
          </div>
          <div class="HeadType">
            <span>(户籍就读)</span>
          </div>
        </div>
        <div class="contentItem">报名号:8465431</div>
        <div class="contentItem">报名学校:区机关幼儿园</div>
        <div class="contentItem">阶段:第一阶段</div>
        <div class="contentItem">录取学校</div>
        <div class="contentItem time"><img src="/static/ybmimages/time.png"/>2019-12-14<div class="right">资格审查中 ></div></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods:{
    next(){
      this.$router.push("/yryzgcxxq")
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./style/yryzgcxxqList.scss"
</style>