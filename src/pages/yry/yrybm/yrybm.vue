<template>
  <div class="yrybm">
    <div class="head">
      <div class="public-long-but public-long-but-icon" @click="addBm">
        <i></i>新增幼儿园入学报名
      </div>
    </div>
    <div class="middle">
      <div class="middle-title">我的幼儿园报名</div>
      <div
        class="middle-tab"
        v-for="(item, index) in list"
        :key="index"
        @click="viewDetails(item)"
      >
        <div class="tab-left"><i></i></div>
        <div class="tab-right">
          <div class="right-head">
            <div class="head-left">
              {{ item.xm }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.xb }}
            </div>
          </div>
          <div class="right-tab">入学类型:{{ item.rxlx }}</div>
          <div class="right-tab">
            报名学校:<span v-if="item.bmxx">{{ item.bmxx }}</span
            ><span class="span_cor" v-else>(暂未填报志愿)</span>
          </div>
          <div class="right-tab">
            录取学校:<span v-if="item.lqxx">{{ item.lqxx }}</span
            ><span class="span_cor" v-else>(暂无结果通知)</span>
          </div>
          <div class="right-base">
            <div class="base-left"><i></i> {{ item.rq }}</div>
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
              <span
                >{{ item.lqjg == '未录取' ? '未被录取' : '已报志愿' }}></span
              >
            </div>
            <div v-else-if="item.dqbz === '确认就读'" class="base-right">
              <span>{{ getLqzt(item) }}></span>
            </div>
            <div v-else-if="item.dqbz === '学籍注册'" class="base-right">
              <span>已确认就读></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CheckBegin, Wdyrybm } from '@/api/publicApi'
export default {
  data() {
    return {
      list: []
    }
  },
  methods: {
    viewDetails(item) {
      if (item.dqbz === '资格审查') {
        let jg
        if (item.zt === '待审查') {
          jg = '1'
        } else if (item.jg === '不通过') {
          jg = '2'
        } else if (item.jg === '通过') {
          jg = '3'
        }
        if (item.jg === '通过') {
          this.$router.push('/yryzytb/' + item.id)
        } else {
          this.$router.push('/yrytxxx?m=v&bmid=' + item.id + '&jg=' + jg)
        }
      } else if (item.dqbz === '入户排序') {
        if (item.lqjg == '未录取') {
          this.$router.push('/yryzytb/' + item.id)
        } else {
          this.$router.push('/yrytxxx?m=v&bmid=' + item.id + '&jg=3')
        }
      } else if (item.dqbz === '确认就读') {
        if (item.lqjg == '未录取') {
          this.$router.push('/yryzytb/' + item.id)
        } else {
          this.$router.push('/yrybmlq/' + item.id)
        }
      } else if (item.dqbz === '学籍注册') {
        this.$router.push('/yrytxxx?m=v&bmid=' + item.id + '&jg=3')
      }
    },
    getLqzt(item) {
      if (item.lqjg === '已录取') {
        return item.qrjg === '放弃就读' ? '已放弃就读' : '请确认就读'
      } else {
        return '未被录取'
      }
    },
    copyNew(item) {
      this.$router.push('/yryxzlx?bmid=' + item.id)
    },
    addBm() {
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
          this.$router.push('/yrytxxx')
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
    }
  },
  created() {
    Wdyrybm()
      .then(rps => {
        if (rps.data.success) {
          this.list = rps.data.content
        } else {
          this.changtoast(rps.data.message, 'error')
        }
      })
      .catch(() => {})
  }
}
</script>

<style lang='scss' scoped>
@import './style/yrybm.scss';
</style>