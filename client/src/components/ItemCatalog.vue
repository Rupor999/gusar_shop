<template lang="html">
  <v-card
    class="ma-5 flex-grow-1 elevation-12"
    max-width="400"
    max-height="auto"
  >
    <v-card-title primary-title>
      <v-container grid-list-xs,sm,md,lg,xl>
        <v-row class="d-flex justify-center">
          <v-img
            :src="image || '/noimage.jpg'"
            max-width="auto"
            max-height="auto"
          ></v-img>
        </v-row>
        <v-row>
          <div class="headline d-flex justify-center">
            {{ this.product.ProductName }}, DN:{{ this.product.DN }}, PN:{{
              this.product.PN
            }}
          </div>
        </v-row>
      </v-container>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <div class=""><b>Описание:</b> {{ this.product.Description }}</div>
      <div class=""><b>Цена:</b> {{ this.product.Price }}.00 RUB</div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="d-flex justify-space-around">
      <ItemAdditional v-if="!isAdmin" v-bind:product="product" />
      <ItemModify
        v-if="isAdmin"
        v-bind:product="product"
        v-bind:imagebase64="this.image"
      />
      <v-divider vertical></v-divider>
      <AddItemToCart v-if="!isAdmin" v-bind:product="product" />
      <DeleteItem
        v-if="isAdmin"
        v-bind:product="product"
        v-bind:imagebase64="this.image"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import AddItemToCart from "@/components/modalwindow/AddItemToCart.vue";
import ItemAdditional from "@/components/modalwindow/ItemAdditional.vue";
import ItemModify from "@/components/modalwindow/ItemModify.vue";
import DeleteItem from "@/components/modalwindow/DeleteItem.vue";

export default {
  props: ["product"],
  components: {
    AddItemToCart,
    ItemAdditional,
    DeleteItem,
    ItemModify
  },
  mounted: function() {
    this.$store
      .dispatch("image/getImage", { ImageName: this.product.ImageName })
      .then(data => {
        this.image = data.imagebase64;
      })
      .catch(err => {
        // console.log("ItemCatalog.vue: " + err.message);
      });
  },
  data() {
    return {
      image: null
    };
  },
  computed: {
    isAdmin() {
      return this.$store.getters["getInfoAccount/isAdmin"];
    },
    isToken() {
      return this.$store.getters["login/getToken"];
    }
  }
};
</script>

<style lang="css" scoped></style>
