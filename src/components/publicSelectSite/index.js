import Vue from 'vue';
import publicSelectSite from './publicSelectSite';

const selectSite = Vue.extend(publicSelectSite)
publicSelectSite.install = () => {
  let instance = new selectSite({}).$mount()
  document.body.appendChild(instance.$el)
  return instance.install()
}

export default publicSelectSite