<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl fluid>
    <v-data-table
      no-data-text="Нет доступных данных"
      :headers="headers"
      :items="getOrdersAll"
      :page.sync="page"
      :items-per-page="10"
      @page-count="pageCount = $event"
      hide-default-footer
      class="elevation-1"
      v-model="selectItem"
      show-select
      single-select
      item-key="ordersNumber"
    ></v-data-table>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
    <v-divider v-if="selectItem.length"></v-divider>
    <div v-if="selectItem.length" class="d-flex justify-center align-center">
      <span class="mr-5">Изменить статус заказа:</span>
      <v-select
        v-model="newStatus"
        :items="itemsOrderStatus"
        label="Статус заказа"
      ></v-select>
      <v-btn color="primary" class="ml-5" @click="changeOrderStatus"
        >Отправить</v-btn
      >
    </div>
  </v-container>
</template>

<script>
export default {
  mounted: function() {
    this.$store.dispatch("orders/getOrders").then();
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      headers: [
        { text: "Номер заказа", value: "ordersNumber" },
        { text: "ID клиента", value: "customerId" },
        { text: "Адрес доставки", value: "deliveryAddress" },
        { text: "Статус оплаты", value: "paymentStatus" },
        { text: "Статус заказа", value: "orderStatus" },
        { text: "Сумма", value: "totalPrice" }
      ],
      itemsOrderStatus: [
        "В обработке",
        "Подтвержден",
        "Ожидает оплату",
        "Изготовлен и готов к отправке",
        "Выполнен",
        "Отменен"
      ],
      selectItem: [],
      newStatus: ""
    };
  },
  methods: {
    alert(text, color) {
      this.$store.dispatch("snackbar/activate", {
        text: text,
        color: color
      });
      let timer = setTimeout(() => {
        this.$store.dispatch("snackbar/off");
      }, 5000);
    },
    changeOrderStatus() {
      this.$store
        .dispatch("orders/changeOrderStatus", {
          ordersNumber: this.selectItem[0].ordersNumber,
          orderStatus: this.newStatus
        })
        .then(() => {
          this.alert("Успешно изменено!", "green darken-3");
          this.$store.dispatch("orders/getOrders").then();
          this.selectItem = [];
        })
        .catch(err => {
          this.alert(err.message || "Что то пошло не так...", "red");
        });
    }
  },
  computed: {
    getOrdersAll() {
      return this.$store.getters["orders/getOrdersAll"];
    }
  }
};
</script>

<style lang="css" scoped></style>
