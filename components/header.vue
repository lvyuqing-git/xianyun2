<template>
  <header class="header">
    <el-row type="flex"
            justify="space-between">
      <div>
        <img src="http://157.122.54.189:9093/images/logo.jpg"
             alt=""
             class="logo">
      </div>
      <el-row class="nav"
              type="flex">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <el-row class="user"
              type="flex">
        <div v-if="$store.state.user.userInfo.token">
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class=" el-icon-bell"></i>
              消息<i class="el-icon-arrow-down el-icon--right el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown>
            <span class="el-dropdown-link">
              <img :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar"
                   alt=""
                   class="defaultAvatar">
              {{$store.state.user.userInfo.user.nickname}}<i class="el-icon-arrow-down el-icon--right el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item><span @click="logOut">退出</span></el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div @click="$router.push({path:'/user/login'})"
             v-else>
          <span>
            登录/注册
          </span>
        </div>
      </el-row>
    </el-row>

  </header>
</template>

<script>
export default {
    methods: {
        logOut(){
            this.$store.commit('user/setUserInfo',{
                token : '',
                user : {}
            })
        }
    }
}
</script>

<style lang='less' scoped>
header {
  height: 60px;
  width: 1000px;
  line-height: 60px;
  margin: 0 auto;
  .logo {
    height: 60px;
  }
  .nav {
    flex: 1;
    margin-left: 30px;
    a {
      display: block;
      height: 60px;
      padding: 0 15px;
      box-sizing: border-box;
      &:hover {
        border-bottom: 5px solid #409eff;
      }
    }
    /deep/.nuxt-link-exact-active {
      background-color: #409eff;
      color: #fff;
    }
  }
  .user {
    .el-dropdown {
      margin-right: 15px;
    }
    .defaultAvatar {
      width: 35px;
      height: 35px;
      vertical-align: middle;
    }
  }
}
</style>