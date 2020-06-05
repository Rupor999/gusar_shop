import { axiosConfigurated as axios } from "@/config/axiosConfigurated";

export default {
  namespaced: true,
  state: {
    status: ""
  },
  mutations: {
    register_request(state) {
      state.status = "loading";
    },
    register_success(state) {
      state.status = "success";
    },
    register_error(state) {
      state.status = "error";
    }
  },
  actions: {
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("register_request");
        axios({ url: "/users", method: "POST", data: user })
          .then(resp => {
            commit("register_success");
            resolve(resp);
          })
          .catch(err => {
            commit("register_error");
            reject(err.response);
          });
      });
    }
  },
  getters: {
    getStatus: state => state.status
  }
};
