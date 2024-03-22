<template>
  <div class="index">
    <div class="head">
      <div class="icon"><img src="/static/ybmimages/banner.png" alt="" /></div>
      <div class="yrybm" @click="setApplyType">
        <div class="left-img">
          <img src="/static/ybmimages/youeryuan.png" alt="" />
        </div>
        <div class="middle-content">
          <div class="title">幼儿园报名</div>
          <div class="detail">2021年北滘镇公办幼儿园小班招生报名入口</div>
        </div>
        <div class="right-arrow">
          <img src="/static/ybmimages/right-arrow.png" alt="" />
        </div>
      </div>
    </div>
    <!-- <div class="line-bd"></div>
    <div class="inform">
      <div class="inform-icon" @click="examineList">
        <img src="/static/ybmimages/tzgg.png" alt="" />
      </div>
      <div class="inform-content">
        <van-swipe
          style="height: 50px"
          :autoplay="3000"
          :show-indicators="false"
          vertical
        >
          <van-swipe-item v-for="(item, index) in tzggData" :key="index">
            <div class="inform-content-tab" @click="clickTzgg(item)">
              <div class="inform-head">{{ item.title }}</div>
              <div class="inform-base">
                <div class="infrom-base-tab">{{ item.fbr }}</div>
                <div class="infrom-base-tab">发布时间:{{ item.fbsj }}</div>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div> -->
    <div class="line"></div>
    <div class="procedure">
      <div class="procedure-name">招生报名步骤<span>提前知</span></div>
      <div class="procedure-list">
        <div class="bar" v-for="(item, index) in listData" :key="index">
          <div class="icon-name">
            <div class="icon"><img :src="item.icon" alt="" /></div>
            <div class="name">{{ item.name }}</div>
          </div>
          <div class="procedure-bar" v-if="index != listData.length - 1">
            <div class="bar-icon">
              <img src="/static/ybmimages/jiantou_2.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="information">
      <div class="information-title">
        <div class="title-icon">招生信息发布</div>
        <div class="title-more" @click="viewMore">
          更多
          <div class="more-icon"></div>
        </div>
      </div>
      <div class="information-list">
        <div
          class="information-tab"
          v-for="(item, index) in publishData"
          :key="index"
          @click="lookOver(item)"
        >
          <div class="tab-head">{{ item.title }}</div>
          <div class="tab-base">
            <div class="base-time">
              <div class="time-icon"></div>
              {{ item.publishTime }}
            </div>
            <div class="base-time">
              <div class="read-count"></div>
              {{ item.readCount }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetPulishList, sytzggzs } from '@/api/publicApi'

export default {
  data () {
    return {
      listData: [
        { name: '入学报名', icon: '/static/ybmimages/yryzgcx_01.png' },
        { name: '志愿填报', icon: '/static/ybmimages/yryzgcx_02.png' },
        { name: '资料审核', icon: '/static/ybmimages/yryzgcx_03.png' },
        { name: '入户排序', icon: '/static/ybmimages/yryzgcx_04.png' },
        { name: '录取公布', icon: '/static/ybmimages/yryzgcx_05.png' },
        { name: '学位确认', icon: '/static/ybmimages/yryzgcx_06.png' },
        { name: '学籍注册', icon: '/static/ybmimages/yryzgcx_07.png' }
      ],
      // publishData: '',
      // 测试数据
      publishData: [
        // {
        //   id: 1,
        //   title:
        //     '北滘镇2021年公办幼儿园小班招生方案官方公告来啦！哪几所公办小学招生？什么时候开始报名？',
        //   publishTime: '2020-01-05',
        //   readCount: 201
        // },
        // {
        //   id: 2,
        //   title: '2021佛山公办幼儿园招生要来了！学位或比往年更紧张！',
        //   publishTime: '2020-12-18',
        //   readCount: 12
        // }
      ],
      tzggData: ''
    }
  },
  created () {
    this.getData()
  },
  methods: {
    setApplyType () {
      this.$router.push(`/bm`)
    },
    lookOver (item) {
      if (item.linkage) {
        window.location = item.linkage
      } else {
        this.$router.push(`/fbxq/${item.id}`)
      }
    },
    clickTzgg (item) {
      if (item.linkage) {
        window.location = item.linkage
      } else {
        this.$router.push(`/tzggxq/${item.id}`)
      }
    },
    examineList () {
      this.$router.push('/tzgglb')
    },
    getData () {
      this.loading()
      GetPulishList({
        mkid: 8,
        fblxId: 44,
        pageSize: 3
      }).then(rps => {
        this.closeLoading()
        if (rps.data.success) {
          this.publishData = rps.data.content // 先注释，测试假数据
        } else {
          this.changtoast(rps.data.message)
        }
      })
      sytzggzs().then(rps => {
        this.closeLoading()
        if (rps.data.success) {
          this.tzggData = rps.data.content
        } else {
          this.changtoast(rps.data.message)
        }
      })
    },
    viewMore () {
      this.$router.push(`/zxdt`)
    }
    // search() {
    //   this.$router.push(`/yrybm`) //yryzgcxxqList
    // }
  }
}
</script>

<style lang='scss' scoped>
@import './style/index.scss';
</style>
