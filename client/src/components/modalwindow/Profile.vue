<template lang="html">
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on }">
      <!-- <v-btn color="primary" dark v-on="on">Open Dialog</v-btn> -->
      <v-btn x-small color="black" text v-on="on">Профиль</v-btn>
    </template>

    <v-card>
      <v-toolbar dark color="green darken-3">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Профиль</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="dialog = false">Закрыть</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-expansion-panels hover popout focusable>
        <v-expansion-panel
          v-for="(item, index) in itemList"
          :key="item + '-' + index"
          v-if="item.forAdmin === isAdmin"
        >
          <v-expansion-panel-header>
            {{ item.name }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <component v-bind:is="item.component"></component>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-dialog>
</template>

<script>
import UserInfo from "@/components/modalwindow/Profile/UserInfo.vue";
import CartInfo from "@/components/modalwindow/Profile/CartInfo.vue";
import HistoryOrder from "@/components/modalwindow/Profile/HistoryOrder.vue";

import AdminPanel from "@/components/modalwindow/Profile/AdminPanel.vue";

export default {
  components: {
    UserInfo,
    CartInfo,
    HistoryOrder,

    AdminPanel
  },
  data() {
    return {
      dialog: false,
      itemList: [
        {
          name: "Информация о пользователе",
          component: "UserInfo",
          forAdmin: false
        },
        { name: "Корзина", component: "CartInfo", forAdmin: false },
        { name: "История заказов", component: "HistoryOrder", forAdmin: false },
        {
          name: "Панель администратора",
          component: "AdminPanel",
          forAdmin: true
        }
      ]
    };
  },
  computed: {
    isAdmin() {
      return this.$store.getters["getInfoAccount/isAdmin"];
    }
  }
};
</script>

<style lang="css" scoped></style>
