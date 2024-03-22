<template>
  <div class="publicResult">
    <div class="results-list">
      <div class="results-tab">
        <div class="tab-state">
          <div class="tab-state-icon">
            <img src="/static/ybmimages/index_icon_1.png" alt="">
          </div>
          <div class="tab-state-bar tab-state-bar-action">
            <div class="icon">
              <img src="/static/ybmimages/jian_3.png" alt="">
            </div>
          </div>
        </div>
        <div class="tab-content tab-content-action">
          <div class="content-name">预报名</div>
          <div class="content-title">{{`您已完成${$route.params.type === '1' ? '小学' : '初中'}入学报名申请填写并提交成功。`}}</div>
          <div class="content-time">{{listData.bmsj}}</div>
        </div>
      </div>
      <div class="results-tab">
        <div class="tab-state">
          <div class="tab-state-icon">
            <img :src="resultsState >= 2 ? '/static/ybmimages/index_icon_2.png' : '/static/ybmimages/index_icon_2_h.png'" alt="">
          </div>
          <div class="tab-state-bar" :class="{'tab-state-bar-action': resultsState > 2}">
            <div class="icon">
              <img :src="resultsState > 2 ? '/static/ybmimages/jian_3.png' : '/static/ybmimages/jian_3_h.png'" alt="">
            </div>
          </div>
        </div>
        <div class="tab-content" :class="{'tab-content-action': resultsState > 2}">
          <div class="content-name">正式报名</div>
          <div class="content-title" v-if="resultsState > 2">请准备好报名所需全部资料，并与<span>2020年4月4日至5日</span>内补充上传完毕，完成小学正式报名。</div>
          <div class="content-title" v-else>还没到节点进度，请耐心等待通知。</div>
          <div class="content-time" v-if="resultsState > 2">{{listData.qrsj}}</div>
        </div>
      </div>
      <div class="results-tab">
        <div class="tab-state">
          <div class="tab-state-icon">
            <img :src="resultsState >= 3 ? '/static/ybmimages/index_icon_3.png' : '/static/ybmimages/index_icon_3_h.png'" alt="">
          </div>
          <div class="tab-state-bar" :class="{'tab-state-bar-action': resultsState > 3}">
            <div class="icon">
              <img :src="resultsState > 3 ? '/static/ybmimages/jian_3.png' : '/static/ybmimages/jian_3_h.png'" alt="">
            </div>
          </div>
        </div>
        <div class="tab-content" :class="{'tab-content-action': resultsState > 3}">
          <div class="content-name">资料审核</div>
          <div class="content-title">{{resultsState > 3 ? '您的报名已审核完毕。' : '还没到节点进度，请耐心等待通知。'}}</div>
          <div class="content-time" v-if="resultsState > 3">{{listData.shsj}}</div>
        </div>
      </div>
      <div class="results-tab">
        <div class="tab-state">
          <div class="tab-state-icon">
            <img :src="resultsState >= 4 ? '/static/ybmimages/index_icon_4.png' : '/static/ybmimages/index_icon_4_h.png'" alt="">
          </div>
          <div class="tab-state-bar" :class="{'tab-state-bar-action': resultsState > 4}">
            <div class="icon">
              <img :src="resultsState > 4 ? '/static/ybmimages/jian_3.png' : '/static/ybmimages/jian_3_h.png'" alt="">
            </div>
          </div>
        </div>
        <div class="tab-content" :class="{'tab-content-action': resultsState >= 4}">
          <div class="content-name">结果确认</div>
          <div class="content-title" v-if="resultsState >= 4">请你在<span>2020年5月4日至5日</span>内，带起相关报名资料原件到<span>荷城第一小学</span>进行报名确认，如没准时现场确认视为放弃学位。</div>
          <div class="content-title" v-else>还没到节点进度，请耐心等待通知。</div>
          <div class="content-time" v-if="resultsState >= 4">{{listData.qrsj}}</div>
        </div>
      </div>
      <div class="results-tab">
        <div class="tab-state">
          <div class="tab-state-icon">
            <img :src="resultsState >= 5 ? '/static/ybmimages/index_icon_5.png' : '/static/ybmimages/index_icon_5_h.png'" alt=""></div>
          <div class="tab-state-bar" :class="{'tab-state-bar-action': resultsState > 5}">
            <div class="icon">
              <img :src="resultsState > 5 ? '/static/ybmimages/jian_3.png' : '/static/ybmimages/jian_3_h.png'" alt="">
            </div>
          </div>
        </div>
        <div class="tab-content" :class="{'tab-content-action': resultsState >= 5}">
          <div class="content-name">录取通知</div>
          <div class="content-title" v-if="resultsState >= 5">录取学校: &nbsp;&nbsp; <span>{{listData.lqxx}}</span></div>
          <div class="content-title" v-else>还没到节点进度，请耐心等待通知</div>
          <div class="download" v-if="resultsState >= 5"><a href="listDatalqtzUrl"><div class="download-icon"></div> 点击下载录取通知书</a></div>
          <div class="content-time" v-if="resultsState >= 5">{{listData.tzsj}}</div>
        </div>
      </div>
      <div class="results-tab">
        <div class="tab-state">
          <div class="tab-state-icon">
            <img :src="resultsState >= 6 ? '/static/ybmimages/index_icon_6.png' : '/static/ybmimages/index_icon_6_h.png'" alt="">
          </div>
        </div>
        <div class="tab-content" :class="{'tab-content-action': resultsState >= 6}">
          <div class="content-name">学籍注册</div>
          <div class="content-title" v-if="resultsState >= 6">请带上录取通知书，在<span>{{listData.zcrq}}</span>到<span>荷城街道第一小学</span>进行学籍注册。</div>
          <div class="content-title" v-else>还没到节点进度，请耐心等待通知</div>
          <div class="content-time" v-if="resultsState >= 6">{{listData.zctzsj}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    resultsState: {
      default: 1
    },
    listData: {

    }
  },
  data () {
    return {
    }
  }
}
</script>