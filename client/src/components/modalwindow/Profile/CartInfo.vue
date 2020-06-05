<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl fluid>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1"
          >Подтверждение выбранных товаров</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2"
          >Сбор дополнительных данных</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step step="3">Завершение</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="elevation-0">
            <v-row>
              <v-col>
                <v-data-table
                  no-data-text="Нет доступных данных"
                  :headers="headers"
                  :items="getCart"
                  :page.sync="page"
                  :items-per-page="10"
                  @page-count="pageCount = $event"
                  hide-default-footer
                  class="elevation-1"
                  v-model="selectItem"
                  show-select
                  single-select
                  item-key="totalPrice"
                ></v-data-table>
                <div class="text-center pt-2">
                  <v-pagination
                    v-model="page"
                    :length="pageCount"
                  ></v-pagination>
                </div>
                <v-divider v-if="selectItem.length"></v-divider>
                <div
                  v-if="selectItem.length"
                  class="d-flex justify-end align-center"
                >
                  <v-btn color="error" class="ml-5" @click="deleteFromCart"
                    >Удалить из корзины</v-btn
                  >
                </div>
                <v-row class="d-flex justify-end pr-5 py-5">
                  <span class="title font-weight-light">
                    Итоговая сумма
                    <span class="font-italic font-weight-medium">{{
                      getForAllOrderPrice
                    }}</span>
                    рублей</span
                  >
                </v-row>
              </v-col>
            </v-row>
          </v-card>
          <div class="d-flex justify-end">
            <v-btn color="primary" @click="e1 = 2">
              Далее
            </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-12 elevation-0">
            <v-text-field
              label="Адрес доставки"
              placeholder="Укажите адрес доставки"
              v-model="deliveryAddress"
              :error="errorDeliveryAddress"
            ></v-text-field>
          </v-card>
          <div class="d-flex justify-end">
            <v-btn text @click="e1 = e1 - 1">Назад</v-btn>
            <v-btn color="primary" @click="checkAddress()">
              Далее
            </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12 elevation-0">
            <v-container grid-list-xs,sm,md,lg,xl>
              <v-row v-if="!getPayStatus" class="d-flex justify-center">
                <v-col cols="6">
                  <v-text-field
                    disabled
                    type="text"
                    name="clientid"
                    label="Фамилия Имя"
                    :value="getUserData.surname + ' ' + getUserData.name"
                  ></v-text-field>
                  <!-- <input
                    class="input_type"
                    type="text"
                    name="clientid"
                    value="Иван Иванов"
                  /> -->
                  <br />

                  <v-text-field
                    disabled
                    type="text"
                    name="orderid"
                    label="Номер заказа"
                    :value="generateOrdersNumber"
                  ></v-text-field>
                  <!-- <input
                    class="input_type"
                    type="text"
                    name="orderid"
                    placeholder="Оставьте сообщение здесь"
                  /> -->
                  <br />

                  <v-text-field
                    disabled
                    type="text"
                    name="client_phone"
                    label="Телефон"
                    prefix="+7"
                    :value="getUserData.number"
                  ></v-text-field>
                  <!-- <input
                    class="input_type"
                    type="text"
                    name="client_phone"
                    value=""
                  /> -->
                  <br />
                  <v-text-field
                    disabled
                    type="text"
                    name="client_email"
                    label="Электронный адрес"
                    :value="getUserData.email"
                  ></v-text-field>
                  <!-- <input
                    class="input_type"
                    type="text"
                    name="client_email"
                    placeholder="test@example.com"
                    value=""
                  /> -->
                  <br />

                  <v-text-field
                    disabled
                    type="text"
                    :name="'sum'"
                    :value="getForAllOrderPrice"
                    label="Cумма оплаты"
                    suffix="Рублей"
                  ></v-text-field>
                  <!-- <input class="input_type" type="text" name="sum" value="1" /> -->
                  <br />
                  <v-row class="d-flex justify-end">
                    <Payment
                      v-bind:orderNumer="generateOrdersNumber"
                      v-bind:orderPrice="getForAllOrderPrice"
                    />
                  </v-row>
                </v-col>
              </v-row>
              <v-row v-else class="d-flex justify-center align-center">
                <v-col class="d-flex justify-center align-center">
                  <v-img width="150" src="/ok_pay.png" />
                  <span class="display-3 font-weight-light"
                    >Оплата заказа № {{ generateOrdersNumber }} прошла
                    успешно</span
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <div v-if="!getPayStatus" class="d-flex justify-end">
            <v-btn text @click="e1 = e1 - 1">Назад</v-btn>
            <v-btn color="primary" @click="addOrdersWithoutPayment">
              Продолжить без оплаты
            </v-btn>
          </div>
          <div v-else class="d-flex justify-end">
            <v-btn color="primary" @click="addOrdersWithPayment"
              >Перейти в начало</v-btn
            >
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import Payment from "@/components/modalwindow/Payment.vue";

export default {
  components: {
    Payment
  },
  data() {
    return {
      e1: 1,
      selectItem: [],
      page: 1,
      pageCount: 0,
      headers: [
        { text: "ID продукта", value: "productId" },
        { text: "Категория продукта", value: "productCategory" },
        { text: "Назване продукта", value: "productName" },
        { text: "DN", value: "productDN" },
        { text: "PN", value: "productPN" },
        { text: "Цена (за ед.)", value: "productPrice" },
        { text: "Кол-во (ед.)", value: "count" },
        { text: "Итого (руб.)", value: "totalPrice" }
      ],
      deliveryAddress: "",
      errorDeliveryAddress: false,
      accountData: {
        fi: "",
        number: "",
        email: ""
      }
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
    checkAddress() {
      if (this.deliveryAddress.length > 0) {
        this.e1 = 3;
        this.errorDeliveryAddress = false;
      } else {
        this.$store.dispatch("snackbar/activate", {
          text: "Укажите адрес доставки",
          color: "yellow darken-3"
        });
        let timer = setTimeout(() => {
          this.$store.dispatch("snackbar/off");
        }, 5000);
        this.errorDeliveryAddress = true;
      }
    },
    addOrdersWithoutPayment() {
      // console.log(this.getCart);
      this.$store
        .dispatch("orders/addOrder", {
          ordersNumber: this.generateOrdersNumber,
          customerId: this.getUserData.id,
          productsArray: this.getCart,
          deliveryAddress: this.deliveryAddress,
          paymentStatus: "Не оплачен",
          orderStatus: "В обработке",
          totalPrice: this.getForAllOrderPrice
        })
        .then(() => {
          this.alert("Заказ успешно сохранен!", "green darken-3");
        })
        .catch(err => {
          this.alert(err.message || "Ошибка при сохранении заказа!", "red");
        });
    },
    addOrdersWithPayment() {
      this.$store
        .dispatch("orders/addOrder", {
          ordersNumber: this.generateOrdersNumber,
          customerId: this.getUserData.id,
          productsArray: this.getCart,
          deliveryAddress: this.deliveryAddress,
          paymentStatus: "Оплачен",
          orderStatus: "На модерации",
          totalPrice: this.getForAllOrderPrice
        })
        .then(() => {
          this.alert("Заказ успешно сохранен!", "green darken-3");
          this.e1 = this.e1 - 2;
          this.$store.dispatch("cart/clearCart");
          this.$store.dispatch("orders/changePayStatus", false);
        })
        .catch(err => {
          this.alert(err.message || "Ошибка при сохранении заказа!", "red");
        });
    },
    deleteFromCart() {
      this.$store.dispatch("cart/cartRemove", this.selectItem[0].productId);
      this.selectItem = [];
    }
  },
  computed: {
    getCart() {
      return this.$store.getters["cart/getCart"];
    },
    getForAllOrderPrice() {
      return this.$store.getters["cart/getForAllOrderPrice"];
    },
    getUserData() {
      return this.$store.getters["getInfoAccount/getAccountData"];
    },
    generateOrdersNumber() {
      return new Date().getTime();
    },
    getPayStatus() {
      return this.$store.getters["orders/getPayStatus"];
    }
  }
};
</script>

<style lang="css" scoped></style>
