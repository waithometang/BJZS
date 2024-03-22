<template>
  <div class="publicMessageBox" v-if="visible">
    <div class="TrackMatte"></div>
    <div class="box-content">
      <div class="box-tab" v-if="type === 'select'">
        <div class="tab-head">
          <div class="head-title">请选择</div>
          <i class="head-icon" @click="close"></i>
        </div>
        <div class="tab-middle">
          <div class="middle-title">
            多胞胎只占一个报名名额，
            并安排到同一幼儿园就读，请务必用同一微信号报名。
          </div>
        </div>
        <div class="tab-base">
          <div class="base-tag" @click="applyType(2)">单个儿童报名</div>
          <div class="base-tag" @click="applyType(1)">多胞胎报名</div>
        </div>
      </div>
      <div class="box-tab" v-if="type === 'message'">
        <div class="tab-head">
          <i class="head-icon" @click="close"></i>
        </div>
        <div class="tab-icon">
          <i></i>
        </div>
        <div class="tab-middle">
          <div class="middle-title">
            该{{ types === 1 ? '学籍号' : '身份证号码' }}已被使用报名
          </div>
          <div class="middle-title">如有问题请咨询</div>
          <div class="middle-phone">0757-88282386</div>
        </div>
      </div>
      <div class="toast-tag" v-if="type === 'toast'">
        <div class="tag-title">{{ end ? '报名已结束' : '未在报名时间' }}</div>
        <div class="tag-title">
          {{
            types == 1
              ? '幼儿园'
              : types == 2
              ? '小学'
              : types == 3
              ? '中考'
              : types == 4
              ? '初中'
              : ''
          }}入学报名时间
        </div>
        <div class="tag-title">{{ kssj }} 至 {{ jssj }}</div>
      </div>
      <div class="box-tab commitment" v-if="type === 'commitment'">
        <div class="commitment_title">
          北滘镇2021年公办幼儿园招生入学报名承诺书
        </div>
        <div class="commitment_content">
          本人自愿代孩子参加北滘镇2021年公办幼儿园小班招生入学招生报名。报名前，本人已认真阅读了北滘镇2021年公办幼儿园小班招生报名的有关规定和纪律要求。本人郑重承诺:<br />
          （1）保证遵守报名的有关规定和纪律，按规定报名的程序和要求填写报名信息及志愿选择，如有违反，愿意承担由此造成的一切后果。<br />
          （2）本人自觉按照北滘镇2021年公办幼儿园小班招生报名的流程、报名相关要求和程序办理报名手续，不扰乱秩序，不弄虚作假，不伪造、使用假证明、假材料。<br />
          （3）本人保证报名时所提供的个人和孩子的信息是真实、准确的，如因提供的信息错误、失真造成不良后果，责任由本人承担。<br />
          （4）如未按要求提供资格审核材料或资格审核材料经审核不符合北滘镇2021年公办幼儿园小班招生报名条件的，则接受取消孩子报名资格的处理；如孩子已被录取的，则接受取消孩子录取资格的处理。<br />
        </div>
        <div
          @click="affirm"
          class="commitment_button"
          :class="{ count_down_btn: countDown > 0 }"
        >
          我已认真阅读并承诺
          {{ countDown > 0 ? '（' + countDown + 's）' : '' }}
        </div>
      </div>
      <div class="box-tab commitment" v-else-if="type === 'zk_commitment'">
        <div class="commitment_title">高明区非佛山市户籍考生中考报考承诺书</div>
        <div class="commitment_content">
          本人自愿为子或女申请参加佛山市2020年高中阶段学校招生考试，并郑重承诺：
          <br />本人已经了解《佛山市教育局关于印发佛山市2020年高中阶段学校招生考试工作意见的通知》（佛教招〔2020〕2号）精神和《
          高明区办理中考政策性照顾借读生及随迁子女材料清单》等文件和资料的内容，并熟知报考资格相关要求。积极配合提供本人合法第二代身份证、居民户口簿及相关的证明材料的原件及复印件。严格按指定时间将材料交到学校办理报名资格审核手续并自觉接受审核结果。不弄虚作假，不伪造、使用假证书、假学籍材料和假证明资料。如因考生个人信息错误、上报材料失真、失实和违法等造成不良后果，一切后果由本人承担，并愿意承担由此产生相应的法律责任。
        </div>
        <div @click="affirm" class="commitment_button">我已认真阅读并承诺</div>
      </div>
      <div class="box-tab" v-if="type === 'Student'">
        <div class="tab-head">
          <div class="head-title">请选择</div>
          <i class="head-icon" @click="close"></i>
        </div>
        <div class="tab-middle">
          <div class="middle-title">请选择本次多胞胎报名关联的报名儿童</div>
        </div>
        <!-- 
        <div class="title-tip">请选择</div>
        <div class="content-tip">请选择本次多胞胎报名关联的报名儿童</div> -->
        <van-radio-group
          :value="selectStudent.fzbh"
          class="Studentradio"
          bind:change="chageStudent"
        >
          <van-radio
            v-for="(item, index) in StudentList"
            :key="index"
            @click="chageStudent(item)"
            :name="item.fzbh"
            >{{ item.xm }}</van-radio
          >
        </van-radio-group>
        <div class="confirm" @click="Studentconfirm">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      end: false,
      type: '', // select message
      promiseStatus: null,
      kssj: '',
      jssj: '',
      StudentList: '',
      selectStudent: '',
      types: 2,
      // 倒计时
      countDown: 10
    }
  },
  methods: {
    confirm () {
      document.getElementsByTagName('body')[0].className = 'body-overflow'
      let _this = this
      this.visible = true
      if (this.type === 'toast') {
        setTimeout(() => {
          this.close()
        }, 2000)
      }
      return new Promise((resolve, reject) => {
        _this.promiseStatus = { resolve, reject }
      })
    },
    applyType (item) {
      document.body.removeAttribute('class', 'body-overflow')
      this.visible = false
      this.promiseStatus && this.promiseStatus.resolve(item)
    },
    affirm () {
      if (this.countDown > 0) {
        // this.changtoast('倒计时')
        return
      }
      document.body.removeAttribute('class', 'body-overflow')
      this.visible = false
      this.promiseStatus.resolve()
    },
    close () {
      document.body.removeAttribute('class', 'body-overflow')
      this.visible = false
      this.promiseStatus && this.promiseStatus.reject()
    },
    Studentconfirm () {
      document.body.removeAttribute('class', 'body-overflow')
      this.visible = false
      this.promiseStatus && this.promiseStatus.resolve(this.selectStudent)
    },
    chageStudent (item) {
      this.selectStudent = item
    }
  },
  created () {
    if (this.StudentList) {
      this.selectStudent = this.StudentList[0]
    }
    if (this.type === 'commitment') {
      let timer
      timer = setInterval(() => {
        if (this.countDown > 0) {
          this.countDown--
        } else {
          clearInterval(timer)
          this.countDown = 0
        }
      }, 1000)
    }
  }
}
</script>
