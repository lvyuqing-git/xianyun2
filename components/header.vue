<template>
  <header class="header">
    <el-row type="flex"
            class="main"
            justify="space-between">
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg"
               alt="">
        </nuxt-link>
      </div>
      <el-row class="nav">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <el-row>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-bell"></i>消息<i class="el-icon-arrow-down el-icon--right el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
          <span class="el-dropdown-link">
            user<i class="el-icon-arrow-down el-icon--right el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕111</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-row>

  </header>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.header {
  height: 60px;
  line-height: 60px;
  .main {
    width: 1000px;
    margin: 0 auto;
    .nav {
      flex: 1;
      margin-left: 20px;
      a {
        display: inline-block;
        padding: 0 15px;
        text-decoration: none;
        color: #000;
        &:hover,
        &:focus {
          background: #409eff;
          color: #fff;
        }
      }
      /deep/.nuxt-link-exact-active {
        background: #409eff;
        color: #fff;
      }
    }
  }
}
</style>