<template lang="html">
  <v-container class="fill-height white" fluid>
    <v-row class="pa-1">
      <v-col>
        <v-row class="pb-5 pl-4">
          <h1>Каталог товаров</h1>
        </v-row>
        <v-row>
          <v-col cols="4" class="pt-0">
            <v-card class="elevation-5 ">
              <v-divider></v-divider>

              <v-list shaped>
                <v-list-item>
                  <v-list-item-title @click="item = -1"
                    >Показать все</v-list-item-title
                  >
                </v-list-item>
                <v-list-item-group v-model="item" color="primary">
                  <v-list-item v-for="item in menuItems" :key="item.headName">
                    <v-list-item-avatar>
                      <v-img :src="item.img"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="item.headName"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="8" class="elevation-5">
            <v-row>
              <v-col class="d-flex justify-center">
                <span class="display-1 font-weight-light">{{
                  getNameSelectedCategory
                }}</span>
              </v-col>
            </v-row>
            <v-row class="d-flex justify-space-around align-start flex-wrap">
              <AddNewItem v-if="isAdmin" />
              <ItemCatalog
                v-for="(item, index) in getProducts"
                :key="'item-' + index"
                v-bind:product="item"
                v-if="sortingItem(item)"
              />
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ItemCatalog from "@/components/ItemCatalog.vue";
import AddNewItem from "@/components/modalwindow/AddNewItem.vue";

export default {
  components: {
    ItemCatalog,
    AddNewItem
  },
  mounted: function() {
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
  data() {
    return {
      item: -1,
      menuItems: [
        {
          headName: "Запорная арматура по МС",
          img: "/zap-arm-po-mezhd-stand.png"
        },
        { headName: "Запорная арматура", img: "/zap-arm.png" },
        {
          headName: "Регулирующая арматура",
          img: "/reguliryuschaya.png"
        },
        {
          headName: "Защитная и предохранительная арматура",
          img: "/zasch-i-predohran.png"
        },
        { headName: "Устьевое оборудование", img: "/ystevoe.png" }
      ]
    };
  },
  methods: {
    sortingItem(item) {
      if (this.item === -1) return true;
      if (this.item === 0) {
        return item.Category === "Запорная арматура по международным стандартам"
          ? true
          : false;
      }
      if (this.item === 1) {
        return item.Category === this.menuItems[this.item].headName
          ? true
          : false;
      }
      if (this.item === 2) {
        return item.Category === this.menuItems[this.item].headName
          ? true
          : false;
      }
      if (this.item === 3) {
        return item.Category === this.menuItems[this.item].headName
          ? true
          : false;
      }
      if (this.item === 4) {
        return item.Category === this.menuItems[this.item].headName
          ? true
          : false;
      }
    }
  },
  computed: {
    isAdmin() {
      return this.$store.getters["getInfoAccount/isAdmin"];
    },
    getProducts() {
      let temp = this.$store.getters["product/getProductData"];
      if (temp) {
        return temp;
      } else {
        return [];
      }
    },
    getNameSelectedCategory() {
      if (this.item === -1) return "";
      if (this.item === 0)
        return "Запорная арматура по международным стандартам";
      return this.menuItems[this.item].headName;
    }
  }
};
</script>

<style lang="css" scoped>
.div-background {
  background-image: url(/bg2.PNG);
  background-repeat:repeat;
}
</style>
