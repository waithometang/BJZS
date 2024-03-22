const yrDataKey = 'yrData'
const yrjzDataKey = 'yrjzDataKey'
const xxDataKey = 'xxData'
const ZKDataKey = "zkData"
const CzDataKey = "czData"
//幼儿报名数据
export function setYrbmData(data) {
    if (data.bmid) {
        sessionStorage.setItem(yrDataKey + data.bmid, JSON.stringify(data))
    } else {
        localStorage.setItem(yrDataKey, JSON.stringify(data))
    }
}

//幼儿报名数据
export function getYrbmData(id) {
    let data
    if (id) {
        data = sessionStorage.getItem(yrDataKey + id)
    } else {
        data = localStorage.getItem(yrDataKey)
    }
    if (data) {
        return JSON.parse(data)
    } else {
        return null
    }
}

//幼儿报名家长数据
export function setYrjzData(data) {
    if (data.bmid) {
        sessionStorage.setItem(yrjzDataKey + data.bmid, JSON.stringify(data))
    } else {
        localStorage.setItem(yrjzDataKey, JSON.stringify(data))
    }
}

//幼儿报名家长数据
export function getYrjzData(id) {
    let data
    if (id) {
        data = sessionStorage.getItem(yrjzDataKey + id)
    } else {
        data = localStorage.getItem(yrjzDataKey)
    }
    if (data) {
        return JSON.parse(data)
    } else {
        return null
    }
}

export function setImages(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}

export function getImages(key) {
    let data = localStorage.getItem(key)
    return JSON.parse(data)
}

export function clearImages() {
    localStorage.removeItem('hkb')
    localStorage.removeItem('jkzm')
    localStorage.removeItem('myzm')
    localStorage.removeItem('fczm')
    localStorage.removeItem('fmzm')
    localStorage.removeItem('zcml')
}

//幼儿报名数据
export function clearYrbmData(bmid) {
    localStorage.removeItem(yrDataKey)
    localStorage.removeItem(yrjzDataKey)
    // localStorage.removeItem('ImagesData')
    sessionInfo.remove('selectZc')
    sessionInfo.remove('selectState')
    sessionInfo.remove('selectLxs')
    //新增
    sessionInfo.remove('selectBz')
    sessionInfo.remove('jzData')
    sessionInfo.remove('selectName')
    sessionInfo.remove('zlData')
    sessionInfo.remove('ssxqType')
    // 
    if (bmid) {
        sessionStorage.removeItem(yrDataKey + bmid)
        sessionStorage.removeItem(yrjzDataKey + bmid)
    }
    sessionStorage.removeItem(yrDataKey)
    sessionStorage.removeItem(yrjzDataKey)
    sessionStorage.removeItem('rxlx')
}

//小学报名数据
export function clearXxbmData() {
    localStorage.removeItem(xxDataKey)
    sessionInfo.remove('xxRxlb')
}

//中考报名数据
export function clearZKbmData() {
    localStorage.removeItem(ZKDataKey)
    sessionInfo.remove('zkRxlb')
}

//初中报名数据
export function clearCzbmData() {
    localStorage.removeItem(CzDataKey)
    sessionInfo.remove('czRxlb')
}

// 镇街数据
export function getZjData(data) {
    let dome = []
    let value = data
    value.forEach((el) => {
        let list = { text: '', children: [] }
        list.text = el.zj
        list.children = el.yrys
        list.children.forEach((val) => {
            val.text = val.mc
        })
        dome.push(list)
    })
    return dome
}

export const sessionInfo = {
    save(key, data) { // 存储数据
        const saveData = JSON.stringify({ data })
        sessionStorage.setItem(key, saveData)
    },
    fetch(key) { // 读取数据
        const fetchData = sessionStorage.getItem(key)
        if (fetchData) {
            const data = JSON.parse(fetchData).data
            return data
        } else {
            return ''
        }
    },
    remove(key) { // 删除数据
        sessionStorage.removeItem(key)
    }
}

//=================小学===================

//小学报名数据
export function setXxbmData(data) {
    if (data.bmid) {
        sessionStorage.setItem(xxDataKey + data.bmid, JSON.stringify(data))
    } else {
        localStorage.setItem(xxDataKey, JSON.stringify(data))
    }

}

//小学报名数据
export function getXxbmData(id) {
    let data
    if (id) {
        data = sessionStorage.getItem(xxDataKey + id)
    } else {
        data = localStorage.getItem(xxDataKey)
    }
    if (data) {
        return JSON.parse(data)
    } else {
        return null
    }
}

//=================中考===================

//中考报名数据
export function setZKbmData(data) {
    if (data.bmid) {
        sessionStorage.setItem(ZKDataKey + data.bmid, JSON.stringify(data))
    } else {
        localStorage.setItem(ZKDataKey, JSON.stringify(data))
    }

}

//中考报名数据
export function getZKbmData(id) {
    let data
    if (id) {
        data = sessionStorage.getItem(ZKDataKey + id)
    } else {
        data = localStorage.getItem(ZKDataKey)
    }
    if (data) {
        return JSON.parse(data)
    } else {
        return null
    }
}

//=================初中===================

//初中报名数据
export function setCzbmData(data) {
    if (data.bmid) {
        sessionStorage.setItem(CzDataKey + data.bmid, JSON.stringify(data))
    } else {
        localStorage.setItem(CzDataKey, JSON.stringify(data))
    }

}

////初中报名数据
export function getCzbmData(id) {
    let data
    if (id) {
        data = sessionStorage.getItem(CzDataKey + id)
    } else {
        data = localStorage.getItem(CzDataKey)
    }
    if (data) {
        return JSON.parse(data)
    } else {
        return null
    }
}