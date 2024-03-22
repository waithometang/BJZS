import Axios from './axios'

  export function GetRxzc(xxlx,rxlx) {
    return Axios({
      url:'ybm/api/GetRxzc/'+xxlx+'/'+rxlx,
      config:{method:'get'}
    })
  }

  export  function BmxxZcxx (SettingData) {
    let url = 'ybm/api/BmxxZcxx'
    let data = SettingData
  
    return Axios ({
      url,
      data
    })
  }

  export function zjxx(xxlx) {
    return Axios({
      url:'ybm/api/zjxx/'+xxlx,
      config:{method:'get'}
    })
  }
  

  export  function Bm (SettingData) {
    let url = 'ybm/api/bm'
    let data = SettingData
  
    return Axios ({
      url,
      data
    })
  }

  export function XxBmxx (id,isview) {
    let url = 'ybm/xxapi/bmxx'
    return Axios ({
      url,
      data:{
        id,
        isview
      }
    })
  }

  export function XxYbmzl (id) {
    let url = 'ybm/xxapi/XxYbmzl'
    return Axios ({
      url,
      data:{
        id
      }
    })
  }

  export function XxBmxxJzxx (id) {
    let url = 'ybm/xxapi/BmxxJzxx'
    return Axios ({
      url,
      data:{
        id
      }
    })
  }

  export function BmLb (id) {
    let url = 'ybm/xxapi/BmLb'
    return Axios ({
      url,
      data:{
        id
      }
    })
  }

  export function XxBmxxYbzl (data) {
    let url = 'ybm/xxapi/BmxxYbzl'
    return Axios ({
      url,
      data
    })
  }

  export function Zgscjg (id) {
    let url = 'ybm/api/Zgscjg'
    return Axios ({
      url,
      data:{
        id,
        xxlx:0
      }
    })
  }

  export function XxJdcx (id) {
    let url = 'ybm/xxapi/Jdcx'
    return Axios ({
      url,
      data:{
        id
      }
    })
  }

  export function xxxx (data) {
    let url = 'ybm/xxapi/xxxx'
    return Axios ({
      url,
      data
    })
  }

  export function CheckBmlx(vm,xxlx,sfzh,lbdh){
    vm.loading()
    return new Promise((resolve, reject) => {
      Axios({url:'ybm/xxapi/CheckBmlx', data:{xxlx,sfzh,lbdh}}).then(res=>{
        vm.closeLoading()
        if (res.data.success && res.data.content) {
          resolve(res.data.content)
        }else{
          vm.changtoast(res.data.message, "error");
          // if(reject) reject()
        }
      },()=>{
        if(reject) reject()
      })
    })
  }