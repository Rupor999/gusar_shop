import { axiosConfigurated as axios } from "@/config/axiosConfigurated";

export default {
  namespaced: true,
  state: {
    status: "",
    user: localStorage.getItem("user") || null
  },
  mutations: {
    getInfoAccount_request(state) {
      state.status = "request";
    },
    getInfoAccount_success(state, user) {
      state.status = "success";
      state.user = user;
    },
    getInfoAccount_error(state) {
      state.status = "error";
    }
  },
  actions: {
    getInfoAccount({ commit }) {
      commit("getInfoAccount_request");
      return new Promise((resolve, reject) => {
        axios({ url: "/getaccountinfo", method: "GET" })
          .then(resp => {
            localStorage.setItem("user", JSON.stringify(resp.data.user));
            commit("getInfoAccount_success", JSON.stringify(resp.data.user));
            resolve();
          })
          .catch(err => {
            commit("getInfoAccount_error");
            reject(err.response);
          });
      });
    }
  },
  getters: {
    getInfoAccountStatus: state => state.status,
    getAccountData: state => {
      if (state.user) {
        return JSON.parse(state.user);
      } else {
        return false;
      }
    },
    isAdmin: state => {
      if (state.user) {
        let user_info = JSON.parse(state.user);
        return "role" in user_info
          ? user_info.role === "Administrator"
            ? true
            : false
          : false;
      } else {
        return false;
      }
    }
  }
};
