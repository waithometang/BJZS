<template>
  <div class="jdjg">
    <div class="list">
      <div class="listHead">学生信息</div>
      <div class="info">
        <div class="tximgs"><img src="/static/ybmimages/touxiang.png" /></div>
        <div class="message">
          <p>{{ jdjgData.xm }}</p>
          <p>性别：{{ jdjgData.xb }}</p>
          <p>证件号码：{{ jdjgData.sfzh }}</p>
        </div>
      </div>
    </div>
    <div class="bd-line"></div>

    <div class="middle">
      <div class="title">查询结果</div>

      <div class="itemWrapper">
        <div class="item">
          <div class="left">
            <img src="/static/ybmimages/yryzgcx_01.png" alt="" />
          </div>
          <div class="right">
            <div class="steps">入学报名</div>
            <div class="tips">你已完成入学报名</div>
            <div class="time">{{ jdjgData.bmsj }}</div>
          </div>
        </div>

        <div class="item">
          <div class="left">
            <img src="/static/ybmimages/yryzgcx_02.png" alt="" />
          </div>
          <div class="right">
            <div class="steps">志愿填报</div>
            <div class="tips">第一志愿学校：{{ jdjgData.zyxx1 }}</div>
            <div class="tips" v-if="jdjgData.zyxx2">
              第二志愿学校：{{ jdjgData.zyxx2 }}
            </div>
            <div class="tips" v-if="jdjgData.zyxx3">
              第三志愿学校：{{ jdjgData.zyxx3 }}
            </div>
            <div class="tips" v-if="jdjgData.zyxx4">
              第四志愿学校：{{ jdjgData.zyxx4 }}
            </div>
            <div class="tips" v-if="jdjgData.zyxx5">
              第五志愿学校：{{ jdjgData.zyxx5 }}
            </div>
            <div class="mark" v-if="jdjgData.sffctj">
              备注：{{
                jdjgData.sffctj == '是' ? '服从跨区调剂' : '不服从跨区调剂'
              }}
              <span v-if="jdjgData.tjdyzy" style="display: block"
                >第一志愿：{{ jdjgData.tjdyzy }}</span
              >
              <span v-if="jdjgData.tjdezy"
                >第二志愿：{{ jdjgData.tjdezy }}</span
              >
            </div>
            <div class="time">{{ jdjgData.bmsj }}</div>
          </div>
        </div>

        <div class="item">
          <div class="left">
            <img src="/static/ybmimages/yryzgcx_03.png" alt="" />
          </div>
          <div class="right">
            <div class="steps">资格审查</div>
            <template v-if="jdjgData.sczt === '已审查'">
              <div class="scjg" :class="{ btg: jdjgData.scjg === '不通过' }">
                <span>{{ jdjgData.scjg }}</span>
              </div>
              <div class="btg" v-if="jdjgData.scjg === '不通过'">
                {{ jdjgData.scbz }}
              </div>
              <div class="mark" v-if="jdjgData.scjg === '通过'">
                备注：待现场原件资料确认复核
              </div>
              <div class="time">{{ jdjgData.scsj }}</div>
            </template>
            <template v-else>
              <div class="tips bz">资格审查中</div>
            </template>
          </div>
        </div>
        <div
          class="item"
          v-if="stepIndex >= 2 && jdjgData.zys && jdjgData.zys.length > 0"
        >
          <div class="left">
            <img src="/static/ybmimages/yryzgcx_04.png" alt="" />
          </div>
          <div class="right">
            <div class="steps">幼儿园报读志愿排序</div>
            <div v-for="(item, index) in jdjgData.zys" :key="index">
              <div class="tips">报名学校：{{ item.mc }}</div>
              <div
                class="wlq"
                :class="{ ylq: item.lqjg == '已录取' }"
                v-if="item.lqjg"
              >
                {{ item.lqjg }}
              </div>
              <div class="time">{{ item.rq }}</div>
            </div>
          </div>
        </div>

        <div class="item" v-if="stepIndex >= 3">
          <div class="left">
            <img src="/static/ybmimages/yryzgcx_06.png" alt="" />
          </div>
          <div class="right">
            <div class="steps">报名录取</div>
            <template v-if="jdjgData.lqjg === '已录取'">
              <div class="scjg">录取结果：已获得录取资格</div>
              <div class="tips">录取学校：{{ jdjgData.lqxx }}</div>
              <div class="mark">
                备注：获得录取资格的适龄儿童家长请根据园方通知的时间、地点，携带相关资料原件及复印件进行学位确认。资料原件、复印件必须与报名系统上传资料保持一致。提供虚假材料，一经查实，取消录取资格，并报有关部门处理。逾期不确认学位的视为放弃学位，各公办幼儿园不再保留其学位。
              </div>
              <div class="time">{{ jdjgData.lqsj }}</div>
              <div class="bd-line"></div>
              <div class="scjg">{{ jdjgData.qrjg }}</div>
              <div class="scjg">{{ jdjgData.qrsm }}</div>
              <div class="time">{{ jdjgData.qrsj }}</div>
            </template>
            <template v-else>
              <div class="scjg">录取结果：未获得录取资格</div>
            </template>
            <!-- <div class="scjg">
              录取结果：{{
                jdjgData.lqjg === '已录取' ? '已' : '未'
              }}获得录取资格
            </div>
            <div class="tips">录取学校：{{ jdjgData.lqxx }}</div>
            <div class="mark" v-if="jdjgData.lqjg === '已录取'">
              备注：获得录取资格的适龄儿童家长请根据园方通知的时间、地点，携带相关资料原件及复印件进行学位确认。资料复原件、印件必须与报名系统上传资料保持一致。提供虚假材料，一经查实，取消录取资格，并报有关部门处理。逾期不确认学位的视为放弃学位，各公办幼儿园不再保留其学位。
            </div>
            <div class="time">{{ jdjgData.lqsj }}</div>
            <div class="bd-line"></div>
            <div class="scjg">{{ jdjgData.qrjg }}</div>
            <div class="scjg">{{ jdjgData.qrsm }}</div>
            <div class="time">{{ jdjgData.qrsj }}</div> -->
          </div>
        </div>
        <!-- <div class="item" v-if="stepIndex >= 4">
          <div class="left">
            <img src="/static/ybmimages/yryzgcx_07.png" alt="" />
          </div>
          <div class="right">
            <div class="steps">学籍注册</div>
            <div class="tips">录取学校：{{ jdjgData.lqxx }}</div>
            <div class="mark">
              备注：获得录取资格的适龄儿童家长请根据园方通知的时间、地点，携带相关资料原件及复印件进行学位确认。资料复原件、印件必须与报名系统上传资料保持一致。提供虚假材料，一经查实，取消录取资格，并报有关部门处理。逾期不确认学位的视为放弃学位，各公办幼儿园不再保留其学位。
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { YeyJdcx } from '@/api/publicApi'
// let steps = [
//   '入学报名',
//   '志愿填报',
//   '资格审查',
//   '幼儿园录取排序',
//   '报名录取',
//   '学籍注册'
// ]
let steps = ['入学报名', '资格审查', '入户排序', '确认就读', '学籍注册']

export default {
  name: '',
  components: {},
  props: {
    bmid: {
      type: String
    }
  },
  data () {
    return {
      jdjgData: {},
      stepIndex: 0,
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loading()
    YeyJdcx(this.bmid).then(rps => {
      this.closeLoading()
      if (rps.data.success) {
        console.log(rps.data.content)
        this.jdjgData = rps.data.content
        this.stepIndex = steps.indexOf(this.jdjgData.dqbz)
      } else {
        this.changtoast(rps.data.message, 'error')
      }
    })
  },
  mounted () {
  },
  methods: {}
}
</script>

<style scoped lang="scss">
@import '../style/jdjg.scss';
</style>
