<template>
  <div class="yrybtg" v-if="xsData">
    <div class="head">
      <div class="public-classify-tab">
        <div
          class="classify-tab"
          @click="changeTab(item)"
          :class="{ 'classify-tab-action': tabState === item.state }"
          v-for="(item, index) in listData"
          :key="index"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <!-- <div class="module-tag">
      <div class="module-title">基本信息</div>
      <public-Input-Select :readonly="isView" v-model="xsData.xm" :val="xsData.xm" :name="'幼儿姓名'" :placeholder="'输入幼儿姓名'" />
      <public-Input-Select :readonly="isView" v-model="xsData.zjlx" :val="xsData.zjlx" :name="'证件类型'" :placeholder="'选择幼儿证件类型'" :selectType="'select'"/>
      <public-Input-Select :readonly="isView" v-model=" xsData.sfzhm" :val="xsData.sfzhm" :name="'证件号'" :placeholder="'输入幼儿证件号'" />
      <public-Input-Select :readonly="isView" v-model="xsData.mz" :val="xsData.mz" :name="'幼儿民族'" :placeholder="'选择幼儿所属民族'" :selectType="'select'"/>
      <public-Input-Select :readonly="isView" v-model="xsData.sex" :val="xsData.sex" :name="'幼儿性别'" :placeholder="'选择幼儿性别'" :selectType="'select'"/>
      <public-Input-Select :readonly="isView" v-model="xsData.birth" :val="xsData.birth" :name="'出生日期'" :placeholder="'选择幼儿出生年月'" :selectType="'date'"/>
      <public-Input-Select :readonly="isView" v-model="xsData.hjlx" :val="xsData.hjlx" :name="'户籍类型'" :placeholder="'选择幼儿户籍类型'" :selectType="'select'"/>
      <public-Input-Select :readonly="isView" v-model="xsData.xjdz" :val="xsData.xjdz" :name="'现居住地'" :placeholder="'输入幼儿现居住地'" :selectType="'site'" />
      <public-Input-Select :readonly="isView" v-model="xsData.hjdz" :val="xsData.xjdz" :name="'户籍地址'" :placeholder="'输入幼儿户籍地址'" :selectType="'site'" />
      <public-Input-Select :readonly="isView" v-model="xsData.jzzh" :val="xsData.jzzh" :name="'接种证号'" :placeholder="'输入幼儿接种证号'" />
    </div>-->
    <div class="module-tag">
      <div class="module-title">
        入学类型:
        <div class="middle-title-hint">{{ xsData.rxlx }}</div>
      </div>
      <div class="module-title">
        填写家长信息:
        <!-- <span class="middle-title-hint"
          >（请务必填写满足政策条件的家长或直系亲属信息）</span
        > -->
      </div>
      <public-Input-Select
        :readonly="isView"
        v-model="xsData.dylxr"
        :val="xsData.dylxr"
        :name="'家长（第一联系人）'"
        :placeholder="'输入家长（第一联系人）'"
      />
      <public-Input-Select
        :readonly="isView"
        v-model="xsData.jzxm"
        :val="xsData.jzxm"
        :name="'家长姓名'"
        :placeholder="'输入姓名'"
      />
      <public-Input-Select
        :readonly="isView"
        v-model="xsData.yyrgx"
        :val="xsData.yyrgx"
        :name="'与幼儿关系'"
        :placeholder="'选择关系'"
        :selectType="'select'"
      />
      <public-Input-Select
        :readonly="isView"
        v-model="xsData.jz_zjlx"
        :val="xsData.jz_zjlx"
        :name="'家长证件类型'"
        :placeholder="'选择证件类型'"
        :selectType="'select'"
      />
      <public-Input-Select
        :readonly="isView"
        v-model="xsData.jz_zjhm"
        :val="xsData.jz_zjhm"
        :name="'家长证件号'"
        :placeholder="'输入证件号'"
      />
      <public-Input-Select
        :readonly="isView"
        v-model="xsData.lxdh"
        :val="xsData.lxdh"
        :name="'家长联系电话'"
        :placeholder="'输入联系电话'"
        :type="'number'"
      />
      <public-Input-Select
        :readonly="isView"
        v-model="xsData.dylxr_2"
        :val="xsData.dylxr_2"
        :name="'家长（第二联系人）'"
        :placeholder="'输入家长（第二联系人）'"
      />
      <public-Input-Select
        :readonly="isView"
        v-model="xsData.jzxm_2"
        :val="xsData.jzxm_2"
        :name="'家长姓名'"
        :placeholder="'输入姓名'"
      />
      <public-Input-Select
        :readonly="isView"
        v-model="xsData.yyrgx_2"
        :val="xsData.yyrgx_2"
        :name="'与幼儿关系'"
        :placeholder="'选择关系'"
        :selectType="'select'"
      />
      <public-Input-Select
        :readonly="isView"
        v-model="xsData.jz_zjlx_2"
        :val="xsData.jz_zjlx_2"
        :name="'家长证件类型'"
        :placeholder="'选择证件类型'"
        :selectType="'select'"
      />
      <public-Input-Select
        :readonly="isView"
        v-model="xsData.jz_zjhm_2"
        :val="xsData.jz_zjhm_2"
        :name="'家长证件号'"
        :placeholder="'输入证件号'"
      />
      <public-Input-Select
        :readonly="isView"
        v-model="xsData.lxdh_2"
        :val="xsData.lxdh_2"
        :name="'家长联系电话'"
        :placeholder="'输入联系电话'"
        :type="'number'"
      />
      <!-- <public-Input-Select
        v-if="xsData.fc_fcss"
        v-model="xsData.fc_fcss"
        :val="xsData.fc_fcss"
        :name="'不动产权利人'"
        :placeholder="'输入房产所属人姓名'"
      />
      <public-Input-Select
        v-if="xsData.fc_sfzh"
        v-model="xsData.fc_sfzh"
        :val="xsData.fc_sfzh"
        :name="'权利人身份证号'"
        :placeholder="'输入房产所属人身份证号'"
      />
      <public-Input-Select
        v-if="xsData.fc_fczh"
        v-model="xsData.fc_fczh"
        :val="xsData.fc_fczh"
        :name="'不动产权证号或购房合同号'"
        :placeholder="'输入不动产权证号或购房合同号'"
      />
      <public-Input-Select
        v-if="xsData.fc_fczl"
        :readonly="isView"
        v-model="xsData.fc_fczl"
        :val="xsData.fc_fczl"
        :name="'不动产坐落'"
        :placeholder="'不动产坐落(房产证或者预售合同上的坐落)'"
      />
      <public-Input-Select
        v-if="xsData.zzxx"
        :readonly="isView"
        v-model="xsData.zzxx"
        :val="xsData.zzxx"
        :name="'选择学校'"
        :placeholder="'不动产坐落(房产证或者预售合同上的坐落)'"
      /> -->
    </div>
    <div class="module-tag">
      <div class="module-title">资料照片:</div>
      <div class="list-tab" v-for="(item, index) in xsData.zls" :key="index">
        <div class="publicUploadPictures">
          <div class="upload-pictures-title">
            <span>*</span>
            {{ item.desc }}
          </div>
          <div class="state" v-if="item.sczt === '已审查'">
            结果:
            <span :class="{ color1: item.scjg === '通过' }">{{
              item.scjg
            }}</span>
            &nbsp;&nbsp;&nbsp;&nbsp; 审核时间:{{ item.scsj }}
          </div>
          <div class="state" v-if="item.scsm">备注: {{ item.scsm }}</div>
          <ul class="upload-pictures-list">
            <li v-for="(val, key) in item.urls" :key="key">
              <div class="images">
                <img :src="val" @click="getimg(item.urls, key)" alt />
              </div>
              <!-- <template v-if="item.sczt==='已审查'">
                <div class="state">状态:{{item.sczt}}</div>
                <div class="state">结果:<span>{{item.scjg}}</span></div>
                <div class="state">时间:{{item.scsj}}</div>
              </template>-->
            </li>
            <div style="clear: both"></div>
          </ul>
        </div>
      </div>
    </div>
    <div class="base">
      <div class="base-tab width">
        <div class="public-long-but" @click="gotoIndex">点击返回首页</div>
      </div>
    </div>
  </div>
</template>

<script>
import { YeyYbmzl } from '@/api/publicApi'
import { ImagePreview } from 'vant'
export default {
  data() {
    return {
      xsData: '',
      isView: true,
      listData: [
        { name: '基本信息', state: 1 },
        { name: '证明材料', state: 2 },
        { name: '进度结果', state: 3 }
      ],
      tabState: 2,
      ImagePr: ''
    }
  },
  methods: {
    changeTab(item) {
      if (item.state == 2) {
        this.$router.push('/yrybtg' + window.location.search)
      } else if (item.state == 3) {
        this.$router.push('/yryzgcxxq' + window.location.search)
      } else if (item.state == 1) {
        this.$router.push('/yrytxxx' + window.location.search)
      }
    },
    gotoIndex() {
      this.$router.push('/yrybm')
    },
    getimg(item, index) {
      this.ImagePr = ImagePreview({
        images: item,
        showIndex: true,
        loop: false,
        startPosition: index,
        closeOnPopstate: true
      })
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.ImagePr) {
      this.ImagePr.close()
      this.ImagePr = ''
      next(false)
    } else {
      next(true)
    }
  },
  created() {
    this.loading()
    YeyYbmzl({
      id: this.$route.query.bmid
    }).then(rps => {
      this.closeLoading()
      if (rps.data.success) {
        this.xsData = rps.data.content
      } else {
        this.changtoast(rps.data.message)
      }
    })
  }
}
</script>

<style lang='scss' scoped>
@import './style/yrybtg.scss';
</style>