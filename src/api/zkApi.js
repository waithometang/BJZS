import Axios from './axios'

import OriginAxios from 'axios'
import { get } from 'http'

export function xxCheck (SettingData) {
  let url = 'ybm/zkapi/CheckBmData'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

export function xxxx (SettingData) {
  let url = 'ybm/api/xxxx'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

export function Zgscjg (id) {
  let url = 'ybm/zkapi/Zgscjg'
  return Axios ({
    url,
    data:{
      id
    }
  })
}

export function Wdbm (data) {
  let url = 'ybm/zkapi/Wdbm'
  return Axios ({
    url,
    data
  })
}


export function ZkBmxx (id,isview) {
  let url = 'ybm/zkapi/bmxx'
  return Axios ({
    url,
    data:{
      id,
      isview
    }
  })
}



export function zkBm (SettingData) {
  let url = 'ybm/zkapi/bm'
  let data = SettingData

  return Axios ({
    url,
    data
  })
}

  export function Ybmzl (id) {
    let url = 'ybm/zkapi/Ybmzl'
    return Axios ({
      url,
      data:{
        id
      }
    })
  }
export function Jdcx (id) {
    let url = 'ybm/zkapi/Jdcx'
    return Axios ({
      url,
      data:{
        id
      }
    })
  }
 export function BmLb (id) {
    let url = 'ybm/zkapi/BmLb'
    return Axios ({
      url,
      data:{
        id
      }
    })
  }

  export function BmxxYbzl (data) {
    let url = 'ybm/zkapi/BmxxYbzl'
    return Axios ({
      url,
      data
    })
  }
