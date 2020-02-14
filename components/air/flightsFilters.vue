<template>
  <div class="filters">
    <el-row type="flex"
            class="filters-top"
            justify="space-between"
            align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini"
                   v-model="airport"
                   placeholder="起飞机场"
                   @change="handleAirport">
          <el-option :label="item"
                     :value="item"
                     v-for="(item,index) in data.options.airport"
                     :key="index">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini"
                   v-model="flightTimes"
                   placeholder="起飞时间"
                   @change="handleFlightTimes">
          <el-option :label="`${item.from}:00 - ${item.to}:00`"
                     :value="`${item.from},${item.to}`"
                     v-for="(item,index) in data.options.flightTimes"
                     :key="index">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini"
                   v-model="company"
                   placeholder="航空公司"
                   @change="handleCompany">
          <el-option :label="item"
                     :value="item"
                     v-for="(item,index) in data.options.company"
                     :key="index">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini"
                   v-model="airSize"
                   placeholder="机型"
                   @change="handleAirSize">
          <el-option v-for="(item,index) in airSizeList"
                     :key="index"
                     :label="item.type"
                     :value="item.code">
          </el-option>
        </el-select>

      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary"
                 round
                 plain
                 size="mini"
                 @click="handleFiltersCancel">
        撤销
      </el-button>
      {{filter}}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    filter() {
      let arr = this.data.flights.filter(item => {
        let valid = true
        //选择机场
        if (this.airport && item.org_airport_name !== this.airport) {
          valid = false
        }
        //起飞时间
        if (this.flightTimes) {
          //起飞时间
          let tiemArr = this.flightTimes.split(',')
          //起飞范围
          let departTime = +item.dep_time.split(':')[0]
        
        //   if (+tiemArr[0] > departTime ||  departTime >= +tiemArr[1]) {
          if (+tiemArr[0] > departTime || +tiemArr[1] >= departTime) {

            valid = false
          }
        }
        //航空公司过滤
        if (this.company && item.airline_name !== this.company) {
          valid = false
        }
        //机型过滤
        if (this.airSize && item.plane_size !== this.airSize) {
          valid = false
        }
        return valid
      })
      this.$emit('getArrDate', arr)

      return ''
    }
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      airport: '', // 机场
      flightTimes: '', // 出发时间
      company: '', // 航空公司
      // 机型大小的列表
      airSize: '',
      airSizeList: [
        { type: '大', code: 'L' },
        { type: '中', code: 'M' },
        { type: '小', code: 'S' }
      ]
    }
  },
  methods: {
    // 选择机场时候触发
    handleAirport(value) {
      //   let arr = this.data.flights.filter(item => {
      //     return item.org_airport_name === value
      //   })
      //   this.$emit('getArrDate', arr)
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
      //   let tiemArr = value.split(',')
      //   let arr = this.data.flights.filter(item => {
      //     let departTime = item.dep_time.split(':')[0]
      //     return departTime >= tiemArr[0] && departTime < tiemArr[1]
      //   })
      //   this.$emit('getArrDate', arr)
    },

    // 选择航空公司时候触发
    handleCompany(value) {
      //   let arr = this.data.flights.filter(item => {
      //     return item.airline_name === value
      //   })
      //   this.$emit('getArrDate', arr)
    },

    // 选择机型时候触发
    handleAirSize(value) {
      console.log(value)

      //   let arr = this.data.flights.filter(item => {
      //     return item.plane_size === value
      //   })
      //   this.$emit('getArrDate', arr)
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
      this.airport = '' // 机场
      this.flightTimes = '' // 出发时间
      this.company = '' // 航空公司
      // 机型大小的列表
      this.airSize = ''
      this.$emit('getArrDate', this.data.flights)
    }
  }
}
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>