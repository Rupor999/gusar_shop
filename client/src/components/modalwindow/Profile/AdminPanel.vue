<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl fluid>
    <v-tabs color="green darken-3" vertical>
      <v-tab v-for="(item, index) in itemsMenu" :key="item.name + '-' + index">
        <v-icon left>{{ item.icon }}</v-icon>
        {{ item.name }}
      </v-tab>

      <v-tab-item
        v-for="(item, index) in itemsMenu"
        :key="item.componentName + '-' + index"
      >
        <component v-bind:is="item.componentName"></component>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import Users from "@/components/modalwindow/Profile/AdminPanel/Users.vue";
import Orders from "@/components/modalwindow/Profile/AdminPanel/Orders.vue";

export default {
  components: {
    Users,
    Orders
  },
  data() {
    return {
      itemsMenu: [
        { name: "Пользователи", icon: "mdi-account", componentName: "Users" },
        {
          name: "Заказы",
          icon: "mdi-shopping-outline",
          componentName: "Orders"
        }
      ]
    };
  }
};
</script>

<style lang="css" scoped></style>
