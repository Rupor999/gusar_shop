import Vue from "vue";
import Router from "vue-router";
import store from "./store";

//begin navbar
import Navbar from "./components/Navbar.vue";
//end navbar

//begin index
import Index from "./views/Index.vue";
//
import Catalog from "./views/index/Catalog.vue";

//end index

//begin errors
import Page404 from "./views/errors/Page404.vue";
//end errors

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: Index
    },
    {
      path: "*",
      name: "page404",
      component: Page404
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
    // next();
  } else {
    next();
  }
});

export default router;
