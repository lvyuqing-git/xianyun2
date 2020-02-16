<template>
  <div class="container">
    <el-row type="flex"
            justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <OrderForm></OrderForm>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <OrderAside :data="$store.state.air.airInfo"></OrderAside>
      </div>
    </el-row>
  </div>
</template>

<script>
import OrderForm from '@/components/air/orderForm'
import OrderAside from '@/components/air/orderAside'
export default {
  components: {
    OrderForm,
    OrderAside
  },
  mounted () {
      console.log(this.$store.state.air.airInfo.seat_infos.org_settle_price);
      
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>