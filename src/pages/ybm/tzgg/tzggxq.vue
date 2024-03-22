<template>
  <div
    class="NotificationParticularss"
    :class="{ 'NotificationParticularss-action': listData.kydz }"
  >
    <div class="content-list">
      <div class="head">
        <div class="title">{{ listData.title }}</div>
        <div class="head-list">
          <!-- <div class="list-tab">
            <img id="GMT_min_icon" src="/images/img_12.png" alt="">
            {{listData.fbr}}
          </div> -->
          <div class="list-tab">
            <img id="GMT_min_icon" src="/static/ybmimages/time.png" alt="" />
            {{ listData.publishTime }}
          </div>
          <div class="list-tab">
            <img id="GMT_min_icon" src="/static/ybmimages/eye.png" alt="" />
            {{ listData.readedCount }} 阅读
          </div>
        </div>
      </div>
      <div class="content" v-html="listData.content" id="listDataContent"></div>
      <div
        class="images-list"
        v-if="listData.contentType == 1 && listData.imgUrls"
      >
        <div
          class="images-list-tab"
          v-for="(item, index) in listData.imgUrls"
          :key="index"
          @click="loveImages(item, listData.imgUrls)"
        >
          <img id="GMT_min_icon" class="images-tab" :src="item" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { tzggxxzs } from '@/api/publicApi'

export default {
  data() {
    return {
      listData: ''
    }
  },
  created() {
    this.getlistData()
  },
  methods: {
    getlistData() {
      tzggxxzs({
        id: this.$route.params.id
      }).then(rps => {
        if (rps.data.success) {
          this.listData = rps.data.content
        } else {
          this.changtoast(rps.data.message)
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import './style/tzggxq.scss';
</style>