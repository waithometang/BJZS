<template>
  <div class="ydxz">
    <div class="head">
      <publicProgressBar />
    </div>
    <div class="interval"></div>
    <div class="content">
      <div class="content-title">
        <div class="title-tab" v-html="content"></div>
        <div class="content-base-but" @click="selelctType"><div class="public-long-but">已详细阅读细则</div></div>
      </div>
    </div>
  </div>
</template>

<script>
import publicProgressBar from '@/components/publicProgressBar/publicProgressBar';
import { GetYdxz } from "@/api/publicApi";
import { WaChatrequireConfig } from "@/js/WaChatrequireConfig";
export default {
  data () {
    return {
      content: ''
    }
  },
  components: {
    publicProgressBar
  },
  computed: {
    type () {
      return this.$route.params.type
    }
  },
  methods: {
    selelctType () {
      this.$router.push(`/txxx/${this.type}`)
    }
  },
  created () {
    GetYdxz(this.type-1).then(rps => {
      if (rps.data.success) {
        this.content = rps.data.content.content
      } else {
        this.changtoast(rps.data.message)
      }
    })
  }
}
</script>

<style lang='scss' scoped>
@import './style/ydxz.scss';
</style>