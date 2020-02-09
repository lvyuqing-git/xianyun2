export const state = () => {
  return {
    userInfo: {
      user: {}
    }
  };
};
export const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data;
  }
};

export const actions = {
  //用户登录接口
  login(store, data) {
    return this.$axios({
      url: "accounts/login",
      method: "POST",
      data
    }).then(res => {
      let { data } = res;
      console.log(res);
      store.commit("setUserInfo", data);
    });
  },
  //发送验证码
  verificationcode(store, data) {
    return this.$axios({
      url: "captchas",
      method: "POST",
      data
    });
  },
  //用户注册
  register(store, data) {
    return this.$axios({
      url: "accounts/register",
      method: "POST",
      data
    }).then(res => {
      let { data } = res;
      store.commit("setUserInfo", data);
    });
  }
};
