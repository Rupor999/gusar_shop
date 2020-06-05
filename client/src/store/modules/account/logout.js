import { axiosConfigurated as axios } from "@/config/axiosConfigurated";

export default {
  namespaced: true,
  state: {
    status: ""
  },
  mutations: {
    logout_success(state) {
      state.status = "success";
    }
  },
  actions: {
    logout({ commit }) {
      console.log(
        "LOGOUT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" /////////////////////////////////////////////////////////////
      );
      return new Promise((resolve, reject) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("cart");
        delete axios.defaults.headers.common["Authorization"];
        commit("logout_success");
        resolve();
      });
    }
  },
  getters: {
    logoutStatus: state => state.status
  }
};
