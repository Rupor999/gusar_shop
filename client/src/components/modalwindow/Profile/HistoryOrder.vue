<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-data-table
      no-data-text="Нет доступных данных"
      :headers="headers"
      :items="getOrdersId"
      :page.sync="page"
      :items-per-page="10"
      @page-count="pageCount = $event"
      hide-default-footer
      class="elevation-1"
    ></v-data-table>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      pageCount: 0,
      headers: [
        { text: "Номер заказа", value: "ordersNumber" },
        { text: "Адрес доставки", value: "deliveryAddress" },
        { text: "Статус оплаты", value: "paymentStatus" },
        { text: "Статус заказа", value: "orderStatus" },
        { text: "Сумма", value: "totalPrice" }
      ]
    };
  },
  mounted: function() {
    this.$store
      .dispatch("orders/getOrdersId", this.getUserData().id)
      .then(() => {})
      .catch(err => {
        this.alert(err.message || "Что то пошшло не так..", "red");
      });
  },
  methods: {
    getUserData() {
      return this.$store.getters["getInfoAccount/getAccountData"];
    },
    alert(text, color) {
      this.$store.dispatch("snackbar/activate", {
        text: text,
        color: color
      });
      let timer = setTimeout(() => {
        this.$store.dispatch("snackbar/off");
      }, 5000);
    }
  },
  computed: {
    getOrdersId() {
      return this.$store.getters["orders/getOrdersId"];
    }
  }
};
</script>

<style lang="css" scoped></style>
