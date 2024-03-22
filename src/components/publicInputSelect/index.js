import Vue from 'vue';
import publicInputSelect from './publicInputSelect';

const PublicInputSelect = {
  install: function (Vue) {
    Vue.component('public-Input-Select', publicInputSelect)
  }
}

export default PublicInputSelect 