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
  login(store, data) {
   return  this.$axios({
    url: "accounts/login",
    method: "POST",
    data
  }).then(res => {
    let { data } = res;
    console.log(res);
    store.commit("setUserInfo", data);
  });
  }
};
