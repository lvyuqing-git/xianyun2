<template>
  <div class="container">
    <el-carousel height="600px">
      <el-carousel-item v-for="(item,index) in carousel"
                        :key="index">
        <div class="banner-image"
             :style="`background: url(${item}) center center no-repeat; background-size:contain contain;`"></div>
      </el-carousel-item>
    </el-carousel>
    <div class="banner-content">
      <div class="search-bar">
        <!-- tab栏 -->
        <el-row type="flex"
                class="search-tab">
          <span v-for="(item,index) in postion" :key="index" @click="clickOptions(index)" :class="{active : current===index}">
            <i>{{item.name}}</i>
          </span>
        </el-row>

        <!-- 输入框 -->
        <el-row type="flex"
                align="middle"
                class="search-input">
          <input :placeholder="postion[current].placeholder" />
          <i class="el-icon-search"></i>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carousel: [],
      postion: [
        {
          name: '攻略',
          placeholder: '搜索城市'
        },
         {
          name: '酒店',
          placeholder: '搜索酒店'
        },
         {
          name: '机票',
          placeholder: ''
        }
      ],
      current : 0
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
  },
  methods: {
      clickOptions(index){
          this.current = index
      }
  }
}
</script>

<style lang='less' scoped>
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;
}
.banner-image {
  height: 100%;
  width: 100%;
}
.banner-content {
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.search-bar {
  width: 552px;
  margin: 0 auto;
}

.search-tab {
  .active {
    i {
      color: #333;
    }
    &::after {
      background: #eee;
    }
  }

  span {
    width: 82px;
    height: 36px;
    display: block;
    position: relative;
    margin-right: 8px;
    cursor: pointer;

    i {
      position: absolute;
      z-index: 2;
      display: block;
      width: 100%;
      height: 100%;
      line-height: 30px;
      text-align: center;
      color: #fff;
    }

    &:after {
      position: absolute;
      left: 0;
      top: 0;
      display: block;
      content: '';
      width: 100%;
      height: 100%;
      border: 1px rgba(255, 255, 255, 0.2) solid;
      border-bottom: none;
      transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
      transform-origin: bottom left;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 1px 2px 0 0;
      box-sizing: border-box;
    }
  }
}

.search-input {
  width: 550px;
  height: 46px;
  background: #fff;
  border-radius: 0 4px 4px 4px;
  border: 1px rgba(255, 255, 255, 0.2) solid;
  border-top: none;
  box-sizing: unset;

  input {
    flex: 1;
    height: 20px;
    padding: 13px 15px;
    outline: none;
    border: 0;
    font-size: 16px;
  }

  .el-icon-search {
    cursor: pointer;
    font-size: 22px;
    padding: 0 10px;
    font-weight: bold;
  }
}
</style>
