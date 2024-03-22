<template>
  <div class="publicSelector">
    <van-popup v-model="show" position="bottom">
      <van-picker
        show-toolbar
        v-if="type === 'linkage'"
        :columns="columns"
        @cancel="closePopup"
        @confirm="onChange"
        @change="setValue"
      />
      <van-picker
        show-toolbar
        v-else-if="type === 'linkage-one'"
        :columns="columns"
        @cancel="closePopup"
        @confirm="onChange"
        @change="setValue"
      />
      <van-picker
        v-else-if="type === 'select'"
        :columns="columns"
        @confirm="onChange"
        @cancel="closePopup"
        :visible-item-count="3"
        :show-toolbar="true"
      />
      <van-datetime-picker
        v-else-if="type === 'date'"
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="setTime"
        @cancel="closePopup"
      />
      <van-datetime-picker
        v-else-if="type === 'qrdate'"
        v-model="qrcurrentDate"
        type="date"
        :min-date="qrminDate"
        :max-date="qrmaxDate"
        @confirm="setTime"
        @cancel="closePopup"
      />
      <van-datetime-picker
        v-else-if="type === 'xxdate'"
        v-model="xxcurrentDate"
        type="date"
        :min-date="xxminDate"
        :max-date="xxmaxDate"
        @confirm="setTime"
        @cancel="closePopup"
      />
      <van-datetime-picker
        v-else-if="type === 'czdate'"
        v-model="czcurrentDate"
        type="date"
        :min-date="czminDate"
        :max-date="czmaxDate"
        @confirm="setTime"
        @cancel="closePopup"
      />
      <van-datetime-picker
        v-else-if="type === 'zkdate'"
        v-model="xxminDate"
        type="date"
        :min-date="zkminDate"
        :max-date="zkmaxDate"
        @confirm="setTime"
        @cancel="closePopup"
      />
      <van-datetime-picker
        v-else-if="type === 'gfdate'"
        v-model="xxminDate"
        type="date"
        :min-date="gfminDate"
        :max-date="zkmaxDate"
        @confirm="setTime"
        @cancel="closePopup"
      />
      <!-- <van-picker v-else-if="type === 'yeyxxselect'" :columns="columns" @confirm="onChange" @cancel="closePopup" :visible-item-count="3"  :show-toolbar="true"/> -->
      <van-area
        v-else-if="type === 'address'"
        :area-list="areaList"
        value="440608"
        @confirm="onChange"
        @cancel="closePopup"
      />
    </van-popup>
  </div>
</template>

<script>
import area from '@/js/area'
export default {
  data() {
    return {
      columns: [],
      linkage: '',
      type: '',
      show: false,
      currentDate: new Date(2017, 8, 1),
      minDate: new Date(2017, 8, 1),
      maxDate: new Date(2018, 7, 31),

      qrcurrentDate: new Date(2020, 8, 1),
      qrminDate: new Date(1970, 8, 1),
      // qrmaxDate: new Date(2020,12,31),
      xxcurrentDate: new Date(2010, 0, 1),
      xxminDate: new Date(2010, 0, 1),
      xxmaxDate: new Date(2014, 8, 1),
      czcurrentDate: new Date(2007, 0, 1),
      czminDate: new Date(2000, 0, 1),
      czmaxDate: new Date(2010, 8, 1),
      zkmaxDate: new Date(),
      zkminDate: new Date(1998, 8, 1),
      gfminDate: new Date(1990, 1, 1),
      gfmaxDate: new Date(2018, 11, 31),
      promiseStatus: '',
      areaList: ''
    }
  },
  created() {
    if (this.type == 'address') {
      this.areaList = area
    }
  },
  computed: {
    qrmaxDate() {
      let year = new Date().getFullYear()
      let month = new Date().getMonth()
      let day = new Date().getDate()
      return new Date(year, month, day)
    }
  },
  methods: {
    setValue(picker, values) {
      let index = picker.getIndexes()
      picker.setColumnValues(1, values[0].children)
    },
    onChange(item) {
      this.show = false
      if (this.type === 'address') {
        let addr = ''
        item.forEach(i => {
          addr += i.name
        })
        this.promiseStatus.resolve(addr)
      } else {
        this.promiseStatus.resolve(item)
      }
      this.promiseStatus && this.promiseStatus.resolve()
    },
    setTime(item) {
      this.show = false
      let birth = `${item.getFullYear()}-${
        item.getMonth() + 1
      }-${item.getDate()}`
      this.promiseStatus.resolve(birth)
      this.promiseStatus && this.promiseStatus.resolve()
    },
    closePopup() {
      this.show = false
    },
    initialize() {
      this.show = true
      if (this.type === 'linkage') {
        this.columns = [
          {
            values: this.linkage, // 设置的页面初始值
            className: 'column1'
          },
          {
            values: this.linkage[0].children,
            className: 'column2'
          }
        ]
      } else if (this.type === 'linkage-one') {
        this.columns = this.columns.map(el => el.mc)
      }
      return new Promise((resolve, reject) => {
        this.promiseStatus = { resolve, reject }
      })
    }
  }
}
</script>
