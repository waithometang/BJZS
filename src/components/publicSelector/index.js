import Vue from 'vue';
import publicSelector from './publicSelector';

const publicSelectors = Vue.extend(publicSelector)
publicSelector.install = (options) => {
  let instance = new publicSelectors({
    data: options
  }).$mount()
  document.body.appendChild(instance.$el)
  return instance.initialize()
}
export default publicSelector