<template>
  <div class="publicProgressBar">
    <div class="icon-content content-padding">
      <div
        class="progress-bar-tab"
        v-for="(item, index) in tagData.length"
        :key="index"
      >
        <div class="tab-head">
          <div
            class="tab-head-icon"
            :class="{ 'tab-head-icon-action': state >= index }"
          >
            {{ item }}
          </div>
          <div class="tab-head-bar"></div>
        </div>
      </div>
    </div>
    <div class="icon-content">
      <div
        class="progress-bar-tab"
        v-for="(item, index) in listData"
        :key="index"
      >
        <div class="tab-base" :class="{ 'tab-base-action': state >= index }">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    state: {
      default: 0
    },
    tagData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      listData: []
    }
  },
  created() {
    if (this.tagData.length > 0) {
      this.listData = this.tagData
    }
  }
}
</script>