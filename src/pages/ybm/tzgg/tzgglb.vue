<template>
  <div class="zxdt">
    <div class="head-icon"></div>
    <div class="head-search">
      <div class="head-search-left"><input type="text" placeholder="请输入搜索内容" v-model="search"></div>
      <div class="head-search-right" @click="clickSearch"><i></i></div>
    </div>
    <div class="information">
      <van-list v-model="listState" :finished="finished" finished-text="没有更多了" @load="onLoad" >
        <div class="information-list">
          <div class="information-tab" v-for="(item, index) in publishData" :key="index" @click="lookOver(item)">
            <div class="tab-head">{{item.title}}</div>
            <div class="tab-base">
              <div class="base-time">
                <div class="time-icon"></div>
                {{item.publishTime}}
              </div>
              <div class="base-tab">
                <div class="tab-icon"></div>
                {{item.readedCount || 0}}
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { tzgglistzs } from '@/api/publicApi';

export default {
  data () {
    return {
      publishData: '',
      listState: false,
      finished: false,
      pageIndex: 1,
      pageSize: 10,
      search: ''
    }
  },
  created () {
    this.getData()
  },
  methods: {
    lookOver (item) {
      if (item.linkage) {
        window.location = item.linkage
      } else {
      this.$router.push(`/tzggxq/${item.id}`)
      }
    },
    onLoad () {
      if (!this.finished) {
        this.getData()
      }
    },
    clickSearch () {
      this.pageIndex = 1
      this.getData()
    },
    getData () {
      this.loading()
      tzgglistzs ({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        search: this.search
      }).then (rps => {
        this.listState = false
        this.closeLoading()
        if(rps.data.success) {
          if (this.pageIndex === 1) {
            this.publishData = rps.data.content
            if (rps.data.content.length < 10) {
              this.finished = true
            } else {
              this.pageSize++
            }
          } else {
            this.publishData = this.publishData.concat(rps.data.content)
            if (rps.data.content.length < 10) {
              this.finished = true
            } else {
              this.pageSize++
            }
          }
        } else {
          this.changtoast(rps.data.message)
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import './style/tzgglb.scss';
</style>