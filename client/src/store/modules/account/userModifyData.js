import { axiosConfigurated as axios } from "@/config/axiosConfigurated";

export default {
  namespaced: true,
  state: {
    status: ""
  },
  mutations: {
    user_modify_request(state) {
      state.status = "request";
    },
    user_modify_success(state) {
      state.status = "success";
    },
    user_modify_error(state) {
      state.status = "error";
    }
  },
  actions: {
    putUser({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("user_modify_request");
        axios({ url: "/users", method: "PUT", data: user })
          .then(resp => {
            commit("user_modify_success");
            resolve(resp);
          })
          .catch(err => {
            commit("user_modify_error");
            reject(err);
          });
      });
    }
  },
  getters: {
    getStatus: state => state.status
  }
};
