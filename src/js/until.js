import { LoginOfficialAccount,GetTestToken } from '@/api/publicApi'
import Vm from '@/main'
// 缓存管理
export const storage = {
  save(key, value) {
    let saveTime = new Date().getTime()
    let data = JSON.stringify(value)
    let savaData = JSON.stringify({ data, saveTime })
    localStorage.setItem(key, savaData)
  },
  fetch(key, exp) {
    // code: 1正常 2 没有获取到数据 3数据过期
    let data = JSON.parse(localStorage.getItem(key))
    if (data) {
      data.data = JSON.parse(data.data)
    }

    let returnData = null
    if (data) {
      data.code = 1
      returnData = data
    } else {
      returnData = { data: '', code: 2 }
    }
    if (exp && returnData.code != 2) {
      let fetchTime = new Date().getTime()
      let saveTime = returnData.saveTime
      let countTime = fetchTime - saveTime
      let returnTime = exp - countTime
      if (countTime >= exp) {
        // 信息过期
        return { data: '', code: 3, returnTime }
      } else {
        returnData.returnTime = returnTime
        return returnData
      }
    } else {
      return returnData
    }
  },
  remove(key) {
    localStorage.removeItem(key)
  }
}

// sessionStorage 缓存管理
export const session_Storage = {
  save (key, value) {
    let saveTime = new Date().getTime()
    let data = JSON.stringify(value)
    let saveData = JSON.stringify({data, saveTime})
    sessionStorage.setItem(key, saveData)
  },
  fetch(key, exp) {
    // code: 1正常 2 没有获取到数据 3数据过期
    let data = JSON.parse(sessionStorage.getItem(key))
    if (data) {
      data.data = JSON.parse(data.data)
    }

    let returnData = null
    if (data) {
      data.code = 1
      returnData = data
    } else {
      returnData = { data: '', code: 2 }
    }
    if (exp && returnData.code != 2) {
      let fetchTime = new Date().getTime()
      let saveTime = returnData.saveTime
      let countTime = fetchTime - saveTime
      let returnTime = exp - countTime
      if (countTime >= exp) {
        // 信息过期
        return { data: '', code: 3, returnTime }
      } else {
        returnData.returnTime = returnTime
        return returnData
      }
    } else {
      return returnData
    }
  },
  remove(key) {
    sessionStorage.removeItem(key)
  }
}

/**
 *
 *  统一处理下拉加载上拉刷新 Api返回数据
 */
export function disposeApiData(rps, done, that) {
  if (rps.data.success) {
    let initData = rps.data.content
    if (that.pageIndex === 1) that.listData = initData
    else that.listData = that.listData.concat(initData)
    that.pageIndex++
    if (done) done()
    if (initData.length < that.pageSize) {
      that.$refs.my_scroller.finishInfinite(true)
    }
  } else {
    if (done) {
      done(true)
    }
    that.changtoast(rps.data.message, 'error')
  }
}

var GetTokenPromise = null

// 获取用户Token
export function GetToken(retake) {
  if(retake){
    storage.remove('Token')
    InitGetTokenPromise()
  }else if(GetTokenPromise==null){
    InitGetTokenPromise()
  }
  return GetTokenPromise
}

function InitGetTokenPromise(){
  GetTokenPromise=new Promise(resolve=>{
    let Token=storage.fetch('Token').data
    if(Token){
      resolve(Token)
      return
    }
    let assetsSubDirectory = false // 是否开发环境
    if(process && process.env && process.env.NODE_ENV === 'development') assetsSubDirectory = true
    let Url = window.location.href
    if (assetsSubDirectory) {
      GetTestToken().then(res=>{
        let testTkoen = res.data.content.token;
        storage.save('Token', testTkoen)
        resolve(testTkoen)
      })
    } else {
      let ua = navigator.userAgent.toLowerCase()
      let WechatCode = getUrlParam('code')
      let WechatState = getUrlParam('state')
      if (WechatState) { // 有获取到微信授权code
        LoginOfficialAccount({
          code: WechatCode
        }).then(rps => {
          // storage.save('userimages', rps.data.content.avatarUrl)
          storage.save('Token', rps.data.content.token)
          resolve(rps.data.content.token)
        })
      } else { // 没有获取到微信授权
        let requireUrl = encodeURIComponent(Url)
        let appid = ''
        if (Url.indexOf('znzwoa') > 0) {
          appid = 'wx7f1250a7fce8cdc2'  //厚实appId
        } else {
          appid = 'wx699910030b6f16b0'  //北滘appId
        }
        let scope = 'snsapi_base'
        let state = 'Wechat'
        window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${requireUrl}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`)
      }
    }
  })
}

/*通过正则获取url中的参数*/
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]); return null;
}
