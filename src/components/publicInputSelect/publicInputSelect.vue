<template>
  <div>
    <div class="public-input-tab">
      <div v-if="name" class="input-tab-name" :style="{ color: '#101010' }">
        <span v-if="required">*</span>
        {{ name }}:
      </div>
      <div class="input-tab-content" v-if="!selectType">
        <input
          :type="type"
          @blur="setValue"
          :value="value"
          @input="inputEvent"
          :readonly="readonly"
          :maxlength="maxlength"
          :placeholder="placeholder"
          v-model="text"
        />
      </div>
      <template v-else>
        <div class="input-tab-content" @click="select">
          <input
            :type="type"
            @blur="setValue"
            readonly="readonly"
            v-model="text"
            :placeholder="placeholder"
          />
        </div>
        <div class="input-tab-select" v-if="!readonly" @click="select">
          <img src="/static/ybmimages/xiala.png" alt />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    value(val, oldval) {
      if (!oldval) this.initData()
    }
  },
  props: {
    value: {},
    name: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    selectType: {
      type: String,
      default: ''
    },
    areaType: {
      type: String
    },
    column: {
      type: Array,
      default: () => {
        return []
      }
    },
    linkage: {
      type: Array,
      default: () => {
        return []
      }
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: true
    },
    maxlength: {
      type: Number,
      default: 1000
    }
  },
  mounted() {
    if (this.value) this.initData()
  },
  data() {
    return {
      text: ''
    }
  },
  methods: {
    inputEvent(val) {
      this.text = this.text.slice(0, this.maxlength)
      this.$emit('input', this.text)
    },
    initData() {
      if (this.selectType === 'linkage') {
        this.text = this.value
        this.linkage.forEach(el => {
          let data = el.children
          data.forEach(vm => {
            if (vm.id === this.value) {
              this.text = vm.mc
            }
          })
        })
      } else {
        this.text = this.value
        this.PublicinputText = this.value
      }
    },
    select() {
      if (!this.readonly) {
        if (this.selectType === 'site') {
          this.$store.commit('setPublicSelectAreaType', this.areaType)
          this.$selectSite().then(el => {
            this.text = el
            this.$emit('input', el)
          })
        } else {
          this.$Selector({
            columns: this.column,
            type: this.selectType,
            linkage: this.linkage
          }).then(el => {
            if (this.selectType === 'linkage') {
              this.text = el[1].mc ? el[1].mc : el[1].text
              this.$emit('input', el[1].id)
            } else if (this.selectType === 'linkage-one') {
              this.text = el.mc
              this.$emit('input', el.id)
            } else {
              this.text = el
              this.$emit('input', el)
            }
          })
        }
      }
    },
    setText(text) {
      this.text = text
    },
    setValue() {
      this.$emit('input', this.text)
    }
  }
}
</script>
