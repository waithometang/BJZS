  import Axios from './axios'

  export function czBmxx (id,isview) {
    let url = 'ybm/czapi/bmxx'
    return Axios ({
      url,
      data:{
        id,
        isview
      }
    })
  }

  export function BmLb (id) {
    let url = 'ybm/czapi/BmLb'
    return Axios ({
      url,
      data:{
        id
      }
    })
  }

  export function czBmxxYbzl (data) {
    let url = 'ybm/czapi/BmxxYbzl'
    return Axios ({
      url,
      data
    })
  }

  export function czBmxxJzxx (id) {
    let url = 'ybm/czapi/BmxxJzxx'
    return Axios ({
      url,
      data:{
        id
      }
    })
  }

  export function czxx (data) {
    let url = 'ybm/czapi/xxxx'
    return Axios ({
      url,
      data
    })
  }

 export function CzYbmzl (id) {
    let url = 'ybm/czapi/CzYbmzl'
    return Axios ({
      url,
      data:{
        id
      }
    })
  }

  export function CzJdcx (id) {
    let url = 'ybm/czapi/Jdcx'
    return Axios ({
      url,
      data:{
        id
      }
    })
  }

  export function Zgscjg (id) {
    let url = 'ybm/api/Zgscjg'
    return Axios ({
      url,
      data:{
        id,
        xxlx:1
      }
    })
  }
