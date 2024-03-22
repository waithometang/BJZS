<template>
  <div class="yrybm">
    <div class="head">
      <div class="public-long-but public-long-but-icon" @click="addBm">
        <i></i>新增幼儿园入学报名
      </div>
    </div>
    <div class="bd-line"></div>
    <div class="middle">
      <div class="title">我的幼儿园报名</div>
      <template v-if="list.length > 0">
        <div
          class="list-item"
          v-for="(item, index) in list"
          :key="index"
          @click="viewDetails(item)"
        >
          <div class="left">
            <img src="/static/ybmimages/touxiang.png" alt="" />
          </div>
          <div class="right">
            <div class="top">{{ item.xm }}&emsp;&emsp;{{ item.xb }}</div>
            <div class="tab-base">入学类型：{{ item.rxlx }}</div>
            <div class="tab-base">
              第一志愿：{{ item.bmxx ? item.bmxx : '（暂无结果通知）' }}
            </div>
            <div class="tab-base">
              录取学校：{{ item.lqxx ? item.lqxx : '（暂无结果通知）' }}
            </div>
            <div class="tab-base" v-if="item.bmbh">
              报名编号：{{ item.bmbh }}
            </div>
            <div class="footer">
              <div class="left">
                <img src="/static/ybmimages/时间.png" alt="" />
                <div>{{ item.rq }}</div>
              </div>
              <div class="right-zt">
                <template v-if="item.dqbz === '资格审查'">
                  <div class="base-right" v-if="item.zt === '待审查'">
                    资格审查中>
                  </div>
                  <div class="base-right" v-else>
                    <span :class="item.jg == '不通过' ? 'cor' : ''"
                      >审查{{ item.jg }}></span
                    >
                  </div>
                </template>
                <div v-else-if="item.dqbz === '入户排序'" class="base-right">
                  <span>入户排序中></span>
                </div>
                <div v-else-if="item.dqbz === '确认就读'" class="base-right">
                  <!-- <span>{{ getLqzt(item) }}></span> -->
                  <span
                    >{{
                      item.lqjg === '已录取' ? '已' : '未'
                    }}获得录取资格</span
                  >
                </div>
                <div v-else-if="item.dqbz === '学籍注册'" class="base-right">
                  <span>学籍注册></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { CheckBegin, Wdyrybm } from '@/api/publicApi'
import { sessionInfo } from '@/js/studentUtil'

export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      list: []
    }
  },
  computed: {},
  watch: {},
  created () {
    Wdyrybm()
      .then(rps => {
        console.log(rps.data.content)
        if (rps.data.success) {
          this.list = rps.data.content
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
      .catch(() => { })
  },
  mounted () { },
  methods: {
    addBm () {
      CheckBegin(2).then(rps => {
        if (rps.data.success) {
          if (!rps.data.content.isBegin) {
            this.$MessageBox({
              type: 'toast',
              types: 1,
              kssj: rps.data.content.kssj,
              jssj: rps.data.content.jssj
            })
            return
          }
          if (rps.data.content.isEnd) {
            this.$MessageBox({
              type: 'toast',
              types: 1,
              kssj: rps.data.content.kssj,
              jssj: rps.data.content.jssj,
              end: true
            })
            return
          }
          if (rps.data.content.ybmry && rps.data.content.ybmry.length != 0) {
            this.$MessageBox({ type: 'select', types: 1 })
              .then(el => {
                if (el === 1) {
                  this.$MessageBox({
                    type: 'Student',
                    types: 1,
                    StudentList: rps.data.content.ybmry
                  })
                    .then(st => {
                      this.$router.push('/yrylxxz?fzbh=' + st.fzbh)
                    })
                    .catch(err => {
                      console.log(err)
                    })
                } else if (el === 2) {
                  this.$router.push('/yrylxxz')
                }
              })
              .catch(err => {
                console.log(err)
              })
          } else {
            this.$MessageBox({ type: 'commitment', types: 1 })
              .then(el => {
                this.$router.push('/yrylxxz')
              })
              .catch(err => {
                console.log(err)
              })
          }
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    },
    viewDetails (item) {
      sessionInfo.save('sczt', item.zt)
      // if (item.dqbz === '确认就读') {
      //   // if (item.lqjg === '已录取' && !item.qrjg) {
      //   //   this.$router.push(`/yrybmlq/${item.id}`)
      //   // } else {
      //   this.$router.push(`/yrybmxq/${item.id}?jg=0`)
      //   // }
      // }
      // else {
      //   let jg = '0'
      //   if (item.dqbz === '资格审查') {
      //     if (item.zt === '待审查') {
      //       jg = '1'
      //     } else if (item.jg === '不通过') {
      //       jg = '2'
      //     } else if (item.jg === '通过') {
      //       jg = '3'
      //     }
      //   }
      //   this.$router.push(`/yrybmxq/${item.id}?jg=${jg}`)
      // }
      let jg = '0'
      if (item.dqbz === '资格审查') {
        if (item.zt === '待审查') {
          jg = '1'
        } else if (item.jg === '不通过') {
          jg = '2'
        } else if (item.jg === '通过') {
          jg = '3'
        }
      }
      this.$router.push(`/yrybmxq/${item.id}?jg=${jg}`)
    },
    getLqzt (item) {
      if (item.lqjg === '已录取') {
        return item.qrjg === '放弃就读' ? '已放弃就读' : '请确认就读'
      } else {
        return '未被录取'
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import './style/yrybm.scss';
</style>
