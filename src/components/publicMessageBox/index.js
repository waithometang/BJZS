import Vue from 'vue';
import publicMessageBox from './publicMessageBox.vue';
import Radio from 'vant';

Vue.use(Radio)
const MessageBox = Vue.extend(publicMessageBox)
publicMessageBox.install = (options) => {
  let instance = new MessageBox({
    data: options
  }).$mount()
  document.body.appendChild(instance.$el)
  return instance.confirm()
};

export default publicMessageBox