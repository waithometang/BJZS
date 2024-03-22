// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Axios from '@/api/axios'

/** 导入全局样式库 **/
import '@/styles/index.scss'

/** 全局导入ui组件库 **/
import 'vant/lib/index.css';
import { Picker, Popup, DatetimePicker, Toast, List, Area, Swipe, SwipeItem, Dialog, RadioGroup, Radio } from 'vant';
Vue.use(Picker);
Vue.use(Popup);
Vue.use(DatetimePicker);
Vue.use(Toast);
Vue.use(List);
Vue.use(Area);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Dialog);
Vue.use(Radio);
Vue.use(RadioGroup);

Vue.prototype.changtoast = function (title) {// changtoast 调用函数名
  Toast({
    message: title,
    duration: 2000
  });
}
Vue.prototype.loading = function () {
  this.$store.commit('setPublicLoading', true)
  Toast.loading({
    message: '',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  });
}
Vue.prototype.closeLoading = function () {
  this.$store.commit('setPublicLoading', false)
  Toast.clear()
}

import publicMessageBox from '@/components/publicMessageBox/'
Vue.prototype.$MessageBox = publicMessageBox.install;

import publicSelector from '@/components/publicSelector/'
Vue.prototype.$Selector = publicSelector.install;

import publicInputSelect from '@/components/publicInputSelect'
Vue.use(publicInputSelect)

import publicSelectSite from '@/components/publicSelectSite'
Vue.prototype.$selectSite = publicSelectSite.install

Vue.config.productionTip = false

Vue.prototype.$post = (url, data) => Axios({
  url,
  data
})


//图片预览
// import vuePicturePreview from 'vue-picture-preview'
// Vue.use(vuePicturePreview)

/* eslint-disable no-new */
let Vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

export default Vm
