import { axiosConfigurated as axios } from "@/config/axiosConfigurated";

export default {
  namespaced: true,
  state: {
    status: "",
    products: null
  },
  mutations: {
    product_request(state) {
      state.status = "loading";
    },
    product_add_success(state) {
      state.status = "success";
    },
    product_get_success(state, products) {
      state.status = "success";
      state.products = products;
    },
    product_modify_success(state) {
      state.status = "success";
    },
    product_delete_success(state) {
      state.status = "success";
    },
    product_error(state) {
      state.status = "error";
    }
  },
  actions: {
    getProduct({ commit }) {
      return new Promise(function(resolve, reject) {
        commit("product_request");
        axios({ url: "/product", method: "GET" })
          .then(response => {
            commit("product_get_success", response.data.products);
            resolve(response.data.products);
          })
          .catch(err => {
            commit("product_error");
            reject(err.response);
          });
      });
    },
    newProduct({ commit }, product) {
      return new Promise(function(resolve, reject) {
        commit("product_request");
        axios({ url: "/product", method: "POST", data: product })
          .then(response => {
            commit("product_add_success");
            resolve(response);
          })
          .catch(err => {
            commit("product_error");
            reject(err.response);
          });
      });
    },
    modifyProduct({ commit }, product) {
      return new Promise(function(resolve, reject) {
        commit("product_request");
        axios({ url: "/product_refresh", method: "POST", data: product })
          .then(response => {
            commit("product_modify_success");
            resolve(response);
          })
          .catch(err => {
            commit("product_error");
            reject(err.response);
          });
      });
    },
    deleteProduct({ commit }, product_id) {
      return new Promise(function(resolve, reject) {
        commit("product_request");
        axios({ url: "/product_delete", method: "POST", data: product_id })
          .then(response => {
            commit("product_delete_success");
            resolve(response);
          })
          .catch(err => {
            commit("product_error");
            reject(err.response);
          });
      });
    }
  },
  getters: {
    getStatus: state => state.status,
    getProductData: state => {
      if (state.products) {
        return state.products;
      } else {
        return false;
      }
    }
  }
};
