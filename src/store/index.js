import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    publicLoading: false,
    mbxxInfo: '',
    zjxx: {},
    MedialdsList: '',
    attentionState: false,
    UploadPicturesSrc:"",
    UploadPicturesId:"",
    yryzc: '',
    selectzc:'',
		WaChetLatitude:22.900541,
    WaChetLongitude:112.892030,
  },
  mutations: {
    setPublicSelectAreaType (state, v) {
      state.publicSelectAreaType = v
    },
    setPublicLoading (state, v) {
      state.publicLoading = v
    },
    setMbxxInfo (state, v) {
      state.mbxxInfo = v
    },
    setZjxx (state, v) {
      state.zjxx = v
    },
    SetMedialdsList (state, v) {
      state.MedialdsList = v
    },
    SetAttentionState (state, v) {
      state.attentionState = v
    },
    UploadPicturesSrc (state, v){
      state.UploadPicturesSrc = v
    },
    UploadPicturesId (state, v){
      state.UploadPicturesId = v
    },
    setYryzc (state, v) {
      state.yryzc = v
    },
    setSelectzc (state, v) {
      state.selectzc = v
    },
		SetWaChetLatitude(state, v){
			state.WaChetLatitude=v
		},
		SetWaChetLongitude(state, v){
			state.WaChetLongitude=v
		}

  },
  actions: {}
});
