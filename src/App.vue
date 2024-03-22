<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
    <div class="publicLoading" v-if="this.$store.state.publicLoading"></div>
    <!-- <publicAttention v-if="$store.state.attentionState" @setState="getYhxx"/> -->
    <!-- <lg-preview></lg-preview> -->
  </div>
</template>

<script>
import { WaChatrequireConfig } from "@/js/WaChatrequireConfig";
import { storage, session_Storage } from "@/js/until";
// import { yhxx } from '@/api/publicApi';
import publicAttention from '@/components/publicAttention/publicAttention';

export default {
  name: 'App',
  components: {
    publicAttention
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  mounted () {
    let that = this
    this.$nextTick(() => {
      setTimeout(() => {
        let u = navigator.userAgent
        if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
          WaChatrequireConfig()
        }
      }, 1000)
    })
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
    // getYhxx () {
    //   yhxx().then(res => {
    //     if (res.data.success) {
    //       // if (!res.data.content.sfytxz) {
    //       //   window.location.href='/txewm'
    //       //   return
    //       // } 
    //       if (!res.data.content.sfgz) {
    //         this.$store.commit('SetAttentionState', true)
    //       } else {
    //         this.$store.commit('SetAttentionState', false)
    //       }
    //     } else {
    //       this.changtoast(res.data.message)
    //     }
    //   })
    // }
  },
  created () {
    // this.getYhxx()
  }
}
</script>
