import Vue from "vue";
import Vuex from "vuex";

//Account
import register from "./modules/account/register";
import login from "./modules/account/login";
import logout from "./modules/account/logout";
import getInfoAccount from "./modules/account/getInfoAccount";
import userModifyData from "./modules/account/userModifyData";

import snackbar from "./modules/snackbar";
import users from "./modules/users";
import image from "./modules/image";
import product from "./modules/product";
import cart from "./modules/cart";
import orders from "./modules/orders";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    register,
    login,
    logout,
    getInfoAccount,
    userModifyData,

    snackbar,
    users,
    image,
    product,
    cart,
    orders
  }
});
