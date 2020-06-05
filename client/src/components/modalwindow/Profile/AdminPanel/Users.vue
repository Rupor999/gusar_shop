<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl fluid>
    <v-data-table
      no-data-text="Нет доступных данных"
      :headers="headers"
      :items="getUsers"
      :items-per-page="20"
      class="elevation-1"
    ></v-data-table>
  </v-container>
</template>

<script>
export default {
  mounted: function() {
    this.$store.dispatch("users/getUsers").then();
  },
  data() {
    return {
      headers: [
        { text: "Номер телефона", value: "number" },
        { text: "Фамилия", value: "surname" },
        { text: "Имя", value: "name" },
        { text: "Отчество", value: "midname" },
        { text: "E-mail", value: "email" },
        { text: "Роль", value: "role" }
      ]
    };
  },
  computed: {
    getUsers() {
      return this.$store.getters["users/getUsers"];
    }
  }
};
</script>

<style lang="css" scoped></style>
