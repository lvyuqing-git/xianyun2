<template>
  <div class="container">
    <el-carousel height="600px">
      <el-carousel-item v-for="(item,index) in carousel"
                        :key="index">
        <div class="banner-image"
             :style="`background: url(${item}) center center no-repeat; background-size: contain contain; `"></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carousel: []
    }
  },
  mounted() {
    this.$axios({
      url: '/scenics/banners'
    })
      .then(res => {
        const { data } = res.data
        this.carousel = data.map(item => {
          return (item.url = this.$axios.defaults.baseURL + item.url)
        })
        console.log(this.carousel)
      })
      .catch(function(error) {
        console.log(error)
      })
  }
}
</script>

<style>
.banner-image {
  height: 100%;
  width: 100%;
}
</style>
