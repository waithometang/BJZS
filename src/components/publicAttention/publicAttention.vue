<template>
  <div class="publicAttention">
    <div class="attention-maike"></div>
    <div class="attention-content">
      <div class="clos" @click="clos">
        <img src="/static/ybmimages/close.png" alt="" />
      </div>
      <div class="headIcon"><img src="/static/ybmimages/gm.png" alt="" /></div>
      <div class="name">北滘</div>
      <div class="title">长按下方二维码关注北滘公众号，获取权限</div>
      <div class="icon"><img src="/static/ybmimages/gmt-url.jpg" alt="" /></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clos () {
      this.$emit('setState')
    }
  }
}
</script>