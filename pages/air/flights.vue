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
        <FlightsItem v-for="(item,index) in airTicketList.flights"
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
  data() {
    return {
      airTicketList: []
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
      console.log(this.airTicketList)
    })
  },
  methods: {
    //改变页码大小时触发
    handleSizeChange(value) {
      console.log('改变页码大小'+value)
    },
    //当前页发生改变时触发
    handleCurrentChange(index){
        console.log('页面改变'+index);
        
    }
  }
}
</script>

<style scoped lang="less">
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