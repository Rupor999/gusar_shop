<template lang="html">
  <div class="text-center">
    <v-dialog v-model="dialog" width="400" @click:outside="clickOutside">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" v-on="on" text>Добавить в корзину</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Укажите количество товара
        </v-card-title>

        <v-card-text>
          <v-container grid-list-xs,sm,md,lg,xl>
            <v-text-field
              label="Количество"
              suffix="Единиц"
              v-model="count"
            ></v-text-field>
            <v-text-field
              label="Сумма"
              suffix="Рублей"
              v-model="totalPrice"
              disabled
            ></v-text-field>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="addToCart">Подтвердить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["product"],
  data() {
    return {
      dialog: false,
      count: 0
    };
  },
  methods: {
    clickOutside() {
      this.count = 0;
    },
    addToCart() {
      if (this.count > 0) {
        this.$store.dispatch("cart/cartAdd", {
          productId: this.product._id,
          productCategory: this.product.Category,
          productName: this.product.ProductName,
          productDN: this.product.DN,
          productPN: this.product.PN,
          productPrice: this.product.Price,
          count: this.count,
          totalPrice: this.totalPrice
        });
        this.alert("Товар успешно добавлен в корзину!", "green darken-3");
        this.dialog = false;
        this.$store.dispatch("cart/refreshCart");
      } else {
        this.alert(
          'Введите корректное значение в поле "Колчество"!',
          "yellow darken-3"
        );
      }
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
    totalPrice() {
      if (this.count && this.count > 0) {
        return this.count * this.product.Price;
      } else return 0;
    }
  }
};
</script>

<style lang="css" scoped></style>
