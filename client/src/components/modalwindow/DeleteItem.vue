<template lang="html">
  <div class="text-center">
    <v-dialog v-model="dialog" width="600">
      <template v-slot:activator="{ on }">
        <v-btn color="error" v-on="on" text>Удалить</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Подтвердите удаление товара
        </v-card-title>

        <v-card-text>
          <v-container grid-list-xs,sm,md,lg,xl>
            <v-row class="d-flex flex-column">
              <div class="headline">
                Вы действительно хотите удалить товар?
              </div>
              <div class="title">
                {{ this.product.Category }}
              </div>
              <div class="title">
                {{ this.product.ProductName }}
              </div>
              <div class="title">DN: {{ this.product.DN }}</div>
              <div class="title">PN: {{ this.product.PN }}</div>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- ДОПИСТАЬ ОБРАБОТЧИК КЛИКА -->
          <v-btn @click="acceptDelete" color="primary">Подтвердить</v-btn>
          <v-btn color="secondary" text @click="dialog = false">
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["product", "imagebase64"],
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    acceptDelete() {
      if (this.imagebase64) {
        this.$store
          .dispatch("image/deleteImage", {
            ImageName: this.product.ImageName
          })
          .then(() => {
            this.deleteProduct();
          })
          .catch(err => {});
      } else {
        this.deleteProduct();
      }
    }
  },
  updateProducts() {
    this.$store
      .dispatch("product/getProduct")
      .then(products => {
        // console.log(products);
      })
      .catch(err => {
        this.$store.dispatch("snackbar/activate", {
          text: err.data.message || "Ошибка при получении данных о товарах!",
          color: "red"
        });
        let timer = setTimeout(() => {
          this.$store.dispatch("snackbar/off");
        }, 5000);
      });
  },
  deleteProduct() {
    this.$store
      .dispatch("product/deleteProduct", {
        product_id: this.product._id
      })
      .then(() => {
        this.$store.dispatch("snackbar/activate", {
          text: "Товар успешно удален!",
          color: "green"
        });
        let timer = setTimeout(() => {
          this.$store.dispatch("snackbar/off");
        }, 5000);
        this.dialog = false;
        tjis.updateProducts();
      })
      .catch(err => {
        this.$store.dispatch("snackbar/activate", {
          text: err.data.message || "Ошибка при удалении товара",
          color: "red"
        });
        let timer = setTimeout(() => {
          this.$store.dispatch("snackbar/off");
        }, 5000);
      });
  }
};
</script>

<style lang="css" scoped></style>
