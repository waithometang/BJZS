<template>
  <div class="jbxx">
    <div class="middle">
      <div class="title">幼儿信息</div>
      <div class="base-tab">
        幼儿姓名： <span>{{ jbxxData.xm }}</span>
      </div>
      <div class="base-tab">
        证件类型：<span>{{ jbxxData.zjlx }}</span>
      </div>
      <div class="base-tab">
        证件号：<span>{{ jbxxData.sfzhm }}</span>
      </div>
      <div class="base-tab">
        幼儿民族：<span>{{ jbxxData.mz }}</span>
      </div>
      <div class="base-tab">
        幼儿性别：<span>{{ jbxxData.sex }}</span>
      </div>
      <div class="base-tab">
        出生日期：<span>{{ jbxxData.birth }}</span>
      </div>
      <div class="base-tab">
        现户籍所属居委：<span>{{ jbxxData.hjszjwh }}</span>
      </div>
      <div class="base-tab">
        所属学区：<span>{{ jbxxData.ssxq }}</span>
      </div>
      <div class="base-tab">
        迁入本学区时间：<span>{{ jbxxData.qrbxqsj }}</span>
      </div>
      <div class="base-tab">
        现居住地：<span>{{ jbxxData.xjdz }}</span>
      </div>
      <div class="base-tab">
        户籍地址：<span>{{ jbxxData.hjdz }}</span>
      </div>
    </div>
    <!-- <div class="footer-btn">
      <div class="base" v-if="jg == 2">
        <div class="base-tab width">
          <div class="public-long-but" @click="handleModify" v-if="!isEditShow">
            点击重新编写资料
          </div>
          <div class="public-long-but" @click="handleGoSY" v-else>
            点击返回首页
          </div>
        </div>
      </div>
      <div class="base-btn" v-else-if="jg == 1">
        <div class="tab-btn" @click="handleModify" v-if="!isEditShow">
          点击修改资料
        </div>
        <div
          class="tab-btn"
          @click="handleGoSY"
          :class="{ disBtn: isEditShow }"
        >
          点击返回首页
        </div>
      </div>
      <div class="base" v-else-if="jg == 3 || jg == 0">
        <div class="base-tab width">
          <div class="public-long-but" @click="handleGoSY">点击返回首页</div>
        </div>
      </div>
    </div> -->
    <div class="footer-btn">
      <div class="base" v-if="jg == 2">
        <div class="base-tab">
          <div class="public-long-but" @click="handleModify">
            点击重新编写资料
          </div>
        </div>
        <div class="base-tab">
          <div class="public-long-but" @click="handleGoSY">点击返回首页</div>
        </div>
      </div>
      <div class="public-long-but" v-else @click="handleGoSY">点击返回首页</div>
    </div>
  </div>
</template>

<script>
import { YeyBmxx, CheckBegin } from '@/api/publicApi'
import { sessionInfo } from '@/js/studentUtil'

export default {
  name: '',
  components: {},
  props: {
    bmid: {
      type: String
    },
    jg: {
      type: String
    }
  },
  data () {
    return {
      jbxxData: {},
      // isEditShow: false
      isOver: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loading()
    YeyBmxx(this.bmid, true).then(rps => {
      console.log(rps.data.content)
      this.closeLoading()
      if (rps.data.success) {
        this.jbxxData = rps.data.content
        sessionInfo.save('rxlx', this.jbxxData.rxlx)
      } else {
        this.changtoast(rps.data.message, 'error')
      }
    })
  },
  mounted () {
    CheckBegin(2)
      .then(rps => {
        if (rps.data.success) {
          // this.isEditShow = rps.data.content.isEnd
          this.isOver = rps.data.content.isXgEnd
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    handleModify () {
      if (this.isOver) {
        this.changtoast('资料修改时间已截止，无法提交资料！', 'error')
        return
      }
      this.$router.push(`/yrylxxz?bmid=${this.bmid}`)
    },
    handleGoSY () {
      this.$router.push('/bm')
    }
  }
}
</script>

<style scoped lang="scss">
@import '../style/jbxx.scss';
</style>
