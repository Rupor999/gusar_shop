import { axiosConfigurated as axios } from "@/config/axiosConfigurated";

export default {
  namespaced: true,
  state: {
    status: "",
    token: localStorage.getItem("token") || null
  },
  mutations: {
    login_request(state) {
      state.status = "loading";
    },
    login_success(state, token) {
      state.status = "success";
      state.token = token;
    },
    login_error(state) {
      state.status = "error";
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("login_request");
        axios({ url: "/auth", method: "POST", data: user })
          .then(resp => {
            const token = "Bearer " + resp.data.token;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = token;
            commit("login_success", token);
            resolve(resp);
          })
          .catch(err => {
            commit("login_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    }
  },
  getters: {
    loginStatus: state => state.status,
    getToken: state => state.token
  }
};
