<template>
  <div class="publicUploadPictures">
    <div class="upload-pictures-title" v-if="title">
      <span v-if="isNeed">*</span>{{ title }}
    </div>
    <div class="upload-pictures-title" v-if="name">{{ name }}</div>
    <ul class="upload-pictures-list">
      <li v-for="(item, index) in picturesList" :key="index">
        <div class="images">
          <img
            :src="readonly ? item : item.src"
            alt=""
            @click="getimg(imgList, index)"
          />
        </div>
        <i class="min-icon" v-if="!readonly" @click="delects(item)"></i>
      </li>
      <li @click="uploadPictures" v-if="!readonly">
        <i class="icon"></i>
      </li>
      <div style="clear: both"></div>
    </ul>
  </div>
</template>

<script>
import { publicUploadPictures } from '@/js/publicUploadPictures'
import { DelUpload } from '@/api/publicApi'
import { setImages, getImages } from '@/js/studentUtil'
import { ImagePreview } from 'vant'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    configData: {
      type: Object
    },
    state: {
      type: Number,
      default: ''
    },
    readonly: {
      //是否只读
      type: Boolean,
      default: false
    },
    loaclData: {
      //读取本地数据
      type: Boolean,
      default: true
    },
    isNeed: {
      //是否必填
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      mainId: '',
      picturesList: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getStorageImage()
    })
  },
  computed: {
    imgList () {
      if (this.picturesList.length > 0) {
        let imgArr = []
        this.picturesList.map(item => {
          imgArr.push(item.src)
        })
        return imgArr
      } else {
        return []
      }
    }
  },
  methods: {
    // 预览图片
    getimg (item, index) {
      ImagePreview({
        images: item,
        showIndex: true,
        loop: false,
        startPosition: index,
        closeOnPopstate: true
      })
    },
    uploadPictures () {
      if (this.readonly) {
        return
      }
      if (window.location.host === 'localhost:8898') {
        // if (window.location.host === '192.168.0.121:8898') {
        //测试数据
        let val = {
          mainId: 'ta20011307145910',
          urlData: {
            id: 20063,
            src:
              'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1603365312,3218205429&fm=26&gp=0.jpg'
          }
        }
        this.picturesList.push(val.urlData)
        this.setStorageImage(val)
        !this.mainId && (this.mainId = val.mainId)
        return
      }
      publicUploadPictures(this.configData, this.mainId).then(val => {
        console.log(val);
        this.mainId = val.mainId
        if (val.errCode === 446) {
          this.picturesList = val.urlData
        } else {
          this.picturesList = this.picturesList.concat(val.urlData)
          val.urlData = this.picturesList
        }
        // this.$emit('input', this.mainId)
        /**
         * 注意：此处有bug，点击上下页：上传新图片会覆盖之前旧图片
         * 修复：val.urlData = this.picturesList
         * */
        this.setStorageImage(val)
      })
    },
    setPictures (list, id) {
      this.picturesList = list
      this.mainId = id
    },
    getMainId () {
      let data = { mainId: this.mainId, number: this.picturesList.length }
      return data
    },
    delects (item) {
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '是否确定删除图片?'
        })
        .then(() => {
          DelUpload({
            id: item.id
          }).then(res => {
            if (res.data.success || res.data.message === '文件记录不存在') {
              this.changtoast('删除成功')
              this.picturesList = this.picturesList.filter(el => {
                return el.id != item.id
              })
              this.setStorageImage({
                mainId: this.mainId,
                urlData: this.picturesList
              })
            } else {
              this.changtoast(res.data.message)
            }
          })
        })
        .catch(() => { })
    },
    setStorageImage (val) {
      if (!this.loaclData) {
        return
      }
      setImages(`ImagesKey${this.state}`, val)
    },
    removeStorageImage () {
      localStorage.removeItem(`ImagesKey${this.state}`)
    },
    getStorageImage () {
      if (!this.loaclData) {
        return
      }
      let val = getImages(`ImagesKey${this.state}`)
      if (val) {
        this.mainId = val.mainId
        this.picturesList = this.picturesList.concat(val.urlData)
        this.$emit('input', this.mainId)
      }
    }
  }
}
</script>