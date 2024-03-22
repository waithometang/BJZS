<template>
  <div class="publicDataUpload">
    <div class="public-bar">上传报名资料:</div>
    <div class="public-datum-content">
      <div class="datum-head">
        <div class="datum-head-name">报名资料</div>
        <div class="datum-head-but">电子文件</div>
      </div>
      <div class="datum-list">
        <div class="list-tab" v-for="(item, index) in zlList" :key="index">
          <div class="tab-name">{{item.desc}}</div>
          <div class="tab-but">
            <div class="datum-number" @click="selectImage(item)">文件({{item.zlFile.length}})</div>
            <div class="tab-but-button" @click="viewImage(item)" v-if="IsView">点击查看</div>
            <div class="tab-but-button" @click="selectImage(item)" v-else>点击上传</div>
          </div>
        </div>
        <div class="datum-list-bz" v-if="bz">备注: {{this.bz}}</div>
      </div>
    </div>
    <van-popup v-model="show" position="bottom">
      <div class="upload-picture">
        <ul class="picture-list">
          <li class="list-tab" v-for="(item, index) in pictureData" :key="index" @click="delects(item)">
            <img :src="item.src" alt="">
            <i></i>
          </li>
          <li class="list-tab" v-if="pictureData.length < 9 && !IsView" @click="uploadPicture"><img src="/static/ybmimages/tjia.png" alt=""></li>
          <div style="clear:both;"></div>
        </ul>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { WaChatUploadPictures } from "@/js/WaChatUploadPictures";
import { WcChatPreviewImage } from '@/js/WeChatpreviewImage';
import { DelUpload } from '@/api/publicApi';

export default {
  props: ["WaChatConfigData","IsView"],
  data () {
    return {
      zlList:[],
      ZcId: '',
      show: false,
      itemData: '',
      mainId: null,
      pictureData: [],
      bz: ''
    }
  },
  computed: {
    type () {
      return this.$route.params.type*1
    },
    typeState () {
      return this.$route.params.typeState*1
    }
  },
  methods:{
    viewImage(row){
      let data = []
      row.zlFile.forEach(el => {
        data.push(`${window.location.protocol}//${window.location.host}/${el.src}`)
      })
      let url = data[0]
      WcChatPreviewImage(url, data, this.WaChatConfigData)
    },
    lookOver (item) {
      let url = `${window.location.protocol}//${window.location.host}/${item.src}`
      let data = []
      this.pictureData.forEach(el => {
        data.push(`${window.location.protocol}//${window.location.host}/${el.src}`)
      })
      WcChatPreviewImage(url, data, this.WaChatConfigData)
    },
    selectImage(row){
      this.show = true
      this.itemData = row
      this.pictureData = row.zlFile
      this.mainId = row.mainId || ''
    },
    uploadPicture () {
      let nuber = 9 - this.pictureData.length
      WaChatUploadPictures(this.WaChatConfigData,this.mainId, nuber,this.uploadSuccess,this.itemData);
    },
    uploadSuccess(data,row){
      this.$dialog.alert({
        title: '提示',
        message: '文件已上传'
      });
      row.zlFile.push(...data.urlData)
      row.mainId=data.mainId
      this.pictureData = row.zlFile
    },
    getZlList(){
      return this.zlList
    },
    getZcId () {
      return this.ZcId
    },
    setZlBz (item) {
      this.bz = item
    },
    setZlList(zlList){
      zlList.forEach(zl => {
        if (!zl.zlFile) {
          zl.zlFile=new Array()
        }
      })
      this.zlList=zlList
    },
    setZlDataList(dataList){
      this.zlList.forEach(zl => {
        for (let i = 0; i < dataList.length; i++) {
          const data = dataList[i];
          if (data.zcid===zl.Id) {
            zl.zlFile=data.zlFile
            zl.mainId=data.mainId
            return
          }
        }
      })
      let temp=this.zlList
      this.zlList=[]
      this.zlList=temp
    },
    delects (item) {
      DelUpload({
        id: item.id
      }).then(res => {
        if (res.data.success) {
          this.show = false
          this.changtoast('删除成功')
          this.pictureData = this.pictureData.filter(el => {
            return el.id !== item.id
          })
          this.zlList.forEach(vm => {
            if (vm.zlFile.length > 0) {
              vm.zlFile = vm.zlFile.filter(el => {
                return el.id !== item.id
              })
            }
          })
        } else {
          this.changtoast(res.data.message)
        }
      })
    }
  },
}
</script>