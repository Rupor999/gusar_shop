import { axiosConfigurated as axios } from "@/config/axiosConfigurated";

export default {
  namespaced: true,
  state: {
    status: "",
    orders: null,
    ordersAll: [],
    ordersId: [],
    pay: false
  },
  mutations: {
    changePayStatus(state, type) {
      state.pay = type;
    },
    order_request(state) {
      state.status = "loading";
    },
    order_add_success(state) {
      state.status = "success";
    },
    order_get_success(state, orders) {
      state.status = "success";
      state.ordersAll = orders;
    },
    order_getId_success(state, orders) {
      state.status = "success";
      state.ordersId = orders;
    },
    order_change_status_success(state) {
      state.status = "error";
    },
    order_error(state) {
      state.status = "error";
    }
  },
  actions: {
    changePayStatus({ commit }, type) {
      commit("changePayStatus", type);
    },
    getOrders({ commit }) {
      return new Promise(function(resolve, reject) {
        commit("order_request");
        axios({ url: "/orders-all", method: "GET" })
          .then(response => {
            commit("order_get_success", response.data.orders);
            resolve(response.data.orders);
          })
          .catch(err => {
            commit("order_error");
            reject(err.response);
          });
      });
    },
    getOrdersId({ commit }, userId) {
      return new Promise(function(resolve, reject) {
        commit("order_request");
        axios({ url: "/orders-id", method: "POST", data: { userId: userId } })
          .then(response => {
            commit("order_getId_success", response.data.orders);
            resolve(response.data.orders);
          })
          .catch(err => {
            commit("order_error");
            reject(err.response);
          });
      });
    },
    addOrder({ commit }, order) {
      return new Promise(function(resolve, reject) {
        commit("order_request");
        axios({ url: "/orders-add", method: "POST", data: order })
          .then(response => {
            commit("order_add_success");
            resolve(response);
          })
          .catch(err => {
            commit("order_error");
            reject(err.response);
          });
      });
    },
    changeOrderStatus({ commit }, order_data) {
      return new Promise(function(resolve, reject) {
        commit("order_request");
        axios({ url: "/orders-change-status", method: "PUT", data: order_data })
          .then(response => {
            commit("order_change_status_success");
            resolve(response);
          })
          .catch(err => {
            commit("order_error");
            reject(err.response);
          });
      });
    }
  },
  getters: {
    getPayStatus: state => state.pay,
    getOrdersId: state => state.ordersId,
    getOrdersAll: state => state.ordersAll
  }
};
