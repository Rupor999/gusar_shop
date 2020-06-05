import { axiosConfigurated as axios } from "@/config/axiosConfigurated";

export default {
  namespaced: true,
  state: {
    status: "",
    loading: false,
    users: []
  },
  mutations: {
    users_get(state) {
      state.status = "get operation";
      state.loading = true;
    },
    users_put(state, users) {
      state.status = "put operation";
      state.loading = true;
    },

    users_get_success(state, users) {
      state.status = "get users success";
      state.users = users;
      state.loading = false;
    },
    users_put_success(state, users) {
      state.status = "put operation success";
      state.loading = false;
    },

    users_error(state) {
      state.status = "error";
      state.loading = false;
    },

    //
    set_selected_rows(state, selectedRows) {
      state.selectedRows = selectedRows;
    }
  },
  actions: {
    getUsers({ commit }) {
      return new Promise((resolve, reject) => {
        commit("users_get");
        axios({ url: "/users", method: "GET" })
          .then(resp => {
            // console.log(resp.data);
            commit("users_get_success", resp.data.users);
            resolve(resp.data.users);
          })
          .catch(err => {
            commit("users_error");
            reject(err);
          });
      });
    },
    putUser({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("users_put");
        axios({ url: "/users", method: "PUT", data: user })
          .then(resp => {
            commit("users_put_success");
            resolve(resp);
          })
          .catch(err => {
            commit("users_error");
            reject(err);
          });
      });
    }
  },
  getters: {
    getUsers: state => state.users,
    getLoading: state => state.loading,
    getStatus: state => state.status
  }
};
