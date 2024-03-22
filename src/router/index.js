import Vue from 'vue'
import Router from 'vue-router'

// 北滘招生v1
// start
//报名首页
const index = resolve => require(['@/pages/bmindex/index'], resolve);
// 通知公告
const tzggxq = resolve => require(['@/pages/ybm/tzgg/tzggxq'], resolve);
// 通知公告列表
const tzgglb = resolve => require(['@/pages/ybm/tzgg/tzgglb'], resolve);
// 咨询动态
const zxdt = resolve => require(['@/pages/ybm/zxdt/zxdt'], resolve);
// 招生动态发布详情
const fbxq = resolve => require(['@/pages/ybm/fbxq/fbxq'], resolve);
// 幼儿园报名v1
const bm = resolve => require(['@/pages/yrybm/yrybm'], resolve);
//幼儿园报名详情v1
const yrybmxq = resolve => require(['@/pages/yrybmxq'], resolve);
// 幼儿园入学报名v1 填写幼儿信息
const yryrxbm = resolve => require(['@/pages/yryrxbm/yryrxbm'], resolve)
// 选择类型v1 第一学区，第二学区，第三学区
// const yrylxxz = resolve => require(['@/pages/yryrxbm/yryxzlx'], resolve);
const yrylxxz = resolve => require(['@/pages/yryrxbm/yryxzlx_v1'], resolve);
// 填写家长信息 上传资料v1
const yryzlsc = resolve => require(['@/pages/yryrxbm/yrysczl'], resolve);
// 资料上传 v2
const yrysctp = resolve => require(['@/pages/yryrxbm/yrysctp'], resolve);
// 志愿填报v1
const yrytbzy = resolve => require(['@/pages/yryrxbm/yryzytb'], resolve);
// 短信验证
const yrytjbm = resolve => require(['@/pages/yryrxbm/yrytjbm'], resolve);
// 幼儿园资格查询v1
const yryzgcx = resolve => require(['@/pages/yry/yryzgcx/yryzgcx'], resolve);
// 幼儿园入户排序v1
const yryrhpx = resolve => require(['@/pages/yry/yryrhpx/yryrhpx'], resolve);
// 幼儿园录取确认v1
const yrybmlq = resolve => require(['@/pages/yry/yrybmlq/yrybmlq'], resolve);
// 幼儿园学籍注册v1
const yryxjzc = resolve => require(['@/pages/yry/yryxjzc/yryxjzc'], resolve);

// end




// 阅读细则
const ydxz = resolve => require(['@/pages/ybm/ydxz/ydxz'], resolve);
//幼儿园报名
const yrybm = resolve => require(['@/pages/yry/yrybm/yrybm'], resolve);
// 幼儿园报名详情 （填写信息）
const yrytxxx = resolve => require(['@/pages/yry/yrytxxx/yrytxxx_v1'], resolve);
// 幼儿园入学类型
const yryxzlx = resolve => require(['@/pages/yry/yryxzlx/yryxzlx_v1'], resolve);
// 幼儿园志愿填报
const yryzytb = resolve => require(['@/pages/yry/yryzytb/yryzytb'], resolve);
// 选择优待政策 (优待生，户籍生)
const yryzc = resolve => require(['@/pages/yry/yryzc/yryzc'], resolve);
// 审查资格查询 （资格审查）
const yryzgcxxqList = resolve => require(['@/pages/yry/yryzgcxxq/yryzgcxxqList'], resolve);
// 审查资格查询详情（进度结果）
const yryzgcxxq = resolve => require(['@/pages/yry/yryzgcxxq/yryzgcxxq'], resolve);
// 上传资料
const yrysczl = resolve => require(['@/pages/yry/yrysczl/yrysczl'], resolve);
// 幼儿入学报名（证明材料）
const yrybtg = resolve => require(['@/pages/yry/yrybtg/yrybtg'], resolve);

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/ybm/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: index,
      meta: {
        title: '北滘招生'
      }
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        title: '北滘招生'
      }
    },
    {
      path: '/tzggxq/:id',
      name: 'tzggxq',
      component: tzggxq,
      meta: {
        title: '通知公告'
      }
    },
    {
      path: '/tzgglb',
      name: 'tzgglb',
      component: tzgglb,
      meta: {
        title: '通知公告'
      }
    },
    {
      path: '/zxdt',
      name: 'zxdt',
      component: zxdt,
      meta: {
        title: '招生政策'
      }
    },
    {
      path: '/fbxq/:id',
      name: 'fbxq',
      component: fbxq,
      meta: {
        title: '招生政策'
      }
    },
    {
      path: '/bm',
      name: 'bm',
      component: bm,
      meta: {
        title: '幼儿园报名'
      }
    },
    {
      path: '/yrybmxq/:id',
      name: 'bmxq',
      component: yrybmxq,
      meta: {
        title: '幼儿园报名详情'
      }
    },
    {
      path: '/yryrxbm/:bmid?',
      name: 'yryrxbm',
      component: yryrxbm,
      meta: {
        title: '幼儿园报名'
      }
    },
    {
      path: '/yrylxxz/:bmid?',
      name: 'yrylxxz',
      component: yrylxxz,
      meta: {
        title: '幼儿园报名'
      }
    },
    {
      path: '/yryzlsc/:bmid?',
      name: 'yryzlsc',
      component: yryzlsc,
      meta: {
        title: '幼儿园报名'
      }
    },
    {
      path: '/yrysctp/:bmid?',
      name: 'yrysctp',
      component: yrysctp,
      meta: {
        title: '幼儿园报名'
      }
    },
    {
      path: '/yrytbzy/:bmid?',
      name: 'yrytbzy',
      component: yrytbzy,
      meta: {
        title: '幼儿园报名'
      }
    },
    {
      path: '/yrytjbm/:bmid?',
      name: 'yrytjbm',
      component: yrytjbm,
      meta: {
        title: '短信验证'
      }
    },

    {
      path: '/yryzgcx',
      name: 'yryzgcx',
      component: yryzgcx,
      meta: {
        title: '幼儿园资格查询'
      }
    },
    {
      path: '/yryrhpx/:bmid',
      name: 'yryrhpx',
      component: yryrhpx,
      meta: {
        title: '幼儿园报名'
      }
    },
    {
      path: '/yrybmlq/:bmid',
      name: 'yrybmlq',
      component: yrybmlq,
      meta: {
        title: '幼儿园确认就读'
      }
    },
    {
      path: '/yryxjzc',
      name: 'yryxjzc',
      component: yryxjzc,
      meta: {
        title: '幼儿园学籍注册'
      }
    },
    // new update end
    // old update start
    {
      path: '/ydxz/:type', // // type: 报名类型 1: 小学, 2: 中学,
      name: 'ydxz',
      component: ydxz,
      meta: {
        title: '阅读细则'
      }
    },
    {
      path: '/yrybm',
      name: 'yrybm',
      component: yrybm,
      meta: {
        title: '幼儿园报名'
      }
    },
    {
      path: '/yrytxxx/:bmid?',
      name: 'yrytxxx',
      component: yrytxxx,
      meta: {
        title: '幼儿园报名详情'
      }
    },
    {
      path: '/yryxzlx/:bmid?',
      name: 'yryxzlx',
      component: yryxzlx,
      meta: {
        title: '幼儿园入学报名'
      }
    },
    {
      path: '/yryzytb',
      name: 'yryzytb',
      component: yryzytb,
      meta: {
        title: '幼儿园志愿填报'
      }
    },
    {
      path: '/yryzc/:bmid?',
      name: 'yryzc',
      component: yryzc,
      meta: {
        title: '选择优待政策'
      }
    },
    {
      path: '/yryzgcxxqList',
      name: 'yryzgcxxqList',
      component: yryzgcxxqList,
      meta: {
        title: '审查资格查询'
      }
    },
    {
      path: '/yryzgcxxq',
      name: 'yryzgcxxq',
      component: yryzgcxxq,
      meta: {
        title: '审查资格查询详情'
      }
    },
    {
      path: '/yrysczl/:bmid?',
      name: 'yrysczl',
      component: yrysczl,
      meta: {
        title: '上传资料'
      }
    },
    {
      path: '/yrybtg',
      name: 'yrybtg',
      component: yrybtg,
      meta: {
        title: '幼儿入学报名'
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
