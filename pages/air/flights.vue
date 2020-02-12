<template>
  <section class="contianer">
    <el-row type="flex"
            justify="space-between">

      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>

        </div>

        <!-- 航班头部布局 -->
        <FlightsListHead></FlightsListHead>

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in arr"
                     :key="index"
                     :data="item"></FlightsItem>
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="1"
                       :page-sizes="[5, 10, 15]"
                       :page-size="5"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="airTicketList.total">
        </el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from '@/components/air/flightsListHead'
import FlightsItem from '@/components/air/flightsItem'
export default {
  computed: {
    arr() {
      if (!this.airTicketList.flights) {
        // 没有值返回一个空数组
        return []
      }
      let arr = this.airTicketList.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      )

      return arr
    }
  },
  data() {
    return {
      airTicketList: [],
      showInfoList: [],
      pageIndex: 1,
      pageSize: 5
    }
  },
  components: {
    FlightsListHead,
    FlightsItem
  },
  mounted() {
    this.$axios({
      url: 'airs',
      params: this.$route.query
    }).then(res => {
      this.airTicketList = res.data
    })
  },
  methods: {
    //改变页码大小时触发
    handleSizeChange(value) {
      this.pageSize = value
    },
    //当前页发生改变时触发
    handleCurrentChange(index) {
      this.pageIndex = index
    }
  }
}
</script>

<style scoped lang="less">
.el-pagination{
    text-align: center;
}
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>