import { axiosConfigurated as axios } from "@/config/axiosConfigurated";

export default {
  namespaced: true,
  state: {
    status: "",
    cart:
      localStorage.getItem("cart") ||
      localStorage.setItem("cart", JSON.stringify([]))
  },
  mutations: {
    cart_add(state, newOrder) {
      state.status = "add";
      let cart = JSON.parse(localStorage.getItem("cart"));
      cart.push(newOrder);
      localStorage.setItem("cart", JSON.stringify(cart));
      state.cart = JSON.stringify(cart);
    },
    cart_remove(state, cart) {
      state.status = "remove";
      state.cart = cart;
    },
    clearCart(state) {
      state.cart = JSON.stringify([]);
    },
    refreshCart(state, cart) {
      state.cart = cart;
    }
  },
  actions: {
    cartAdd({ commit }, newOrder) {
      commit("cart_add", newOrder);
    },
    cartRemove({ commit }, product_id) {
      console.log(product_id);
      let cart = JSON.parse(localStorage.getItem("cart"));
      for (var i = 0; i < cart.length; i++) {
        if (cart[i].productId === product_id) cart.splice(i, 1);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      commit("cart_remove", JSON.stringify(cart));
    },
    clearCart({ commit }) {
      commit("clearCart");
      localStorage.setItem("cart", JSON.stringify([]));
    },
    refreshCart({ commit }) {
      commit("refreshCart", localStorage.getItem("cart"));
    }
  },
  getters: {
    getCart: state => JSON.parse(state.cart),
    getForAllOrderPrice: state => {
      let cart = JSON.parse(state.cart);
      let totalPrice = 0;
      for (var i = 0; i < cart.length; i++) {
        totalPrice += cart[i].totalPrice;
      }
      return totalPrice;
    }
  }
};
